/**
 * VIRASAT - Validated Monument Submission Component
 * Features:
 * - Controlled input controls for historical periods, states, styles, and categories
 * - Numeric coordinate validation (-90 to 90, -180 to 180)
 * - Multi-select tags for languages and local visitor activities
 * - Image URL validation with live preview
 * - Client-side validation with instant inline error feedback
 * - Server-side validation via apiClient.createMonument with duplicate prevention
 */

import React, { useState } from 'react';
import { 
  PlusCircle, 
  CheckCircle2, 
  Landmark, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Box, 
  Layers, 
  Languages, 
  Activity, 
  AlertCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { 
  INDIAN_STATES_AND_UTS, 
  MONUMENT_CATEGORIES, 
  ARCHITECTURAL_STYLES,
  monumentInputSchema,
  normalizeMonumentName
} from '../../server/validation';
import { apiClient } from '../services/api';

const COMMON_LANGUAGES = ['Hindi', 'English', 'Sanskrit', 'Urdu', 'Tamil', 'Telugu', 'Kannada', 'Odia', 'Bengali', 'Gujarati', 'Marathi', 'Punjabi', 'Persian', 'Arabic'];

const COMMON_ACTIVITIES = [
  'Heritage Walks & Guided Trails',
  'Architecture Photography Sessions',
  'Light & Sound Evening Spectacle',
  'Ancient Inscription & Epigraphy Study',
  'Classical Music & Dance Festivals',
  'Local Traditional Food Trails',
  'Artisan & Stone Carving Workshops',
  'Riverbank Sunset Views'
];

export default function AddMonumentForm({ onAddMonument }) {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    hindiName: '',
    state: 'Uttar Pradesh',
    city: '',
    location: '',
    category: 'Mausoleum',
    dynasty: '',
    builtEra: '',
    architecturalStyle: 'Indo-Islamic & Mughal Architecture',
    customStyle: '',
    description: '',
    historicalBackground: '',
    culturalSignificance: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
    imageAttribution: '',
    modelUrl: '',
    modelAttribution: '',
    status: 'published'
  });

  const [selectedLanguages, setSelectedLanguages] = useState(['Hindi', 'English']);
  const [customLanguage, setCustomLanguage] = useState('');
  const [selectedActivities, setSelectedActivities] = useState(['Heritage Walks & Guided Trails']);
  const [customActivity, setCustomActivity] = useState('');

  // UI state
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field change handler
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Toggle multi-select tags
  const toggleLanguage = (lang) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const addCustomLanguage = () => {
    if (customLanguage.trim() && !selectedLanguages.includes(customLanguage.trim())) {
      setSelectedLanguages(prev => [...prev, customLanguage.trim()]);
      setCustomLanguage('');
    }
  };

  const toggleActivity = (act) => {
    setSelectedActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const addCustomActivity = () => {
    if (customActivity.trim() && !selectedActivities.includes(customActivity.trim())) {
      setSelectedActivities(prev => [...prev, customActivity.trim()]);
      setCustomActivity('');
    }
  };

  // Client-Side Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Monument name is required (at least 2 characters).';
    }

    if (!formData.builtEra.trim()) {
      newErrors.builtEra = 'Please specify construction period or era (e.g. 1632–1653 CE or 13th Century CE).';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Specific location/address is required.';
    }

    if (!formData.description.trim() || formData.description.trim().length < 15) {
      newErrors.description = 'Description must be at least 15 characters long.';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Primary image URL is required.';
    } else {
      try {
        new URL(formData.imageUrl.trim());
      } catch (_) {
        if (!formData.imageUrl.startsWith('/')) {
          newErrors.imageUrl = 'Please provide a valid URL (starting with http://, https://, or /).';
        }
      }
    }

    if (formData.latitude !== '') {
      const latNum = parseFloat(formData.latitude);
      if (isNaN(latNum) || latNum < -90 || latNum > 90) {
        newErrors.latitude = 'Latitude must be a valid number between -90 and 90.';
      }
    }

    if (formData.longitude !== '') {
      const lngNum = parseFloat(formData.longitude);
      if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
        newErrors.longitude = 'Longitude must be a valid number between -180 and 180.';
      }
    }

    if (formData.architecturalStyle === 'Other / Custom Style' && !formData.customStyle.trim()) {
      newErrors.customStyle = 'Please describe the custom architectural style.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessData(null);

    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    const effectiveStyle = formData.architecturalStyle === 'Other / Custom Style'
      ? formData.customStyle.trim()
      : formData.architecturalStyle;

    const payload = {
      name: formData.name.trim(),
      hindiName: formData.hindiName.trim() || null,
      state: formData.state,
      city: formData.city.trim() || null,
      country: 'India',
      location: formData.location.trim(),
      category: formData.category,
      dynasty: formData.dynasty.trim() || null,
      builtEra: formData.builtEra.trim(),
      architecturalStyle: effectiveStyle,
      description: formData.description.trim(),
      historicalBackground: formData.historicalBackground.trim() || formData.description.trim(),
      culturalSignificance: formData.culturalSignificance.trim() || 'Significant regional cultural monument',
      languages: selectedLanguages,
      localActivities: selectedActivities,
      imageUrl: formData.imageUrl.trim(),
      imageAttribution: formData.imageAttribution.trim() || 'Contributor Photography',
      imageAlt: `${formData.name.trim()} Monument`,
      modelUrl: formData.modelUrl.trim() || null,
      modelAttribution: formData.modelUrl.trim() ? 'Contributor 3D Asset' : null,
      latitude: formData.latitude !== '' ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude !== '' ? parseFloat(formData.longitude) : null,
      status: formData.status
    };

    try {
      // Send to backend API
      const savedMonument = await apiClient.createMonument(payload);

      // Notify parent component state
      if (onAddMonument) {
        onAddMonument(savedMonument);
      }

      setSuccessData(savedMonument);

      // Reset form
      setFormData({
        name: '',
        hindiName: '',
        state: 'Uttar Pradesh',
        city: '',
        location: '',
        category: 'Mausoleum',
        dynasty: '',
        builtEra: '',
        architecturalStyle: 'Indo-Islamic & Mughal Architecture',
        customStyle: '',
        description: '',
        historicalBackground: '',
        culturalSignificance: '',
        latitude: '',
        longitude: '',
        imageUrl: '',
        imageAttribution: '',
        modelUrl: '',
        modelAttribution: '',
        status: 'published'
      });

      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('[Add Monument Error]:', err);
      if (err.errors && err.errors.length > 0) {
        const fieldErrors = {};
        err.errors.forEach(issue => {
          fieldErrors[issue.field] = issue.message;
        });
        setErrors(fieldErrors);
      }
      setServerError(err.message || 'Failed to submit monument.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      
      {/* Title */}
      <div className="border-b border-[#D4AF37]/25 pb-4">
        <h1 className="text-2xl font-bold font-serif-royal text-gold-gradient">
          Monument Submission & Archival Record
        </h1>
        <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
          Register verified cultural landmarks with strict data validation, historical period controls, and publication checks.
        </p>
      </div>

      {/* Success Notification Banner */}
      {successData && (
        <div className="p-4 rounded-xl bg-[#1E0609] border border-emerald-500/60 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-serif-royal font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Monument Successfully Registered and Persisted in Database!</span>
          </div>
          <p className="text-xs text-[#E5C158]/85">
            <strong>{successData.name}</strong> ({successData.id}) has been added to the official catalog.
            {successData.isPublished ? ' It is published and immediately discoverable in the Directory.' : ' It is saved in draft status.'}
          </p>
        </div>
      )}

      {/* Server Error Banner */}
      {serverError && (
        <div className="p-4 rounded-xl bg-[#4A0E17] border border-red-500/60 shadow-xl flex items-start gap-3 text-red-200 text-xs">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-serif-royal font-bold text-sm text-red-300">Submission Blocked</strong>
            <span>{serverError}</span>
          </div>
        </div>
      )}

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="heritage-card p-6 sm:p-8 space-y-6">
        
        {/* Section 1: Monument Identification */}
        <div className="space-y-4 border-b border-[#D4AF37]/20 pb-6">
          <h2 className="text-sm font-bold font-serif-royal text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
            <Landmark className="w-4 h-4" />
            <span>1. Monument Identity & Classification</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Monument Name */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                Monument Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g. Meenakshi Amman Temple"
                className={`w-full bg-[#1E0609] border rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/40 focus:outline-none transition-colors ${
                  errors.name ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                }`}
              />
              {errors.name && <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Hindi / Native Name (Optional) */}
            <div>
              <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
                Native / Hindi Script Name <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.hindiName}
                onChange={(e) => handleChange('hindiName', e.target.value)}
                placeholder="e.g. मीनाक्षी अम्मन मन्दिर"
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/40 focus:outline-none"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] font-serif-royal focus:outline-none"
              >
                {MONUMENT_CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat} className="bg-[#2D0A0E] text-[#FFFDF5]">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Dynasty / Ruler */}
            <div>
              <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
                Dynasty / Ruling Era <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.dynasty}
                onChange={(e) => handleChange('dynasty', e.target.value)}
                placeholder="e.g. Pandya Dynasty (Sadaiyavarman)"
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/40 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Construction Era & Architecture */}
        <div className="space-y-4 border-b border-[#D4AF37]/20 pb-6">
          <h2 className="text-sm font-bold font-serif-royal text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>2. Construction Period & Architectural Style</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Construction Period / Era */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                Construction Year or Historical Period *
              </label>
              <input
                type="text"
                value={formData.builtEra}
                onChange={(e) => handleChange('builtEra', e.target.value)}
                placeholder="e.g. 1623–1655 CE, 13th Century CE, or c. 1010 CE"
                className={`w-full bg-[#1E0609] border rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/40 focus:outline-none ${
                  errors.builtEra ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                }`}
              />
              <p className="text-[10px] text-[#E5C158]/60 mt-0.5">
                Accepts approximate ranges, centuries, or exact dates.
              </p>
              {errors.builtEra && <p className="text-[11px] text-red-400 mt-1">{errors.builtEra}</p>}
            </div>

            {/* Architectural Style */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                Architectural Style *
              </label>
              <select
                value={formData.architecturalStyle}
                onChange={(e) => handleChange('architecturalStyle', e.target.value)}
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] font-serif-royal focus:outline-none"
              >
                {ARCHITECTURAL_STYLES.map((style, idx) => (
                  <option key={idx} value={style} className="bg-[#2D0A0E] text-[#FFFDF5]">
                    {style}
                  </option>
                ))}
              </select>

              {formData.architecturalStyle === 'Other / Custom Style' && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={formData.customStyle}
                    onChange={(e) => handleChange('customStyle', e.target.value)}
                    placeholder="Enter custom architectural style..."
                    className="w-full bg-[#1E0609] border border-[#D4AF37]/40 rounded-lg px-3.5 py-1.5 text-xs text-[#FFFDF5] focus:outline-none"
                  />
                  {errors.customStyle && <p className="text-[11px] text-red-400 mt-1">{errors.customStyle}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Geographic Location & Coordinates */}
        <div className="space-y-4 border-b border-[#D4AF37]/20 pb-6">
          <h2 className="text-sm font-bold font-serif-royal text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>3. Geography & Coordinates</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* State Dropdown */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                State / Union Territory *
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] font-serif-royal focus:outline-none"
              >
                {INDIAN_STATES_AND_UTS.map((st, idx) => (
                  <option key={idx} value={st} className="bg-[#2D0A0E] text-[#FFFDF5]">
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
                City / Locality <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g. Madurai"
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none"
              />
            </div>

            {/* Location Line */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                Specific Location Details *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="e.g. Madurai, Tamil Nadu"
                className={`w-full bg-[#1E0609] border rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none ${
                  errors.location ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                }`}
              />
              {errors.location && <p className="text-[11px] text-red-400 mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Latitude & Longitude */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
                Latitude (-90 to 90) <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                placeholder="e.g. 9.9195"
                className={`w-full bg-[#1E0609] border rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none ${
                  errors.latitude ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                }`}
              />
              {errors.latitude && <p className="text-[11px] text-red-400 mt-1">{errors.latitude}</p>}
            </div>

            <div>
              <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
                Longitude (-180 to 180) <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                placeholder="e.g. 78.1193"
                className={`w-full bg-[#1E0609] border rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none ${
                  errors.longitude ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                }`}
              />
              {errors.longitude && <p className="text-[11px] text-red-400 mt-1">{errors.longitude}</p>}
            </div>
          </div>
        </div>

        {/* Section 4: Narrative & Historical Significance */}
        <div className="space-y-4 border-b border-[#D4AF37]/20 pb-6">
          <h2 className="text-sm font-bold font-serif-royal text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>4. Descriptions & Cultural Significance</span>
          </h2>

          <div>
            <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
              Historical Description * (Minimum 15 characters)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the monument's architectural layout, core shrines, and main visual identity..."
              className={`w-full bg-[#1E0609] border rounded-lg p-3 text-xs text-[#FFFDF5] placeholder-[#E5C158]/40 focus:outline-none ${
                errors.description ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
              }`}
            />
            {errors.description && <p className="text-[11px] text-red-400 mt-1">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
              Historical Background & Dynastic Origin <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={formData.historicalBackground}
              onChange={(e) => handleChange('historicalBackground', e.target.value)}
              placeholder="Detailed historical chronicle, founding ruler, key events..."
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg p-3 text-xs text-[#FFFDF5] focus:outline-none"
            />
          </div>
        </div>

        {/* Section 5: Languages & Local Activities */}
        <div className="space-y-4 border-b border-[#D4AF37]/20 pb-6">
          <h2 className="text-sm font-bold font-serif-royal text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
            <Languages className="w-4 h-4" />
            <span>5. Epigraphy, Languages & Visitor Experiences</span>
          </h2>

          {/* Languages Chips */}
          <div>
            <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1.5">
              Associated Languages & Inscription Scripts:
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_LANGUAGES.map((lang, idx) => {
                const isSelected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] font-semibold border border-[#D4AF37]/50'
                        : 'bg-[#1E0609] text-[#E5C158]/70 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customLanguage}
                onChange={(e) => setCustomLanguage(e.target.value)}
                placeholder="Add other language or ancient script..."
                className="bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-xs text-[#FFFDF5] flex-1 focus:outline-none"
              />
              <button
                type="button"
                onClick={addCustomLanguage}
                className="px-3 py-1 bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg text-xs font-serif-royal cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Local Visitor Activities */}
          <div className="pt-2">
            <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1.5">
              Local Activities & Cultural Traditions:
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_ACTIVITIES.map((act, idx) => {
                const isSelected = selectedActivities.includes(act);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleActivity(act)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] font-semibold border border-[#D4AF37]/50'
                        : 'bg-[#1E0609] text-[#E5C158]/70 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    {act}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={customActivity}
                onChange={(e) => setCustomActivity(e.target.value)}
                placeholder="Add custom activity or festival..."
                className="bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3 py-1 text-xs text-[#FFFDF5] flex-1 focus:outline-none"
              />
              <button
                type="button"
                onClick={addCustomActivity}
                className="px-3 py-1 bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 rounded-lg text-xs font-serif-royal cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Section 6: Media, 3D Assets & Publication Status */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold font-serif-royal text-[#D4AF37] uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            <span>6. Primary Imagery, 3D Asset & Status</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image URL */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                Primary Image URL *
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleChange('imageUrl', e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className={`w-full bg-[#1E0609] border rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none ${
                  errors.imageUrl ? 'border-red-500' : 'border-[#D4AF37]/30 focus:border-[#D4AF37]'
                }`}
              />
              {errors.imageUrl && <p className="text-[11px] text-red-400 mt-1">{errors.imageUrl}</p>}
            </div>

            {/* Image Attribution */}
            <div>
              <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
                Image Attribution & License <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.imageAttribution}
                onChange={(e) => handleChange('imageAttribution', e.target.value)}
                placeholder="e.g. Wikimedia Commons / CC BY-SA 4.0"
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none"
              />
            </div>
          </div>

          {/* Live Image Preview */}
          {formData.imageUrl && !errors.imageUrl && (
            <div className="h-40 w-full max-w-sm rounded-xl overflow-hidden border border-[#D4AF37]/40 bg-[#1E0609] relative">
              <img
                src={formData.imageUrl}
                alt="Monument preview"
                className="w-full h-full object-cover"
                onError={() => setErrors(prev => ({ ...prev, imageUrl: 'Unable to load image from this URL.' }))}
              />
              <span className="absolute bottom-1 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-[#E5C158]">
                Image Preview
              </span>
            </div>
          )}

          {/* 3D Model Asset Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-serif-royal text-[#E5C158]/80 mb-1">
                3D Model Asset Reference (.glb) <span className="text-[10px] text-[#E5C158]/50">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.modelUrl}
                onChange={(e) => handleChange('modelUrl', e.target.value)}
                placeholder="/models/custom_monument.glb or model URL"
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] focus:outline-none"
              />
              <p className="text-[10px] text-[#E5C158]/60 mt-0.5">
                Leave empty if 3D photogrammetry scan is still in sourcing.
              </p>
            </div>

            {/* Publication Status Toggle */}
            <div>
              <label className="block text-xs font-serif-royal font-semibold text-[#FFFDF5] mb-1">
                Publication Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg px-3.5 py-2 text-xs text-[#FFFDF5] font-serif-royal focus:outline-none"
              >
                <option value="published" className="bg-[#2D0A0E]">
                  Published (Visible in directory & search)
                </option>
                <option value="draft" className="bg-[#2D0A0E]">
                  Draft (Archival record under curation)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-[#D4AF37]/25 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-xl bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs tracking-wider border border-[#D4AF37]/50 shadow-lg flex items-center gap-2 transition-all cursor-pointer ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[#FFFDF5]" />
            <span>{isSubmitting ? 'Validating & Submitting...' : 'Submit Monument to VIRASAT'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
