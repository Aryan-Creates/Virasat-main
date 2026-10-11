-- VIRASAT Database Schema
-- Defines monuments table, uniqueness constraints, completeness fields, and indexes

CREATE TABLE IF NOT EXISTS monuments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  normalized_name TEXT NOT NULL UNIQUE,
  hindi_name TEXT,
  state TEXT NOT NULL,
  city TEXT,
  country TEXT NOT NULL DEFAULT 'India',
  location TEXT NOT NULL,
  latitude REAL,
  longitude REAL,
  category TEXT NOT NULL DEFAULT 'Monument',
  dynasty TEXT,
  built_era TEXT NOT NULL,
  commissioned_year INTEGER,
  completion_year INTEGER,
  architectural_style TEXT NOT NULL,
  architectural_features TEXT, -- JSON string array
  description TEXT NOT NULL,
  historical_background TEXT NOT NULL,
  cultural_significance TEXT NOT NULL,
  languages TEXT, -- JSON string array
  local_activities TEXT, -- JSON string array
  image_url TEXT NOT NULL,
  image_attribution TEXT,
  image_alt TEXT,
  model_url TEXT,
  model_attribution TEXT,
  model_scale REAL DEFAULT 1.0,
  references_sources TEXT, -- JSON string array
  crowd_level TEXT DEFAULT 'MODERATE',
  crowd_percentage INTEGER DEFAULT 50,
  status TEXT NOT NULL DEFAULT 'published', -- 'draft' | 'published'
  is_published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_monuments_normalized_name ON monuments(normalized_name);
CREATE INDEX IF NOT EXISTS idx_monuments_state ON monuments(state);
CREATE INDEX IF NOT EXISTS idx_monuments_status ON monuments(status);
CREATE INDEX IF NOT EXISTS idx_monuments_is_published ON monuments(is_published);
