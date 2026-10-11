/**
 * VIRASAT - Persistent Database Adapter
 * Supports SQLite (built-in node:sqlite) with persistent disk storage in data/virasat.db,
 * and optional PostgreSQL if DATABASE_URL environment variable is provided.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlitePath = path.join(dataDir, 'virasat.db');

export class DatabaseAdapter {
  constructor() {
    this.isPostgres = Boolean(process.env.DATABASE_URL);
    this.sqliteDb = null;
    this.pgPool = null;

    if (this.isPostgres) {
      console.log('[DB] Initializing PostgreSQL client using DATABASE_URL...');
      this.pgPool = new pg.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
      });
    } else {
      console.log(`[DB] Initializing persistent SQLite database at: ${sqlitePath}`);
      this.sqliteDb = new DatabaseSync(sqlitePath);
      try {
        this.sqliteDb.exec('PRAGMA busy_timeout = 5000;');
        this.sqliteDb.exec('PRAGMA journal_mode = WAL;');
        this.sqliteDb.exec('PRAGMA foreign_keys = ON;');
      } catch (_) {}
    }
  }

  async query(sql, params = []) {
    if (this.isPostgres) {
      // Convert ? placeholders to $1, $2, etc for postgres
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      const res = await this.pgPool.query(pgSql, params);
      return res.rows;
    } else {
      const stmt = this.sqliteDb.prepare(sql);
      return stmt.all(...params);
    }
  }

  async run(sql, params = []) {
    if (this.isPostgres) {
      let paramIndex = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramIndex++}`);
      const res = await this.pgPool.query(pgSql, params);
      return { changes: res.rowCount };
    } else {
      const stmt = this.sqliteDb.prepare(sql);
      const res = stmt.run(...params);
      return { changes: res.changes, lastInsertRowid: res.lastInsertRowid };
    }
  }

  async exec(sql) {
    if (this.isPostgres) {
      await this.pgPool.query(sql);
    } else {
      this.sqliteDb.exec(sql);
    }
  }

  async checkHealth() {
    try {
      if (this.isPostgres) {
        const res = await this.pgPool.query('SELECT 1 as alive');
        return { ok: true, type: 'postgresql' };
      } else {
        const res = this.sqliteDb.prepare('SELECT 1 as alive').get();
        return { ok: true, type: 'sqlite', path: sqlitePath };
      }
    } catch (err) {
      return { ok: false, error: err.message };
    }
  }
}

export const db = new DatabaseAdapter();
