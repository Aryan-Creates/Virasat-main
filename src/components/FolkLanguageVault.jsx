import React, { useState } from 'react';
import { Music, Volume2, Play, Pause } from 'lucide-react';
import { FOLK_TRADITIONS, ENDANGERED_LANGUAGES } from '../data/mockData';

export default function FolkLanguageVault() {
  const [activeTabSection, setActiveTabSection] = useState('folk'); // 'folk' | 'endangered'
  const [activeFolk, setActiveFolk] = useState(FOLK_TRADITIONS[0]);
  const [activeLang, setActiveLang] = useState(ENDANGERED_LANGUAGES[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xl font-bold font-serif-royal text-gold-gradient">VIRASAT — Folk Traditions & Oral Voice Vault</h1>
          </div>
          <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">Audio archives of sacred folk songs and endangered Indian oral languages</p>
        </div>

        {/* Section Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30">
          <button
            onClick={() => {
              setActiveTabSection('folk');
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded text-xs font-serif-royal font-semibold transition-all cursor-pointer ${
              activeTabSection === 'folk'
                ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] shadow border border-[#D4AF37]/40'
                : 'text-[#E5C158]/80 hover:text-[#FFFDF5]'
            }`}
          >
            Folk Music ({FOLK_TRADITIONS.length})
          </button>

          <button
            onClick={() => {
              setActiveTabSection('endangered');
              setIsPlaying(false);
            }}
            className={`px-3 py-1.5 rounded text-xs font-serif-royal font-semibold transition-all cursor-pointer ${
              activeTabSection === 'endangered'
                ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] shadow border border-[#D4AF37]/40'
                : 'text-[#E5C158]/80 hover:text-[#FFFDF5]'
            }`}
          >
            Endangered Languages ({ENDANGERED_LANGUAGES.length})
          </button>
        </div>
      </div>

      {activeTabSection === 'folk' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Tracks Selection List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="heritage-card p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
                <h2 className="text-sm font-bold font-serif-royal text-[#FFFDF5]">Recorded Audio Tracks</h2>
                <span className="text-xs text-[#E5C158]/70">4 Audio Recordings</span>
              </div>

              <div className="space-y-2">
                {FOLK_TRADITIONS.map((folk) => {
                  const isSelected = activeFolk.id === folk.id;
                  return (
                    <div
                      key={folk.id}
                      onClick={() => {
                        setActiveFolk(folk);
                        setIsPlaying(false);
                      }}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                        isSelected
                          ? 'bg-[#1E0609] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                          : 'bg-[#2D0A0E]/60 border-[#D4AF37]/25 hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold font-serif-royal text-[#FFFDF5]">{folk.title}</h4>
                        <span className="text-[10px] bg-[#4A0E17] text-[#D4AF37] px-2 py-0.5 rounded font-mono border border-[#D4AF37]/30">
                          {folk.audioLength}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#E5C158]/80 font-serif-playfair italic">{folk.region} • {folk.language}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Audio Player & Synced Lyrics */}
          <div className="lg:col-span-7 space-y-4">
            <div className="heritage-card p-5 space-y-5">
              <div className="border-b border-[#D4AF37]/25 pb-3">
                <span className="text-xs font-semibold text-[#D4AF37] font-serif-royal uppercase">{activeFolk.status}</span>
                <h3 className="text-xl font-bold font-serif-royal text-gold-gradient">{activeFolk.title}</h3>
                <p className="text-xs text-[#E5C158]/80 font-serif-playfair italic">Artist: {activeFolk.artist} • Instruments: {activeFolk.instrument}</p>
              </div>

              {/* Audio Player */}
              <div className="p-4 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30 space-y-3">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 flex items-center justify-center text-[#FFFDF5] cursor-pointer transition-all shadow-lg border border-[#D4AF37]"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 text-[#FFFDF5]" /> : <Play className="w-5 h-5 ml-0.5 text-[#FFFDF5]" />}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs text-[#D4AF37] font-mono">
                      <span>01:14</span>
                      <span>{activeFolk.audioLength}</span>
                    </div>

                    <div className="w-full bg-[#2D0A0E] rounded-full h-2 overflow-hidden border border-[#D4AF37]/30">
                      <div
                        className={`h-full bg-[#D97706] rounded-full transition-all ${isPlaying ? 'w-1/2' : 'w-1/4'}`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lyrics & Translation */}
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                  <span className="text-[11px] font-semibold text-[#D4AF37] block font-serif-royal">Original Vocal Lyrics:</span>
                  <p className="text-[#FFFDF5] italic font-serif-playfair">"{activeFolk.lyricsOriginal}"</p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                  <span className="text-[11px] font-semibold text-[#F59E0B] block font-serif-royal">English Translation:</span>
                  <p className="text-[#FFFDF5] leading-relaxed">"{activeFolk.lyricsTranslated}"</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      ) : (
        /* Endangered Languages Section */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            <div className="heritage-card p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
                <h2 className="text-sm font-bold font-serif-royal text-[#FFFDF5]">Endangered Languages List</h2>
                <span className="text-xs text-[#F59E0B] font-semibold font-serif-royal">UNESCO Status</span>
              </div>

              <div className="space-y-2">
                {ENDANGERED_LANGUAGES.map((lang) => {
                  const isSelected = activeLang.id === lang.id;
                  return (
                    <div
                      key={lang.id}
                      onClick={() => setActiveLang(lang)}
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer space-y-1 ${
                        isSelected
                          ? 'bg-[#1E0609] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                          : 'bg-[#2D0A0E]/60 border-[#D4AF37]/25 hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold font-serif-royal text-[#FFFDF5]">{lang.name}</h4>
                        <span className="text-[10px] bg-[#4A0E17] text-red-300 border border-red-800 px-2 py-0.5 rounded font-semibold">
                          {lang.speakersCount} Speakers
                        </span>
                      </div>
                      <p className="text-[11px] text-[#E5C158]/80 font-serif-playfair italic">{lang.region}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="heritage-card p-5 space-y-4">
              <div className="border-b border-[#D4AF37]/25 pb-3">
                <span className="text-xs font-semibold text-[#D4AF37] font-serif-royal uppercase">{activeLang.status}</span>
                <h3 className="text-xl font-bold font-serif-royal text-gold-gradient">{activeLang.name}</h3>
                <p className="text-xs text-[#E5C158]/80 font-serif-playfair italic">Region: {activeLang.region}</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block">Writing System:</span>
                  <p className="text-[#FFFDF5] font-medium">{activeLang.scriptStatus}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                  <span className="text-[#F59E0B] font-serif-royal font-semibold block">Phonetic Feature:</span>
                  <p className="text-[#FFFDF5] font-serif-playfair italic">{activeLang.phonemeSample}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 space-y-1">
                  <span className="text-[#D4AF37] font-serif-royal font-semibold block">Sample Phrase:</span>
                  <p className="text-[#FFFDF5] font-mono">"{activeLang.phrase}"</p>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow border border-[#D4AF37]/40">
                <Volume2 className="w-4 h-4 text-[#FFFDF5]" />
                <span>Play Sample Sound Audio</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
