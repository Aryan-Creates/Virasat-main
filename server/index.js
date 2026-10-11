/**
 * VIRASAT - Integrated Express REST API Server
 * Features:
 * - Persistent Database Connection (SQLite / PostgreSQL)
 * - Strict Zod Validation & Publication Completeness Enforcement
 * - Duplicate Prevention via Normalized Monument Names
 * - Full CRUD & Search Endpoints
 * - Administrative Completeness Audit Report
 */

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db.js';
import { runMigrations } from './migrate.js';
import { seedMonuments } from './seed.js';
import { 
  monumentInputSchema, 
  normalizeMonumentName, 
  evaluateMonumentCompleteness 
} from './validation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));

// CORS setup
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
  : [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://localhost:3000'
    ];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // Allow any localhost origin during development
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Helper to format database row into camelCase API response
function formatMonumentRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    normalizedName: row.normalized_name,
    hindiName: row.hindi_name,
    state: row.state,
    city: row.city,
    country: row.country,
    location: row.location,
    latitude: row.latitude,
    longitude: row.longitude,
    coordinates: (row.latitude && row.longitude) ? { lat: row.latitude, lng: row.longitude } : null,
    category: row.category,
    dynasty: row.dynasty,
    builtEra: row.built_era,
    era: row.built_era, // Compatibility with legacy components
    commissionedYear: row.commissioned_year,
    completionYear: row.completion_year,
    architecturalStyle: row.architectural_style,
    architecturalFeatures: row.architectural_features ? JSON.parse(row.architectural_features) : [],
    description: row.description,
    historicalBackground: row.historical_background,
    culturalSignificance: row.cultural_significance,
    languages: row.languages ? JSON.parse(row.languages) : [],
    localActivities: row.local_activities ? JSON.parse(row.local_activities) : [],
    imageUrl: row.image_url,
    imageAttribution: row.image_attribution,
    imageAlt: row.image_alt || row.name,
    modelUrl: row.model_url,
    modelAttribution: row.model_attribution,
    modelScale: row.model_scale || 1.0,
    references: row.references_sources ? JSON.parse(row.references_sources) : [],
    crowdLevel: row.crowd_level,
    crowdPercentage: row.crowd_percentage,
    status: row.status,
    isPublished: Boolean(row.is_published),
    digitalTwinAvailable: Boolean(row.model_url && row.model_url.trim().length > 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

// -------------------------------------------------------------
// 1. HEALTH CHECK ENDPOINT
// -------------------------------------------------------------
app.get('/api/health', async (req, res) => {
  try {
    const dbHealth = await db.checkHealth();
    const countResult = await db.query('SELECT COUNT(*) as total FROM monuments');
    const total = countResult[0]?.total || 0;

    res.status(200).json({
      success: true,
      service: 'VIRASAT Backend API',
      status: 'UP',
      timestamp: new Date().toISOString(),
      database: dbHealth,
      monumentsCount: total
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: 'DOWN',
      error: err.message
    });
  }
});

// -------------------------------------------------------------
// 2. LIST & SEARCH MONUMENTS
// -------------------------------------------------------------
app.get('/api/monuments', async (req, res) => {
  try {
    const { state, category, status, search, has3D } = req.query;

    let sql = 'SELECT * FROM monuments WHERE 1=1';
    const params = [];

    if (state && state !== 'ALL') {
      sql += ' AND state = ?';
      params.push(state);
    }

    if (category && category !== 'ALL') {
      sql += ' AND category = ?';
      params.push(category);
    }

    if (status && status !== 'ALL') {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (has3D === 'true') {
      sql += ' AND model_url IS NOT NULL AND model_url != ""';
    }

    if (search && search.trim().length > 0) {
      const q = `%${search.trim().toLowerCase()}%`;
      sql += ` AND (
        LOWER(name) LIKE ? OR
        LOWER(state) LIKE ? OR
        LOWER(location) LIKE ? OR
        LOWER(dynasty) LIKE ? OR
        LOWER(architectural_style) LIKE ?
      )`;
      params.push(q, q, q, q, q);
    }

    sql += ' ORDER BY is_published DESC, name ASC';

    const rows = await db.query(sql, params);
    const data = rows.map(formatMonumentRow);

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (err) {
    console.error('[API Error /api/monuments]:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve monuments', error: err.message });
  }
});

// -------------------------------------------------------------
// 3. GET SINGLE MONUMENT BY ID
// -------------------------------------------------------------
app.get('/api/monuments/:id', async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM monuments WHERE id = ?', [req.params.id]);
    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, message: `Monument with ID '${req.params.id}' not found` });
    }

    const monument = formatMonumentRow(rows[0]);
    const completeness = evaluateMonumentCompleteness(monument);

    res.status(200).json({
      success: true,
      data: {
        ...monument,
        completeness
      }
    });
  } catch (err) {
    console.error(`[API Error /api/monuments/${req.params.id}]:`, err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// -------------------------------------------------------------
// 4. CREATE MONUMENT (WITH DEDUPLICATION & INTEGRITY VALIDATION)
// -------------------------------------------------------------
app.post('/api/monuments', async (req, res) => {
  try {
    // 1. Zod Input Validation
    const parseResult = monumentInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      const issues = parseResult.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }));
      return res.status(400).json({
        success: false,
        message: 'Validation failed for submitted monument data',
        errors: issues
      });
    }

    const payload = parseResult.data;
    const normalizedName = normalizeMonumentName(payload.name);

    // 2. Deduplication Check
    const existing = await db.query(
      'SELECT id, name FROM monuments WHERE normalized_name = ?',
      [normalizedName]
    );

    if (existing && existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Duplicate monument detected: A monument named '${existing[0].name}' is already registered with ID '${existing[0].id}'.`,
        existingId: existing[0].id
      });
    }

    // 3. Publication Completeness Evaluation
    const completeness = evaluateMonumentCompleteness(payload);

    if (payload.status === 'published' && !completeness.canPublish) {
      return res.status(422).json({
        success: false,
        message: 'Cannot publish monument: Essential content or 3D model is missing.',
        completeness
      });
    }

    const id = payload.id || `monument-${Date.now()}`;
    const now = new Date().toISOString();
    const isPublished = payload.status === 'published' ? 1 : 0;

    await db.run(
      `INSERT INTO monuments (
        id, name, normalized_name, hindi_name, state, city, country, location,
        latitude, longitude, category, dynasty, built_era, commissioned_year,
        completion_year, architectural_style, architectural_features, description,
        historical_background, cultural_significance, languages, local_activities,
        image_url, image_attribution, image_alt, model_url, model_attribution,
        model_scale, references_sources, crowd_level, crowd_percentage, status,
        is_published, created_at, updated_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )`,
      [
        id,
        payload.name.trim(),
        normalizedName,
        payload.hindiName || null,
        payload.state.trim(),
        payload.city || null,
        payload.country || 'India',
        payload.location.trim(),
        payload.latitude || null,
        payload.longitude || null,
        payload.category,
        payload.dynasty || null,
        payload.builtEra.trim(),
        payload.commissionedYear || null,
        payload.completionYear || null,
        payload.architecturalStyle,
        JSON.stringify(payload.architecturalFeatures || []),
        payload.description.trim(),
        payload.historicalBackground || payload.description.trim(),
        payload.culturalSignificance || null,
        JSON.stringify(payload.languages || []),
        JSON.stringify(payload.localActivities || []),
        payload.imageUrl.trim(),
        payload.imageAttribution || 'Community Contributor',
        payload.imageAlt || payload.name,
        payload.modelUrl || null,
        payload.modelAttribution || null,
        payload.modelScale || 1.0,
        JSON.stringify(payload.references || []),
        payload.crowdLevel || 'MODERATE',
        payload.crowdPercentage || 50,
        payload.status,
        isPublished,
        now,
        now
      ]
    );

    const insertedRows = await db.query('SELECT * FROM monuments WHERE id = ?', [id]);
    const createdMonument = formatMonumentRow(insertedRows[0]);

    res.status(201).json({
      success: true,
      message: 'Monument successfully registered',
      data: createdMonument,
      completeness
    });
  } catch (err) {
    console.error('[API Error POST /api/monuments]:', err);
    res.status(500).json({ success: false, message: 'Server error saving monument', error: err.message });
  }
});

// -------------------------------------------------------------
// 5. UPDATE MONUMENT
// -------------------------------------------------------------
app.put('/api/monuments/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingRows = await db.query('SELECT * FROM monuments WHERE id = ?', [id]);
    if (!existingRows || existingRows.length === 0) {
      return res.status(404).json({ success: false, message: `Monument with ID '${id}' not found` });
    }

    const parseResult = monumentInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      const issues = parseResult.error.issues.map(i => ({ field: i.path.join('.'), message: i.message }));
      return res.status(400).json({
        success: false,
        message: 'Validation failed for updated monument data',
        errors: issues
      });
    }

    const payload = parseResult.data;
    const normalizedName = normalizeMonumentName(payload.name);

    // Check duplicate name against OTHER monuments
    const duplicateCheck = await db.query(
      'SELECT id, name FROM monuments WHERE normalized_name = ? AND id != ?',
      [normalizedName, id]
    );

    if (duplicateCheck && duplicateCheck.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Cannot rename to '${payload.name}': Another monument already exists with this name (${duplicateCheck[0].id}).`
      });
    }

    const completeness = evaluateMonumentCompleteness(payload);
    if (payload.status === 'published' && !completeness.canPublish) {
      return res.status(422).json({
        success: false,
        message: 'Cannot set status to published: Missing required fields or 3D model.',
        completeness
      });
    }

    const now = new Date().toISOString();
    const isPublished = payload.status === 'published' ? 1 : 0;

    await db.run(
      `UPDATE monuments SET
        name = ?,
        normalized_name = ?,
        hindi_name = ?,
        state = ?,
        city = ?,
        country = ?,
        location = ?,
        latitude = ?,
        longitude = ?,
        category = ?,
        dynasty = ?,
        built_era = ?,
        commissioned_year = ?,
        completion_year = ?,
        architectural_style = ?,
        architectural_features = ?,
        description = ?,
        historical_background = ?,
        cultural_significance = ?,
        languages = ?,
        local_activities = ?,
        image_url = ?,
        image_attribution = ?,
        image_alt = ?,
        model_url = ?,
        model_attribution = ?,
        model_scale = ?,
        references_sources = ?,
        crowd_level = ?,
        crowd_percentage = ?,
        status = ?,
        is_published = ?,
        updated_at = ?
      WHERE id = ?`,
      [
        payload.name.trim(),
        normalizedName,
        payload.hindiName || null,
        payload.state.trim(),
        payload.city || null,
        payload.country || 'India',
        payload.location.trim(),
        payload.latitude || null,
        payload.longitude || null,
        payload.category,
        payload.dynasty || null,
        payload.builtEra.trim(),
        payload.commissionedYear || null,
        payload.completionYear || null,
        payload.architecturalStyle,
        JSON.stringify(payload.architecturalFeatures || []),
        payload.description.trim(),
        payload.historicalBackground || payload.description.trim(),
        payload.culturalSignificance || null,
        JSON.stringify(payload.languages || []),
        JSON.stringify(payload.localActivities || []),
        payload.imageUrl.trim(),
        payload.imageAttribution || 'Community Contributor',
        payload.imageAlt || payload.name,
        payload.modelUrl || null,
        payload.modelAttribution || null,
        payload.modelScale || 1.0,
        JSON.stringify(payload.references || []),
        payload.crowdLevel || 'MODERATE',
        payload.crowdPercentage || 50,
        payload.status,
        isPublished,
        now,
        id
      ]
    );

    const updatedRows = await db.query('SELECT * FROM monuments WHERE id = ?', [id]);
    const updatedMonument = formatMonumentRow(updatedRows[0]);

    res.status(200).json({
      success: true,
      message: 'Monument successfully updated',
      data: updatedMonument,
      completeness
    });
  } catch (err) {
    console.error(`[API Error PUT /api/monuments/${req.params.id}]:`, err);
    res.status(500).json({ success: false, message: 'Server error updating monument', error: err.message });
  }
});

