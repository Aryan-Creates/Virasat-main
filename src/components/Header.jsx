import React, { useState, useEffect, useRef } from 'react';
import { Search, Landmark, ArrowRight, Home, Box, X } from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenStartScreen, 
  onSelectSite, 
  sitesList 
}) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef(null);

  const allSites = sitesList || HERITAGE_SITES;

  // Filter monuments based on search query
  const filteredSites = query.trim()
    ? allSites.filter(s => 
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.state.toLowerCase().includes(query.toLowerCase()) ||
        (s.city && s.city.toLowerCase().includes(query.toLowerCase())) ||
        (s.dynasty && s.dynasty.toLowerCase().includes(query.toLowerCase())) ||
        (s.architecturalStyle && s.architecturalStyle.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  // Close search results on outside click (click / touch)
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Handle keyboard events (Escape to close, Enter to pick first result)
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      e.target.blur();
    } else if (e.key === 'Enter' && filteredSites.length > 0) {
      handleSelect(filteredSites[0]);
    }
  };

  const handleSelect = (site) => {
    setQuery('');
    setShowResults(false);

    if (onSelectSite) {
      onSelectSite(site);
    }

    // If site has a working 3D model, navigate to 3D Viewer; otherwise Monuments Directory
    if (site.digitalTwinAvailable || site.modelUrl) {
      setActiveTab('3dtwins');
    } else {
      setActiveTab('monuments');
    }
  };

  return (
    <header className="bg-[#2D0A0E]/95 backdrop-blur border-b border-[#D4AF37]/30 px-4 lg:px-8 py-3.5 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Name strictly 'VIRASAT' */}
        <div 
          onClick={onOpenStartScreen} 
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to Opening Screen"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#4A0E17] to-[#1E0609] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-md group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl tracking-wider text-gold-gradient font-serif-royal">
                VIRASAT
              </span>
              <span className="text-[10px] bg-[#4A0E17] text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/40 font-semibold uppercase tracking-wider">
                Digital Heritage
              </span>
            </div>
            <p className="text-[11px] text-[#E5C158]/75 hidden sm:block font-serif-playfair italic">
              Virtual Tourism & 3D Heritage Platform
            </p>
          </div>
        </div>

        {/* Search Bar Container with ref for outside-click detection */}
        <div ref={searchContainerRef} className="relative flex-1 max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-[#D4AF37]/70 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => {
                if (query.trim()) setShowResults(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search monuments, states, dynasties, styles..."
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg pl-9 pr-8 py-1.5 text-sm text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none transition-colors shadow-inner"
              aria-label="Search Indian Monuments"
              aria-expanded={showResults && filteredSites.length > 0}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setShowResults(false);
                }}
                className="absolute right-2.5 p-0.5 text-[#E5C158]/60 hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Panel */}
          {showResults && query.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#2D0A0E] rounded-xl overflow-hidden shadow-2xl z-50 border border-[#D4AF37]/50 max-h-80 overflow-y-auto">
              <div className="px-3.5 py-2 text-xs text-[#D4AF37] bg-[#1E0609] border-b border-[#D4AF37]/30 flex justify-between items-center font-serif-royal">
                <span>Search Results</span>
                <span className="text-[11px] text-[#E5C158]/70">
                  {filteredSites.length} {filteredSites.length === 1 ? 'match' : 'matches'}
                </span>
              </div>

              {filteredSites.length > 0 ? (
                filteredSites.map(site => (
                  <div
                    key={site.id}
                    onClick={() => handleSelect(site)}
                    className="px-3.5 py-2.5 hover:bg-[#4A0E17] cursor-pointer flex items-center justify-between border-b border-[#D4AF37]/15 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#1E0609] border border-[#D4AF37]/30 flex-shrink-0">
                        <img 
                          src={site.imageUrl} 
                          alt={site.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                          <span>{site.name}</span>
                          {(site.digitalTwinAvailable || site.modelUrl) && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[9px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                              <Box className="w-2.5 h-2.5" /> 3D
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
                          {site.state} • {site.dynasty || site.category || 'Heritage Site'}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-[#E5C158]/70 font-serif-playfair">
                  No monuments found matching "{query}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenStartScreen}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-semibold tracking-wider font-serif-royal transition-colors cursor-pointer"
            title="Go to Virasat Opening Screen"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Start Screen</span>
          </button>
        </div>

      </div>
    </header>
  );
}
