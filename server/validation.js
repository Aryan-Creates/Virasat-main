/**
 * VIRASAT - Data Validation & Integrity Rules
 * Powered by Zod. Defines client and server-side validation schemas
 * and completeness evaluation for published vs. draft monuments.
 */

import { z } from 'zod';

export const INDIAN_STATES_AND_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
  'International / Other'
];

export const MONUMENT_CATEGORIES = [
  'Mausoleum',
  'Temple',
  'Fort & Imperial Palace',
  'Minaret & Victory Tower',
  'Palace Screen',
  'Stepwell (Vav)',
  'Rock-cut Cave',
  'Stupa & Monastic Complex',
  'Archaeological Site',
  'Other Heritage Monument'
];

export const ARCHITECTURAL_STYLES = [
  'Indo-Islamic & Mughal Architecture',
  'Kalinga Architecture (Pidha Deula)',
  'Dravidian Vijayanagara Architecture',
  'Chola Dravidian Architecture',
  'Maru-Gurjara Architecture',
  'Kashmiri Temple Architecture',
  'Rajput-Mughal Fusion Architecture',
  'Indo-Saracenic Architecture',
  'Buddhist & Mauryan Architecture',
  'Other / Custom Style'
];

// Helper to normalize monument name for duplicate checking
export function normalizeMonumentName(name) {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/complex|temple|fort|mahal|minar/gi, (m) => m.toLowerCase())
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Zod Schema for Monument Creation / Updating
export const monumentInputSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, 'Monument name must be at least 2 characters').max(150),
  hindiName: z.string().optional().nullable(),
  state: z.string().min(2, 'Please select or enter a valid state/region'),
  city: z.string().optional().nullable(),
  country: z.string().default('India'),
  location: z.string().min(2, 'Location details are required'),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  category: z.string().default('Mausoleum'),
  dynasty: z.string().optional().nullable(),
  builtEra: z.string().min(2, 'Please enter a valid construction era or period (e.g., 1632–1653 CE or 13th Century CE)'),
  commissionedYear: z.number().int().optional().nullable(),
  completionYear: z.number().int().optional().nullable(),
  architecturalStyle: z.string().min(2, 'Architectural style is required'),
  architecturalFeatures: z.array(z.string()).default([]),
  description: z.string().min(10, 'Historical description must be at least 10 characters'),
  historicalBackground: z.string().optional().nullable(),
  culturalSignificance: z.string().optional().nullable(),
  languages: z.array(z.string()).default([]),
  localActivities: z.array(z.string()).default([]),
  imageUrl: z.string().url('Primary image must be a valid URL (http/https)').or(z.string().regex(/^\/.*$/)),
  imageAttribution: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  modelUrl: z.string().optional().nullable(),
  modelAttribution: z.string().optional().nullable(),
  modelScale: z.number().positive().default(1.0),
  references: z.array(z.string()).default([]),
  crowdLevel: z.enum(['LOW', 'MODERATE', 'HIGH', 'CRITICAL']).default('MODERATE'),
  crowdPercentage: z.number().min(0).max(100).default(50),
  status: z.enum(['draft', 'published']).default('published')
});

/**
 * Strict completeness evaluator for VIRASAT Publication Integrity
 * Requirement 8: A monument must NOT be presented as fully available on VIRASAT
 * if its 3D model, essential historical content, or valid image are missing.
 */
export function evaluateMonumentCompleteness(monument) {
  const missingFields = [];

  if (!monument.name || monument.name.trim().length < 2) missingFields.push('Canonical Monument Name');
  if (!monument.state) missingFields.push('State / Region');
  if (!monument.location) missingFields.push('Geographic Location');
  if (!monument.builtEra) missingFields.push('Construction Period / Era');
  if (!monument.architecturalStyle) missingFields.push('Architectural Style');
  if (!monument.description || monument.description.trim().length < 20) missingFields.push('Description (min 20 chars)');
  if (!monument.historicalBackground || monument.historicalBackground.trim().length < 20) missingFields.push('Historical Background');
  if (!monument.culturalSignificance || monument.culturalSignificance.trim().length < 15) missingFields.push('Cultural Significance');
  if (!monument.imageUrl) missingFields.push('Primary Image URL');
  if (!monument.imageAttribution) missingFields.push('Image Attribution / Source');
  if (!monument.modelUrl) missingFields.push('Working 3D Model Asset (.glb)');
  if (!monument.modelAttribution) missingFields.push('3D Model Attribution');
  if (!monument.references || (Array.isArray(monument.references) && monument.references.length === 0)) {
    missingFields.push('Historical References / Sources');
  }

  const totalRequired = 13;
  const fulfilledCount = totalRequired - missingFields.length;
  const completionPercentage = Math.round((fulfilledCount / totalRequired) * 100);

  const canPublish = missingFields.length === 0;

  return {
    isComplete: canPublish,
    canPublish,
    completionPercentage,
    missingFields,
    hasWorking3DModel: Boolean(monument.modelUrl && monument.modelUrl.trim().length > 0)
  };
}
