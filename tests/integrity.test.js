/**
 * VIRASAT - Automated Test Suite
 * Validates Data Integrity, Deduplication, Zod Validation, and Publication Rules.
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { 
  monumentInputSchema, 
  normalizeMonumentName, 
  evaluateMonumentCompleteness 
} from '../server/validation.js';
import { CANONICAL_MONUMENTS } from '../server/seedData.js';
import { db } from '../server/db.js';
import { runMigrations } from '../server/migrate.js';
import { seedMonuments } from '../server/seed.js';

describe('1. Monument Deduplication & Canonical Integrity', () => {
  test('normalizeMonumentName should normalize variations correctly', () => {
    assert.equal(normalizeMonumentName('Taj Mahal'), 'taj mahal');
    assert.equal(normalizeMonumentName('Taj Mahal Complex'), 'taj mahal complex');
    assert.equal(normalizeMonumentName('  TAJ   MAHAL  '), 'taj mahal');
    assert.equal(normalizeMonumentName('Qutub Minar Complex!'), 'qutub minar complex');
  });

  test('Canonical dataset must contain ZERO duplicate monuments', () => {
    const ids = new Set();
    const normalizedNames = new Set();

    for (const m of CANONICAL_MONUMENTS) {
      assert.equal(ids.has(m.id), false, `Duplicate monument ID detected: ${m.id}`);
      ids.add(m.id);

      const norm = normalizeMonumentName(m.name);
      assert.equal(normalizedNames.has(norm), false, `Duplicate monument name detected: ${m.name}`);
      normalizedNames.add(norm);
    }
  });

  test('Taj Mahal must appear exactly once in canonical data', () => {
    const tajEntries = CANONICAL_MONUMENTS.filter(m => m.name.toLowerCase().includes('taj mahal'));
    assert.equal(tajEntries.length, 1, `Expected exactly 1 Taj Mahal entry, found ${tajEntries.length}`);
    assert.equal(tajEntries[0].id, 'site-006');
  });
});

describe('2. Monument Image Accuracy & Fallbacks', () => {
  test('Qutub Minar must NOT use Taj Mahal image', () => {
    const taj = CANONICAL_MONUMENTS.find(m => m.id === 'site-006');
    const qutub = CANONICAL_MONUMENTS.find(m => m.id === 'site-007');

    assert.notEqual(qutub.imageUrl, taj.imageUrl, 'Qutub Minar is erroneously using the Taj Mahal image URL!');
    assert.match(qutub.imageUrl, /^(https?:\/\/|\/images\/)/);
  });

  test('Every canonical monument must have a valid non-empty imageUrl and alt text', () => {
    for (const m of CANONICAL_MONUMENTS) {
      assert.ok(m.imageUrl && m.imageUrl.length > 5, `${m.name} is missing a valid imageUrl`);
      assert.ok(m.imageAlt && m.imageAlt.length > 3, `${m.name} is missing imageAlt text`);
      if (m.imageUrl.startsWith('/images/')) {
        const localPath = path.resolve(process.cwd(), 'public', m.imageUrl.replace(/^\//, ''));
        assert.ok(fs.existsSync(localPath), `Image file for ${m.name} does not exist at ${localPath}`);
      }
    }
  });
});

describe('3. Form Validation (Zod Schema)', () => {
  test('Rejects arbitrary strings in coordinates or empty names', () => {
    const badInput = {
      name: '',
      state: 'Uttar Pradesh',
      location: 'Agra',
      builtEra: '1632',
      architecturalStyle: 'Mughal',
      description: 'A test monument',
      imageUrl: 'not-a-url',
      latitude: 'invalid-lat-string'
    };

    const result = monumentInputSchema.safeParse(badInput);
    assert.equal(result.success, false);
    const errorFields = result.error.issues.map(i => i.path[0]);
    assert.ok(errorFields.includes('name'));
    assert.ok(errorFields.includes('imageUrl'));
    assert.ok(errorFields.includes('latitude'));
  });

  test('Accepts valid historical periods (approximate dates, ranges, centuries)', () => {
    const validInputs = [
      '1632–1653 CE',
      '13th Century CE (c. 1250 CE)',
      '1199–1368 CE',
      'c. 15th Century'
    ];

    for (const era of validInputs) {
      const input = {
        name: 'Valid Monument Test',
        state: 'Delhi',
        location: 'Mehrauli',
        builtEra: era,
        architecturalStyle: 'Indo-Islamic',
        description: 'A valid historical description with sufficient length for testing.',
        imageUrl: 'https://images.unsplash.com/photo-1545232979-fbf6c63bfa2e'
      };
      const result = monumentInputSchema.safeParse(input);
      assert.equal(result.success, true, `Failed on valid historical era: ${era}`);
    }
  });
});

describe('4. Publication & 3D Completeness Rules', () => {
  test('Complete monument passes publication checks', () => {
    const taj = CANONICAL_MONUMENTS.find(m => m.id === 'site-006');
    const evaluation = evaluateMonumentCompleteness(taj);

    assert.equal(evaluation.isComplete, true);
    assert.equal(evaluation.canPublish, true);
    assert.equal(evaluation.hasWorking3DModel, true);
    assert.equal(evaluation.missingFields.length, 0);
    assert.equal(evaluation.completionPercentage, 100);
  });

  test('Incomplete monument (missing 3D model) is flagged as draft/incomplete', () => {
    const hampi = CANONICAL_MONUMENTS.find(m => m.id === 'site-002');
    const evaluation = evaluateMonumentCompleteness(hampi);

    assert.equal(evaluation.isComplete, false);
    assert.equal(evaluation.canPublish, false);
    assert.equal(evaluation.hasWorking3DModel, false);
    assert.ok(evaluation.missingFields.includes('Working 3D Model Asset (.glb)'));
  });
});

describe('5. Database Operations & Persistence', () => {
  test('Migration and Seeding should populate database with exactly 10 unique monuments', async () => {
    await runMigrations();
    await seedMonuments();

    const rows = await db.query('SELECT COUNT(*) as count FROM monuments');
    assert.equal(rows[0].count, 10);

    const tajRows = await db.query('SELECT * FROM monuments WHERE id = ?', ['site-006']);
    assert.equal(tajRows.length, 1);
    assert.equal(tajRows[0].name, 'Taj Mahal Complex');
  });
});