// -------------------------------------------------------------
// 6. DELETE MONUMENT
// -------------------------------------------------------------
app.delete('/api/monuments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.query('SELECT id, name FROM monuments WHERE id = ?', [id]);
    if (!existing || existing.length === 0) {
      return res.status(404).json({ success: false, message: `Monument with ID '${id}' not found` });
    }

    await db.run('DELETE FROM monuments WHERE id = ?', [id]);
    res.status(200).json({
      success: true,
      message: `Monument '${existing[0].name}' (${id}) deleted successfully`
    });
  } catch (err) {
    console.error(`[API Error DELETE /api/monuments/${req.params.id}]:`, err);
    res.status(500).json({ success: false, message: 'Server error deleting monument', error: err.message });
  }
});

// -------------------------------------------------------------
// 7. ADMINISTRATIVE DATA COMPLETENESS AUDIT REPORT
// -------------------------------------------------------------
app.get('/api/admin/completeness-report', async (req, res) => {
  try {
    const rows = await db.query('SELECT * FROM monuments ORDER BY name ASC');
    const monuments = rows.map(formatMonumentRow);

    const auditResults = monuments.map(m => {
      const evaluation = evaluateMonumentCompleteness(m);
      return {
        id: m.id,
        name: m.name,
        state: m.state,
        status: m.status,
        isPublished: m.isPublished,
        hasWorking3DModel: evaluation.hasWorking3DModel,
        modelUrl: m.modelUrl,
        completionPercentage: evaluation.completionPercentage,
        canPublish: evaluation.canPublish,
        missingFields: evaluation.missingFields
      };
    });

    const total = auditResults.length;
    const published = auditResults.filter(r => r.isPublished && r.canPublish).length;
    const drafts = auditResults.filter(r => !r.isPublished || !r.canPublish).length;
    const with3DModels = auditResults.filter(r => r.hasWorking3DModel).length;

    res.status(200).json({
      success: true,
      summary: {
        totalMonuments: total,
        publishedMonuments: published,
        draftOrIncompleteMonuments: drafts,
        monumentsWithWorking3DModel: with3DModels,
        integrityHealthScore: total > 0 ? Math.round((published / total) * 100) : 0
      },
      monuments: auditResults
    });
  } catch (err) {
    console.error('[API Error /api/admin/completeness-report]:', err);
    res.status(500).json({ success: false, message: 'Failed to generate audit report', error: err.message });
  }
});

// Serve static assets from public/ (3D models, textures) and dist/ (built web application)
const publicDir = path.resolve(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

const distDir = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distDir, 'index.html'));
    }
    next();
  });
}

// Central Error Handling
app.use((err, req, res, next) => {
  console.error('[Express Unhandled Error]:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Startup sequence
async function startServer() {
  try {
    await runMigrations();
    await seedMonuments();

    app.listen(PORT, () => {
      console.log(`\n=======================================================`);
      console.log(`  🏛️  VIRASAT Heritage SuperApp is LIVE!`);
      console.log(`  🌐  App & 3D Viewer: http://localhost:${PORT}`);
      console.log(`  🔌  REST API:       http://localhost:${PORT}/api/monuments`);
      console.log(`  ❤️  Health Check:   http://localhost:${PORT}/api/health`);
      console.log(`=======================================================\n`);
    });
  } catch (err) {
    console.error('[Server Startup Failure]:', err);
    process.exit(1);
  }
}

// Start server
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  startServer();
}

export { app, startServer };
