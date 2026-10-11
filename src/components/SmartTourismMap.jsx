import React, { useState } from 'react';
import { MapPin, Users, Navigation, AlertTriangle, ShieldCheck, Clock } from 'lucide-react';
import { HERITAGE_SITES } from '../data/mockData';

export default function SmartTourismMap({ onSelectSite }) {
  const [selectedSite, setSelectedSite] = useState(HERITAGE_SITES[5]); // Taj Mahal default

  const alternatives = [
    {
      name: "Mehtab Bagh & Yamuna View Garden",
      distance: "1.8 km across Yamuna river",
      crowdLevel: "LOW (24%)",
      benefit: "Breathtaking view of Taj Mahal with zero long queue delays",
      savedMinutes: 110
    },
    {
      name: "Itimad-ud-Daulah (Baby Taj)",
      distance: "4.2 km North",
      crowdLevel: "MODERATE (42%)",
      benefit: "Exquisite marble inlay artwork with peaceful atmosphere",
      savedMinutes: 90
    }
  ];

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xl font-bold font-serif-royal text-gold-gradient">VIRASAT — Smart Crowd Helper & Tourist Routing</h1>
          </div>
          <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">Track real-time visitor crowd levels and discover quiet alternate nearby heritage monuments</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D0A0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif-royal font-semibold">
          <Users className="w-4 h-4 text-[#F59E0B]" />
          <span>Live Tourist Tracker</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Monument Crowd Levels */}
        <div className="lg:col-span-6 space-y-4">
          <div className="heritage-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
              <h2 className="text-sm font-bold font-serif-royal text-[#FFFDF5]">Monument Crowd Indicators</h2>
              <span className="text-xs text-[#E5C158]/70">6 Heritage Sites</span>
            </div>

            <div className="space-y-3">
              {HERITAGE_SITES.map((site) => {
                const isCritical = site.crowdLevel === 'CRITICAL';
                const isHigh = site.crowdLevel === 'HIGH';
                const isSelected = selectedSite.id === site.id;

                return (
                  <div
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#1E0609] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                        : 'bg-[#2D0A0E]/60 border-[#D4AF37]/25 hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold font-serif-royal text-[#FFFDF5]">{site.name}</span>
                        <span className="text-xs text-[#E5C158]/70 font-serif-playfair italic">({site.state})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-28 bg-[#1E0609] rounded-full h-2 overflow-hidden border border-[#D4AF37]/30">
                          <div
                            className={`h-full rounded-full ${
                              isCritical ? 'bg-[#800020]' : isHigh ? 'bg-[#D97706]' : 'bg-emerald-600'
                            }`}
                            style={{ width: `${site.crowdPercentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-xs font-semibold ${
                          isCritical ? 'text-red-400' : isHigh ? 'text-[#F59E0B]' : 'text-emerald-400'
                        }`}>
                          {site.crowdPercentage}% ({site.crowdLevel})
                        </span>
                      </div>
                    </div>

                    {isCritical && (
                      <span className="px-2 py-1 rounded bg-[#4A0E17] text-red-300 border border-red-800 text-[10px] font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Heavy Queue
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Alternate Place Recommendation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="heritage-card p-5 space-y-4">
            <div className="border-b border-[#D4AF37]/25 pb-3">
              <span className="text-xs font-semibold text-[#D4AF37] font-serif-royal uppercase">Crowd Advisory</span>
              <h3 className="text-lg font-bold font-serif-royal text-gold-gradient">{selectedSite.name}</h3>
            </div>

            {selectedSite.crowdLevel === 'CRITICAL' || selectedSite.crowdLevel === 'HIGH' ? (
              <div className="p-3.5 rounded-lg bg-[#4A0E17]/60 border border-[#D4AF37]/50 space-y-1">
                <div className="flex items-center gap-2 text-[#F59E0B] text-xs font-bold font-serif-royal">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Heavy Crowd Warning (~2 Hour Queue Wait)</span>
                </div>
                <p className="text-xs text-[#FFFDF5] leading-relaxed">
                  {selectedSite.name} currently has very high visitor density. Virasat suggests visiting nearby alternate spots first.
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-700/60 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-serif-royal">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Low Visitor Density (Wait under 15 minutes)</span>
                </div>
                <p className="text-xs text-[#FFFDF5]">Great time to visit! Ideal window for monument exploration.</p>
              </div>
            )}

            <div className="space-y-3">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block font-serif-royal">
                Recommended Alternate Spots Nearby
              </span>

              {alternatives.map((alt, i) => (
                <div key={i} className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold font-serif-royal text-[#FFFDF5]">{alt.name}</h4>
                    <span className="px-2 py-0.5 rounded bg-[#2D0A0E] text-emerald-400 text-[10px] font-semibold border border-emerald-800">
                      {alt.crowdLevel}
                    </span>
                  </div>

                  <p className="text-xs text-[#E5C158]/80 font-serif-playfair italic">{alt.benefit}</p>

                  <div className="flex items-center justify-between text-[11px] text-[#E5C158]/70 pt-1 border-t border-[#D4AF37]/15">
                    <span className="flex items-center gap-1 text-[#D4AF37]">
                      <Navigation className="w-3 h-3 text-[#F59E0B]" /> {alt.distance}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                      <Clock className="w-3 h-3" /> Save {alt.savedMinutes} mins
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow border border-[#D4AF37]/40">
              <Navigation className="w-4 h-4 text-[#FFFDF5]" />
              <span>Get Optimized Route Directions</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
