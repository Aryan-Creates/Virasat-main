/**
 * VIRASAT - Monuments Directory Component
 * Displays the complete catalog of Indian cultural heritage monuments
 * with state/category filtering, data integrity checks, and direct 3D exploration.
 */

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Info, 
  X, 
  Box, 
  Layers, 
  Languages, 
  Activity, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function MonumentsList({ sitesList, onSelectSite }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedFilterStatus, setSelectedFilterStatus] = useState('ALL');
  const [activeSiteModal, setActiveSiteModal] = useState(null);

  const allSites = sitesList || HERITAGE_SITES;

  // Unique state list
  const uniqueStates = ['ALL', ...new Set(allSites.map(site => site.state).filter(Boolean))].sort();

  // Filter monuments based on search, state, and status
  const filteredSites = allSites.filter(site => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = 
      site.name.toLowerCase().includes(q) ||
      (site.location && site.location.toLowerCase().includes(q)) ||
      (site.dynasty && site.dynasty.toLowerCase().includes(q)) ||
      (site.architecturalStyle && site.architecturalStyle.toLowerCase().includes(q));
    
    const matchesState = selectedState === 'ALL' || site.state === selectedState;
    
    const has3D = Boolean(site.digitalTwinAvailable || site.modelUrl);
    const matchesStatus = 
      selectedFilterStatus === 'ALL' ||
      (selectedFilterStatus === '3D_READY' && has3D) ||
      (selectedFilterStatus === 'SOURCING' && !has3D);

    return matchesSearch && matchesState && matchesStatus;
  });

  const handleLaunch3D = (site) => {
    setActiveSiteModal(null);
    if (onSelectSite) {
      onSelectSite(site);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="border-b border-[#D4AF37]/25 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-serif-royal text-gold-gradient">
            Indian Cultural Heritage Monuments Directory
          </h1>
          <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
            Complete database of verified heritage monuments with verified architectural records and 3D digital twins.
          </p>
        </div>

        <div className="text-xs text-[#E5C158]/80 font-serif-royal flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg bg-[#2D0A0E] border border-[#D4AF37]/30">
            Total: <strong>{allSites.length}</strong> Sites
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#1E0609] border border-emerald-500/40 text-emerald-400">
            3D Ready: <strong>{allSites.filter(s => s.digitalTwinAvailable || s.modelUrl).length}</strong> Models
          </span>
        </div>
      </div>

      {/* Filter and Search Bar Row */}
      <div className="heritage-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search monument name, dynasty, architectural style..."
            className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg pl-9 pr-4 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* State Filter Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs text-[#D4AF37] font-serif-royal font-semibold whitespace-nowrap">
            Region:
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-[#FFFDF5] focus:outline-none focus:border-[#D4AF37] font-serif-royal"
          >
            {uniqueStates.map((st, idx) => (
              <option key={idx} value={st} className="bg-[#2D0A0E] text-[#FFFDF5]">
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* 3D Availability Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs text-[#D4AF37] font-serif-royal font-semibold whitespace-nowrap">
            3D Model:
          </label>
          <select
            value={selectedFilterStatus}
            onChange={(e) => setSelectedFilterStatus(e.target.value)}
            className="bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-[#FFFDF5] focus:outline-none focus:border-[#D4AF37] font-serif-royal"
          >
            <option value="ALL" className="bg-[#2D0A0E]">All Monuments</option>
            <option value="3D_READY" className="bg-[#2D0A0E]">3D Digital Twin Ready</option>
            <option value="SOURCING" className="bg-[#2D0A0E]">3D Model Sourcing</option>
          </select>
        </div>
      </div>

      {/* Monuments Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.length > 0 ? (
          filteredSites.map((site) => {
            const has3D = Boolean(site.digitalTwinAvailable || site.modelUrl);
            return (
              <div
                key={site.id}
                className="heritage-card rounded-xl overflow-hidden flex flex-col justify-between heritage-card-hover group"
              >
                {/* Monument Image Container */}
                <div className="h-44 w-full overflow-hidden relative bg-[#1E0609]">
                  <img
                    src={site.imageUrl}
                    alt={site.imageAlt || site.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E0609] via-transparent to-transparent opacity-80" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-[#4A0E17]/90 text-[#D4AF37] text-[10px] font-serif-royal font-semibold border border-[#D4AF37]/30 shadow backdrop-blur-sm">
                      {site.state}
                    </span>

                    {has3D ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 text-[10px] font-serif-royal font-semibold border border-emerald-500/40 shadow flex items-center gap-1 backdrop-blur-sm">
                        <Box className="w-3 h-3 text-emerald-400" />
                        <span>3D Ready</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 text-[10px] font-serif-royal font-semibold border border-amber-500/40 shadow backdrop-blur-sm">
                        Model in Sourcing
                      </span>
                    )}
                  </div>
                </div>

                {/* Monument Details */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
                      {site.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#F59E0B] font-serif-playfair italic mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{site.location || site.state} • {site.dynasty || site.category || 'Historical Site'}</span>
                    </div>
                    <p className="text-xs text-[#E5C158]/80 line-clamp-3 mt-2 leading-relaxed">
                      {site.description}
                    </p>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between mt-2 gap-2">
                    <span className="text-[11px] text-[#D4AF37] font-serif-royal flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#F59E0B]" />
                      {site.builtEra || site.era || 'Historic Period'}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveSiteModal(site)}
                        className="px-2.5 py-1 rounded bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-serif-royal font-semibold transition-colors cursor-pointer flex items-center gap-1"
                        title="View Detailed Record"
                      >
                        <Info className="w-3 h-3" />
                        <span>Details</span>
                      </button>

                      {has3D && (
                        <button
                          onClick={() => handleLaunch3D(site)}
                          className="px-2.5 py-1 rounded bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] border border-[#D4AF37]/50 text-xs font-serif-royal font-bold transition-all cursor-pointer flex items-center gap-1 shadow"
                          title="Explore in 3D Viewer"
                        >
                          <Box className="w-3 h-3 text-[#FFFDF5]" />
                          <span>3D</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full heritage-card p-8 text-center text-[#E5C158]/70 font-serif-playfair">
            No monuments matched your search query. Try resetting your state or 3D filter.
          </div>
        )}
      </div>

      {/* Monument Full Information Modal */}
      {activeSiteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140305]/85 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#2D0A0E] rounded-2xl border border-[#D4AF37]/50 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
              <div>
                <span className="text-[10px] text-[#D4AF37] font-serif-royal font-semibold uppercase tracking-wider block">
                  Official Heritage Record • {activeSiteModal.id}
                </span>
                <h2 className="text-xl font-bold font-serif-royal text-gold-gradient">
                  {activeSiteModal.name}
                </h2>
                {activeSiteModal.hindiName && (
                  <p className="text-xs text-[#E5C158]/80 font-serif-playfair italic">
                    {activeSiteModal.hindiName}
                  </p>
                )}
              </div>
              <button
                onClick={() => setActiveSiteModal(null)}
                className="p-1.5 rounded-lg text-[#E5C158]/70 hover:text-white hover:bg-[#4A0E17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="h-60 w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 relative bg-[#1E0609]">
              <img
                src={activeSiteModal.imageUrl}
                alt={activeSiteModal.imageAlt || activeSiteModal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {activeSiteModal.imageAttribution && (
                <span className="absolute bottom-1 right-2 px-2 py-0.5 rounded bg-black/60 text-[9px] text-[#E5C158]/80 backdrop-blur-sm">
                  {activeSiteModal.imageAttribution}
                </span>
              )}
            </div>

            {/* Information Grid */}
            <div className="space-y-3 text-xs text-[#FFFDF5]">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <div className="p-2.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block text-[11px]">Region / State:</span>
                  <p className="mt-0.5">{activeSiteModal.state}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block text-[11px]">Dynasty / Reign:</span>
                  <p className="mt-0.5">{activeSiteModal.dynasty || 'Historical India'}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block text-[11px]">Era / Period:</span>
                  <p className="mt-0.5">{activeSiteModal.builtEra || activeSiteModal.era || 'Ancient Era'}</p>
                </div>
              </div>

              {/* Historical Background */}
              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                <span className="text-[#F59E0B] font-serif-royal font-semibold block text-xs">
                  Historical Significance & Overview:
                </span>
                <p className="leading-relaxed text-[#E5C158]/95 font-serif-playfair italic">
                  {activeSiteModal.historicalBackground || activeSiteModal.description}
                </p>
              </div>

              {/* Architectural Style & Features */}
              <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-2">
                <div className="flex items-center gap-1.5 text-[#D4AF37] font-serif-royal font-semibold">
                  <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Architectural Style: {activeSiteModal.architecturalStyle}</span>
                </div>

                {activeSiteModal.architecturalFeatures && activeSiteModal.architecturalFeatures.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {activeSiteModal.architecturalFeatures.map((feat, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-[#3D0F14] text-[#E5C158] border border-[#D4AF37]/30">
                        {feat}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Languages & Local Activities */}
              {(activeSiteModal.languages?.length > 0 || activeSiteModal.localActivities?.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSiteModal.languages?.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                      <div className="flex items-center gap-1 text-[#D4AF37] font-serif-royal font-semibold text-[11px]">
                        <Languages className="w-3 h-3" />
                        <span>Languages & Epigraphy</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activeSiteModal.languages.map((lang, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-[#2D0A0E] text-[#FFFDF5]">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSiteModal.localActivities?.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                      <div className="flex items-center gap-1 text-[#F59E0B] font-serif-royal font-semibold text-[11px]">
                        <Activity className="w-3 h-3" />
                        <span>Visitor Experiences & Trails</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {activeSiteModal.localActivities.slice(0, 3).map((act, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-[#2D0A0E] text-[#FFFDF5]">
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* References & Authority Sources */}
              {activeSiteModal.references && activeSiteModal.references.length > 0 && (
                <div className="p-2.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/20 space-y-1">
                  <span className="text-[10px] text-[#D4AF37] font-serif-royal font-semibold uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>Verified Historical Sources</span>
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-[#E5C158]/70 space-y-0.5">
                    {activeSiteModal.references.map((ref, idx) => (
                      <li key={idx}>{ref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-[#D4AF37]/20">
              <button
                onClick={() => setActiveSiteModal(null)}
                className="px-4 py-2 rounded-lg bg-[#1E0609] hover:bg-[#3D0F14] text-[#E5C158] font-serif-royal font-semibold text-xs border border-[#D4AF37]/30 cursor-pointer"
              >
                Close
              </button>

              {(activeSiteModal.digitalTwinAvailable || activeSiteModal.modelUrl) ? (
                <button
                  onClick={() => handleLaunch3D(activeSiteModal)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs border border-[#D4AF37]/50 flex items-center gap-2 shadow cursor-pointer"
                >
                  <Box className="w-4 h-4 text-[#FFFDF5]" />
                  <span>Launch 3D Digital Twin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <span className="text-[11px] text-amber-400/80 font-serif-playfair italic">
                  3D Photogrammetry scan currently in sourcing
                </span>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
