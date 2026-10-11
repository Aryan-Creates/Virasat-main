/**
 * VIRASAT - Database Seed Script
 * Inserts canonical monuments safely with deduplication guarantees.
 */

import { fileURLToPath } from 'node:url';
import { db } from './db.js';
import { CANONICAL_MONUMENTS } from './seedData.js';
import { normalizeMonumentName } from './validation.js';

export async function seedMonuments() {
  console.log('[Seed] Seeding canonical monuments into database...');

  const now = new Date().toISOString();
  let insertedCount = 0;
  let updatedCount = 0;

  for (const m of CANONICAL_MONUMENTS) {
    const normalizedName = normalizeMonumentName(m.name);

    // Check if monument already exists by ID or normalized name
    const existing = await db.query(
      'SELECT id, name FROM monuments WHERE id = ? OR normalized_name = ?',
      [m.id, normalizedName]
    );

    const jsonFeatures = JSON.stringify(m.architecturalFeatures || []);
    const jsonLanguages = JSON.stringify(m.languages || []);
    const jsonActivities = JSON.stringify(m.localActivities || []);
    const jsonRefs = JSON.stringify(m.references || []);

    if (existing && existing.length > 0) {
      // Update existing record to ensure data integrity
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
          m.name,
          normalizedName,
          m.hindiName || null,
          m.state,
          m.city || null,
          m.country || 'India',
          m.location,
          m.latitude || null,
          m.longitude || null,
          m.category,
          m.dynasty || null,
          m.builtEra,
          m.commissionedYear || null,
          m.completionYear || null,
          m.architecturalStyle,
          jsonFeatures,
          m.description,
          m.historicalBackground,
          m.culturalSignificance,
          jsonLanguages,
          jsonActivities,
          m.imageUrl,
          m.imageAttribution || null,
          m.imageAlt || null,
          m.modelUrl || null,
          m.modelAttribution || null,
          m.modelScale || 1.0,
          jsonRefs,
          m.crowdLevel || 'MODERATE',
          m.crowdPercentage || 50,
          m.status || 'published',
          m.isPublished ? 1 : 0,
          now,
          m.id
        ]
      );
      updatedCount++;
    } else {
      // Insert new monument
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
          m.id,
          m.name,
          normalizedName,
          m.hindiName || null,
          m.state,
          m.city || null,
          m.country || 'India',
          m.location,
          m.latitude || null,
          m.longitude || null,
          m.category,
          m.dynasty || null,
          m.builtEra,
          m.commissionedYear || null,
          m.completionYear || null,
          m.architecturalStyle,
          jsonFeatures,
          m.description,
          m.historicalBackground,
          m.culturalSignificance,
          jsonLanguages,
          jsonActivities,
          m.imageUrl,
          m.imageAttribution || null,
          m.imageAlt || null,
          m.modelUrl || null,
          m.modelAttribution || null,
          m.modelScale || 1.0,
          jsonRefs,
          m.crowdLevel || 'MODERATE',
          m.crowdPercentage || 50,
          m.status || 'published',
          m.isPublished ? 1 : 0,
          now,
          now
        ]
      );
      insertedCount++;
    }
  }

  console.log(`[Seed] Seeding complete: ${insertedCount} inserted, ${updatedCount} updated.`);
}

// Allow direct execution
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  seedMonuments()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Seed Error]:', err);
      process.exit(1);
    });
}
