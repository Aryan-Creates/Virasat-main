/**
 * VIRASAT - API Endpoints Integration Test
 */

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { app } from '../server/index.js';
import { runMigrations } from '../server/migrate.js';
import { seedMonuments } from '../server/seed.js';

let server;
const TEST_PORT = 5099;
const BASE_URL = `http://localhost:${TEST_PORT}`;

describe('API Endpoints Verification', () => {
  before(async () => {
    await runMigrations();
    await seedMonuments();
    await new Promise((resolve) => {
      server = app.listen(TEST_PORT, resolve);
    });
  });

  after(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('GET /api/health returns UP and database health', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.status, 'UP');
    assert.equal(body.database.ok, true);
    assert.ok(body.monumentsCount >= 10);
  });

  test('GET /api/monuments returns monuments list without duplicates', async () => {
    const res = await fetch(`${BASE_URL}/api/monuments`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.data.length >= 10);

    const tajMatches = body.data.filter(m => m.name.toLowerCase().includes('taj mahal'));
    assert.equal(tajMatches.length, 1, 'Taj Mahal must not appear twice in /api/monuments');
  });

  test('GET /api/monuments with search filter works accurately', async () => {
    const res = await fetch(`${BASE_URL}/api/monuments?search=Qutub`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.count, 1);
    assert.equal(body.data[0].id, 'site-007');
    assert.equal(body.data[0].name, 'Qutub Minar Complex');
  });

  test('POST /api/monuments rejects duplicate monument name', async () => {
    const dupPayload = {
      name: 'Taj Mahal Complex',
      state: 'Uttar Pradesh',
      location: 'Agra',
      builtEra: '1632',
      architecturalStyle: 'Mughal',
      description: 'Duplicate attempt test description that is sufficiently long.',
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523'
    };

    const res = await fetch(`${BASE_URL}/api/monuments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dupPayload)
    });

    assert.equal(res.status, 409); // Conflict
    const body = await res.json();
    assert.equal(body.success, false);
    assert.match(body.message, /Duplicate monument detected/);
  });

  test('POST /api/monuments creates a new valid draft monument and persists it', async () => {
    const newMonument = {
      name: `Test Archaeological Site ${Date.now()}`,
      state: 'Rajasthan',
      location: 'Near Jaisalmer',
      builtEra: '12th Century CE',
      architecturalStyle: 'Rajput Architecture',
      description: 'Newly discovered historic fortress ruins with ancient water storage systems.',
      historicalBackground: 'Built as a desert outpost guarding trade routes across the Thar Desert.',
      culturalSignificance: 'Represents medieval arid water harvesting technologies.',
      imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada',
      imageAttribution: 'ASI Desert Circle',
      status: 'draft'
    };

    const res = await fetch(`${BASE_URL}/api/monuments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMonument)
    });

    assert.equal(res.status, 201);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.name, newMonument.name);

    // Verify it persists in subsequent query
    const checkRes = await fetch(`${BASE_URL}/api/monuments/${body.data.id}`);
    assert.equal(checkRes.status, 200);
    const checkBody = await checkRes.json();
    assert.equal(checkBody.data.id, body.data.id);

    // Clean up test monument
    await fetch(`${BASE_URL}/api/monuments/${body.data.id}`, { method: 'DELETE' });
  });

  test('GET /api/admin/completeness-report produces audit metrics', async () => {
    const res = await fetch(`${BASE_URL}/api/admin/completeness-report`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.success, true);
    assert.ok(body.summary.totalMonuments >= 10);
    assert.ok(body.summary.publishedMonuments >= 6);
    assert.ok(body.summary.monumentsWithWorking3DModel >= 6);
  });
});
