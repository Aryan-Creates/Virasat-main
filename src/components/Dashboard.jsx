import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Camera, 
  MapPin, 
  Box, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  X,
  ExternalLink,
  Layers,
  Calendar,
  Languages
} from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function Dashboard({ 
  sitesList, 
  onSelectSite, 
  setActiveTab,
  catalogueRef 
}) {
  const allSites = sitesList || HERITAGE_SITES;

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [show3DOnly, setShow3DOnly] = useState(false);
  const [activeSiteModal, setActiveSiteModal] = useState(null);
  const [photoSearchActive, setPhotoSearchActive] = useState(false);

  // Categories matching Indian Heritage
  const categories = [
    { id: 'ALL', label: 'All Monuments', icon: null },
    { id: 'Forts & Palaces', label: '🏰 Forts & Palaces' },
    { id: 'Temples & Sacred', label: '🛕 Temples & Sacred' },
    { id: 'Tombs & Mausoleums', label: '🏛️ Tombs & Mausoleums' },
    { id: 'Ancient Caves', label: '⛰️ Ancient Caves' },
    { id: 'Archaeological Sites', label: '🏺 Archaeological Sites' },
    { id: 'Stupas & Buddhist', label: '☸️ Stupas & Buddhist' },
    { id: 'Stepwell', label: '💧 Stepwells & Water' }
  ];

  // Quick search keywords
  const popularSearches = ['Taj Mahal', 'Qutub Minar', 'Red Fort', 'Konark', 'Hawa Mahal', 'UNESCO'];

  // All unique states
  const uniqueStates = useMemo(() => {
    const states = new Set(allSites.map(s => s.state).filter(Boolean));
    return ['ALL', ...Array.from(states).sort()];
  }, [allSites]);

  // Filter logic
  const filteredSites = useMemo(() => {
    return allSites.filter(site => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        site.name.toLowerCase().includes(q) ||
        (site.hindiName && site.hindiName.includes(q)) ||
        (site.state && site.state.toLowerCase().includes(q)) ||
        (site.city && site.city.toLowerCase().includes(q)) ||
        (site.dynasty && site.dynasty.toLowerCase().includes(q)) ||
        (site.category && site.category.toLowerCase().includes(q)) ||
        (site.architecturalStyle && site.architecturalStyle.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === 'ALL' || 
        (site.category && site.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
        (selectedCategory === 'Temples & Sacred' && (site.category?.includes('Temple') || site.architecturalStyle?.includes('Temple'))) ||
        (selectedCategory === 'Tombs & Mausoleums' && (site.category?.includes('Mausoleum') || site.category?.includes('Tomb') || site.name.includes('Tomb'))) ||
        (selectedCategory === 'Forts & Palaces' && (site.category?.includes('Fort') || site.category?.includes('Palace')));

      const matchesState = selectedState === 'ALL' || site.state === selectedState;

      const has3D = Boolean(site.digitalTwinAvailable || site.modelUrl);
      const matches3D = !show3DOnly || has3D;

      return matchesSearch && matchesCategory && matchesState && matches3D;
    });
  }, [allSites, searchQuery, selectedCategory, selectedState, show3DOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedState('ALL');
    setShow3DOnly(false);
  };

  const handleLaunch3D = (site) => {
    setActiveSiteModal(null);
    if (onSelectSite) {
      onSelectSite(site);
    }
  };

  return (
    <div className="space-y-0">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION (Solid Royal Maroon matching screenshot) */}
      {/* ======================================================== */}
      <section className="bg-[#4A0E17] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#6B1724]">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0A11]/80 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase shadow-sm">
            <span>🏛️ INTERACTIVE INDIAN HERITAGE DASHBOARD</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-royal tracking-wider text-white">
            DISCOVER INDIA'S HERITAGE
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#FDE6D2] max-w-2xl mx-auto leading-relaxed font-normal">
            Explore ancient civilizations, magnificent monuments, legendary rulers, and the stories that shaped India.
          </p>

          {/* Search Bar (Clean White Pill) */}
          <div className="pt-2 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-full shadow-2xl px-4 py-2 border border-white/20">
              <Search className="w-5 h-5 text-gray-400 ml-1 flex-shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search monuments, historical figures, or places..."
                className="w-full bg-transparent px-3 py-1.5 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setPhotoSearchActive(!photoSearchActive)}
                className="p-1.5 text-gray-500 hover:text-[#4A0E17] hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                title="Search by Photo"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Photo Search Simulated Modal Dropdown */}
          {photoSearchActive && (
            <div className="max-w-md mx-auto bg-white text-gray-800 p-4 rounded-xl shadow-2xl border border-gray-200 text-left space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#4A0E17] uppercase tracking-wider">AI Architectural Landmark Recognition</span>
                <button onClick={() => setPhotoSearchActive(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-600">
                Upload or drop a photo of any Indian monument to identify its history and load its verified 3D twin:
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#4A0E17] transition-colors cursor-pointer bg-gray-50">
                <Camera className="w-8 h-8 mx-auto text-gray-400 mb-1" />
                <span className="text-xs font-medium text-gray-700">Click to upload monument photo</span>
              </div>
            </div>
          )}

          {/* Quick Search Tag Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-[#E8D3D6]">
            <span className="text-[#D4AF37] font-medium">Try searching:</span>
            {popularSearches.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-0.5 rounded-full bg-[#3D0A11]/60 hover:bg-[#5C141F] text-white border border-[#D4AF37]/30 transition-colors cursor-pointer text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Search by Photo Pill Button */}
          <div className="pt-1">
            <button
              onClick={() => setPhotoSearchActive(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3D0A11]/80 hover:bg-[#5C141F] border border-[#D4AF37]/40 text-xs text-[#FDE6D2] cursor-pointer transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Search by Photo</span>
            </button>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. CATALOGUE SECTION (Clean Ivory Background from Ref)   */}
      {/* ======================================================== */}
      <section ref={catalogueRef} className="bg-[#FAF7F2] py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Category Filter Pills (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#4A0E17] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-[#E8E1D5] hover:border-[#4A0E17] hover:text-[#4A0E17]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Region / State Sub-Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[#E8E1D5]">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 tracking-wider uppercase">
              <span>FILTER BY REGION / STATE:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-white border border-[#E8E1D5] rounded-lg px-3 py-1.5 text-xs text-gray-800 font-medium focus:outline-none focus:border-[#4A0E17] cursor-pointer"
              >
                <option value="ALL">All States & Territories</option>
                {uniqueStates.filter(s => s !== 'ALL').map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E8E1D5] hover:bg-gray-50 text-xs text-gray-600 font-medium cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3 text-gray-500" />
              <span>Reset Filters</span>
            </button>
          </div>

          {/* Section Header with 3D Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif-royal text-[#4A0E17] tracking-wider uppercase">
                MONUMENTS CATALOGUE
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Showing {filteredSites.length} of {allSites.length} monuments
              </p>
            </div>

            {/* "Show 3D Models Only" Pill Toggle */}
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#D4AF37]/60 shadow-sm cursor-pointer hover:border-[#D4AF37] transition-colors">
              <input
                type="checkbox"
                checked={show3DOnly}
                onChange={(e) => setShow3DOnly(e.target.checked)}
                className="rounded text-[#4A0E17] focus:ring-[#4A0E17] w-3.5 h-3.5 accent-[#4A0E17] cursor-pointer"
              />
              <span className="text-xs font-semibold text-[#4A0E17]">Show 3D Models Only</span>
            </label>
          </div>

          {/* Monuments Card Grid */}
          {filteredSites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {filteredSites.map((site) => {
                const has3D = Boolean(site.digitalTwinAvailable || site.modelUrl);

                return (
                  <div
                    key={site.id}
                    className="heritage-card-clean overflow-hidden flex flex-col group cursor-pointer"
                    onClick={() => setActiveSiteModal(site)}
                  >
                    {/* Monument Card Image with Authenticated Badges */}
                    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                      <img
                        src={site.imageUrl}
                        alt={site.imageAlt || site.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      
                      {/* Region Badge on Top Left */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span>{site.state}</span>
                      </div>

                      {/* 3D Model Status Badge on Top Right */}
                      <div className="absolute top-3 right-3">
                        {has3D ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold tracking-wider uppercase shadow-md backdrop-blur-sm">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>3D MODEL AVAILABLE</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-700/90 text-white text-[10px] font-bold tracking-wider uppercase shadow-md backdrop-blur-sm">
                            <Clock className="w-3 h-3" />
                            <span>3D IN PROGRESS</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Monument Card Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="font-serif-royal font-bold text-lg text-[#3D0A11] group-hover:text-[#4A0E17] transition-colors leading-tight">
                            {site.name}
                          </h3>
                        </div>
                        
                        {site.hindiName && (
                          <p className="text-xs text-gray-500 font-medium">
                            {site.hindiName} • <span className="text-[#8C6228]">{site.builtEra || site.dynasty}</span>
                          </p>
                        )}

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed pt-1">
                          {site.description}
                        </p>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-2">
                        {has3D ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLaunch3D(site);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#4A0E17] hover:bg-[#5C141F] text-white text-xs font-semibold font-serif-royal tracking-wide transition-colors cursor-pointer shadow-sm"
                          >
                            <Box className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Explore in 3D</span>
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveSiteModal(site);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <span>Archival Details</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSiteModal(site);
                          }}
                          className="px-3 py-2 rounded-lg border border-[#E8E1D5] hover:bg-gray-50 text-gray-700 text-xs font-medium transition-colors cursor-pointer"
                          title="View Full Monument Information"
                        >
                          Details
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E8E1D5] p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E8E1D5] flex items-center justify-center mx-auto text-[#4A0E17]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif-royal text-lg font-bold text-[#4A0E17]">
                No monuments found matching your filters
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Try clearing your search query or selecting "All States & Territories" to see India's cultural treasures.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-full bg-[#4A0E17] text-white text-xs font-semibold cursor-pointer hover:bg-[#5C141F]"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. MODAL FOR FULL MONUMENT ARCHITECTURAL DOSSIER         */}
      {/* ======================================================== */}
      {activeSiteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E1D5] space-y-4">
            
            {/* Modal Header Image */}
            <div className="relative h-64 w-full bg-gray-100">
              <img
                src={activeSiteModal.imageUrl}
                alt={activeSiteModal.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveSiteModal(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-serif-royal font-bold text-white drop-shadow-md">
                    {activeSiteModal.name}
                  </h3>
                  <p className="text-xs text-[#FDE6D2] drop-shadow-md">
                    {activeSiteModal.hindiName} • {activeSiteModal.city}, {activeSiteModal.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 space-y-5">
              
              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#FAF7F2] rounded-xl border border-[#E8E1D5] text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Built Era</span>
                  <strong className="text-gray-800">{activeSiteModal.builtEra || 'Historical'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Dynasty</span>
                  <strong className="text-gray-800">{activeSiteModal.dynasty || 'Dynasty'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Category</span>
                  <strong className="text-gray-800">{activeSiteModal.category || 'Heritage Site'}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">3D Status</span>
                  <strong className={activeSiteModal.digitalTwinAvailable || activeSiteModal.modelUrl ? "text-emerald-700" : "text-amber-700"}>
                    {activeSiteModal.digitalTwinAvailable || activeSiteModal.modelUrl ? "3D Available" : "In Sourcing"}
                  </strong>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="font-serif-royal font-bold text-xs uppercase tracking-wider text-[#4A0E17]">
                  Historical Background
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {activeSiteModal.historicalBackground || activeSiteModal.description}
                </p>
              </div>

              {/* Architectural Highlights */}
              {activeSiteModal.architecturalFeatures && (
                <div className="space-y-2">
                  <h4 className="font-serif-royal font-bold text-xs uppercase tracking-wider text-[#4A0E17]">
                    Architectural Elements
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {activeSiteModal.architecturalFeatures.map((feat, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-2 bg-[#FAF7F2] p-2 rounded-lg border border-[#E8E1D5]">
                        <span className="text-[#4A0E17] font-bold">✦</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  onClick={() => setActiveSiteModal(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Close
                </button>
                {Boolean(activeSiteModal.digitalTwinAvailable || activeSiteModal.modelUrl) && (
                  <button
                    onClick={() => handleLaunch3D(activeSiteModal)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4A0E17] hover:bg-[#5C141F] text-white text-xs font-semibold cursor-pointer shadow-md"
                  >
                    <Box className="w-4 h-4 text-[#D4AF37]" />
                    <span>Launch 3D Digital Twin</span>
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
