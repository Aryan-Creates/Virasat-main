/**
 * VIRASAT - Dashboard / Home Overview Component
 * Summarizes the Indian heritage platform metrics and highlights featured monuments.
 */

import React from 'react';
import { Landmark, ArrowRight, PlusCircle, BookOpen, MapPin, Box, ShieldCheck, Sparkles } from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function Dashboard({ setActiveTab, sitesList, onSelectSite }) {
  const allSites = sitesList || HERITAGE_SITES;
  const uniqueStatesCount = new Set(allSites.map(s => s.state)).size;
  const digitalTwinsCount = allSites.filter(s => s.digitalTwinAvailable || s.modelUrl).length;

  const handleCardClick = (site) => {
    if (onSelectSite) {
      onSelectSite(site);
    } else {
      setActiveTab(site.digitalTwinAvailable || site.modelUrl ? '3dtwins' : 'monuments');
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#3D0F14] via-[#2D0A0E] to-[#1E0609] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A0E17] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider font-serif-royal">
              <span>𑀯𑀺𑀭𑀸𑀲𑀢𑁆 • Digital Heritage & 3D Tourism</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif-royal text-gold-gradient tracking-wide">
              Welcome to Virasat
            </h1>

            <p className="text-[#E5C158]/90 text-sm leading-relaxed font-serif-playfair">
              An interactive Indian Cultural Heritage platform designed to reduce dependence on traditional tourist guides.
              Explore monumental landmarks through interactive 3D digital twins, architectural hotspots, and historical narratives.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('3dtwins')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs tracking-wider transition-all cursor-pointer shadow-lg border border-[#D4AF37]/40"
              >
                <Box className="w-4 h-4 text-[#FFFDF5]" />
                <span>Launch 3D Explorer</span>
              </button>

              <button
                onClick={() => setActiveTab('monuments')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4A0E17] hover:bg-[#58141C] text-[#D4AF37] text-xs font-serif-royal font-semibold transition-colors border border-[#D4AF37]/30"
              >
                <Landmark className="w-4 h-4 text-[#D4AF37]" />
                <span>Directory</span>
              </button>

              <button
                onClick={() => setActiveTab('add')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2D0A0E] hover:bg-[#3D0F14] text-[#E5C158] text-xs font-serif-royal font-semibold transition-colors border border-[#D4AF37]/25"
              >
                <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Submit Monument</span>
              </button>
            </div>
          </div>

          {/* Platform Quick Stats */}
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto min-w-[280px]">
            <div className="bg-[#1E0609] p-4 rounded-xl border border-[#D4AF37]/30 shadow-inner">
              <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs font-semibold mb-1 font-serif-royal">
                <Landmark className="w-4 h-4 text-[#D4AF37]" />
                <span>DIRECTORY</span>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF5]">{allSites.length} Sites</div>
              <div className="text-[11px] text-[#E5C158]/70">Deduplicated Records</div>
            </div>

            <div className="bg-[#1E0609] p-4 rounded-xl border border-[#D4AF37]/30 shadow-inner">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1 font-serif-royal">
                <Box className="w-4 h-4 text-emerald-400" />
                <span>3D TWINS</span>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF5]">{digitalTwinsCount} Models</div>
              <div className="text-[11px] text-[#E5C158]/70">Verified 3D GLBs</div>
            </div>

            <div className="bg-[#1E0609] p-4 rounded-xl border border-[#D4AF37]/30 shadow-inner">
              <div className="flex items-center gap-1.5 text-[#F59E0B] text-xs font-semibold mb-1 font-serif-royal">
                <MapPin className="w-4 h-4 text-[#F59E0B]" />
                <span>COVERAGE</span>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF5]">{uniqueStatesCount} Regions</div>
              <div className="text-[11px] text-[#E5C158]/70">States & Territories</div>
            </div>

            <div className="bg-[#1E0609] p-4 rounded-xl border border-[#D4AF37]/30 shadow-inner">
              <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-semibold mb-1 font-serif-royal">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>SOURCES</span>
              </div>
              <div className="text-2xl font-bold text-[#FFFDF5]">100%</div>
              <div className="text-[11px] text-[#E5C158]/70">ASI & UNESCO Sourced</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div
          onClick={() => setActiveTab('3dtwins')}
          className="heritage-card p-5 heritage-card-hover cursor-pointer space-y-3 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#4A0E17] text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
              3D Digital Twins
            </h3>
            <p className="text-xs text-[#E5C158]/80 leading-relaxed font-serif-playfair italic mt-1">
              Explore 6 verified 3D GLB monuments including Taj Mahal, Qutub Minar, Konark Sun Temple, and Red Fort with orbit controls.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1 text-xs text-[#D4AF37] font-serif-royal font-semibold">
            <span>Launch 3D Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('monuments')}
          className="heritage-card p-5 heritage-card-hover cursor-pointer space-y-3 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-3">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
              Monuments Directory
            </h3>
            <p className="text-xs text-[#E5C158]/80 leading-relaxed font-serif-playfair italic mt-1">
              Browse the catalog of Indian heritage sites with state filtering, architectural features, and publication status badges.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1 text-xs text-[#D4AF37] font-serif-royal font-semibold">
            <span>View Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => setActiveTab('add')}
          className="heritage-card p-5 heritage-card-hover cursor-pointer space-y-3 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mb-3">
              <PlusCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
              Validated Submission
            </h3>
            <p className="text-xs text-[#E5C158]/80 leading-relaxed font-serif-playfair italic mt-1">
              Submit new regional monument entries with Zod schema validation, multi-select tags, and duplicate prevention.
            </p>
          </div>
          <div className="pt-2 flex items-center gap-1 text-xs text-[#D4AF37] font-serif-royal font-semibold">
            <span>Submit Entry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Featured Monuments Directory Preview */}
      <div className="heritage-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-3">
          <div>
            <h2 className="text-lg font-bold font-serif-royal text-gold-gradient">High-Priority Heritage Monuments</h2>
            <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
              Click any monument to launch its 3D digital twin or view architectural records
            </p>
          </div>
          <button
            onClick={() => setActiveTab('monuments')}
            className="text-xs text-[#D97706] hover:text-[#F59E0B] font-semibold flex items-center gap-1 font-serif-royal cursor-pointer"
          >
            <span>View All ({allSites.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allSites.slice(0, 6).map((site) => {
            const has3D = site.digitalTwinAvailable || site.modelUrl;
            return (
              <div
                key={site.id}
                onClick={() => handleCardClick(site)}
                className="bg-[#1E0609] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-xl overflow-hidden cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 w-full overflow-hidden relative bg-[#2D0A0E]">
                    <img
                      src={site.imageUrl}
                      alt={site.imageAlt || site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                      {has3D ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 font-serif-royal font-semibold flex items-center gap-1 shadow">
                          <Box className="w-3 h-3 text-emerald-400" />
                          <span>3D Model Ready</span>
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950/90 text-amber-300 border border-amber-500/50 font-serif-royal font-semibold">
                          3D Sourcing
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h3 className="text-sm font-bold font-serif-royal text-[#FFFDF5] group-hover:text-[#D4AF37] transition-colors">
                      {site.name}
                    </h3>
                    <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
                      {site.state} • {site.dynasty || site.category || 'Heritage Landmark'}
                    </p>
                    <p className="text-[11px] text-[#FFFDF5]/75 line-clamp-2 mt-1">
                      {site.description}
                    </p>
                  </div>
                </div>

                <div className="px-3.5 pb-3 pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs font-serif-royal">
                  <span className="text-[11px] text-[#F59E0B]">
                    {site.builtEra || site.era || 'Historical Era'}
                  </span>
                  <span className="text-[#D4AF37] group-hover:translate-x-0.5 transition-transform font-semibold flex items-center gap-1">
                    {has3D ? 'Explore 3D' : 'View Info'} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
