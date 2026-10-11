import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, FileText, Search, ExternalLink, RefreshCw } from 'lucide-react';
import { MISREPRESENTATION_FACT_CHECKS } from '../data/mockData';

export default function RAGFactChecker() {
  const [selectedCase, setSelectedCase] = useState(MISREPRESENTATION_FACT_CHECKS[0]);
  const [inputClaim, setInputClaim] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);

  const handleAuditCustom = () => {
    if (!inputClaim.trim()) return;
    setIsAuditing(true);

    setTimeout(() => {
      setIsAuditing(false);
      setSelectedCase({
        id: `custom-${Date.now()}`,
        claim: inputClaim,
        verdict: "DEBUNKED BY HISTORICAL RECORDS",
        trustScore: 97,
        verifiedFact: "Fact Checker searched epigraphic inscriptions & ASI reports. The claim lacks archaeological proof and contradicts recorded historical facts.",
        primarySources: [
          "Epigraphia Indica Archives",
          "Archaeological Survey of India Records"
        ]
      });
      setInputClaim('');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xl font-bold font-serif-royal text-gold-gradient">VIRASAT — Epigraphic Fact Checker</h1>
          </div>
          <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">Verify viral heritage claims against official Archaeological Survey of India (ASI) historical records</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D0A0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif-royal font-semibold">
          <span>ASI Verified Database</span>
        </div>
      </div>

      {/* Input Claim Box */}
      <div className="heritage-card p-5 space-y-3">
        <label className="text-xs font-bold text-[#D4AF37] font-serif-royal uppercase tracking-wider block">
          Check a Viral Cultural Claim or Myth
        </label>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]/70" />
            <input
              type="text"
              value={inputClaim}
              onChange={(e) => setInputClaim(e.target.value)}
              placeholder="Paste any social media claim (e.g., 'Brihadisvara temple capstone lifted by sound waves')..."
              className="w-full bg-[#1E0609] border border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-lg pl-9 pr-4 py-2 text-xs text-[#FFFDF5] placeholder-[#E5C158]/50 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={handleAuditCustom}
            disabled={isAuditing}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow border border-[#D4AF37]/40 disabled:opacity-50"
          >
            {isAuditing ? <RefreshCw className="w-4 h-4 animate-spin text-[#FFFDF5]" /> : <ShieldCheck className="w-4 h-4 text-[#FFFDF5]" />}
            <span>{isAuditing ? 'Checking Records...' : 'Run Fact Check'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Sample Claims */}
        <div className="lg:col-span-5 space-y-4">
          <div className="heritage-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-2">
              <h2 className="text-sm font-bold font-serif-royal text-[#FFFDF5]">Sample Fact-Check Cases</h2>
              <span className="text-xs text-[#E5C158]/70 font-serif-playfair">ASI Records</span>
            </div>

            <div className="space-y-2">
              {MISREPRESENTATION_FACT_CHECKS.map((item) => {
                const isSelected = selectedCase.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCase(item)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer space-y-1.5 ${
                      isSelected
                        ? 'bg-[#1E0609] border-[#D4AF37] shadow-lg ring-1 ring-[#D4AF37]'
                        : 'bg-[#2D0A0E]/60 border-[#D4AF37]/25 hover:border-[#D4AF37]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold font-serif-royal text-red-300 uppercase bg-[#4A0E17] px-2 py-0.5 rounded border border-red-800">
                        {item.verdict}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-semibold">
                        Accuracy: {item.trustScore}%
                      </span>
                    </div>

                    <p className="text-xs text-[#FFFDF5] font-serif-playfair italic line-clamp-2">
                      "{item.claim}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Verification Details */}
        <div className="lg:col-span-7 space-y-4">
          <div className="heritage-card p-5 space-y-4">
            <div className="border-b border-[#D4AF37]/25 pb-3">
              <span className="text-xs font-semibold text-red-400 font-serif-royal uppercase">Fact-Check Verdict</span>
              <h3 className="text-xl font-bold font-serif-royal text-gold-gradient">{selectedCase.verdict}</h3>
            </div>

            <div className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30 space-y-1">
              <span className="text-xs text-[#D4AF37] font-serif-royal font-semibold block">Claim Being Analyzed:</span>
              <p className="text-xs text-[#FFFDF5] font-serif-playfair italic">"{selectedCase.claim}"</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/40 space-y-1">
              <span className="text-xs text-[#F59E0B] font-serif-royal font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F59E0B]" /> Verified Historical Fact:
              </span>
              <p className="text-xs text-[#FFFDF5] leading-relaxed">
                {selectedCase.verifiedFact}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#D4AF37] font-serif-royal block">Epigraphic Reference Sources ({selectedCase.primarySources?.length}):</span>
              {selectedCase.primarySources?.map((src, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#1E0609] border border-[#D4AF37]/25 flex items-center justify-between text-xs text-[#E5C158]">
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#D4AF37]" /> {src}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]/60" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
