import React from 'react';
import { 
  Sparkles, 
  Landmark, 
  Box, 
  PlusCircle, 
  BookOpen, 
  ArrowRight 
} from 'lucide-react';

export default function OpeningScreen({ onEnter, onSelectFeature }) {
  const highlights = [
    {
      id: '3dtwins',
      title: '3D Monument Viewer',
      desc: 'Interactive 360° model viewer with WebXR / AR & preset camera views.',
      icon: Box,
      tag: 'WebXR 3D'
    },
    {
      id: 'monuments',
      title: 'Monuments Directory',
      desc: 'Browse famous Indian heritage sites with state filtering & detailed history.',
      icon: Landmark,
      tag: 'Core Directory'
    },
    {
      id: 'add',
      title: 'Crowdsource Form',
      desc: 'Submit regional monuments connected to Node.js Express backend API.',
      icon: PlusCircle,
      tag: 'Express API'
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A0507] text-[#FFFDF5] flex flex-col justify-between relative overflow-hidden bg-jaali-pattern">
      
      {/* Background Radial Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#800020]/20 via-[#D4AF37]/15 to-[#D97706]/20 rounded-full blur-3xl pointer-events-none" />
      
      {/* Header Badge */}
      <div className="pt-8 px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2D0A0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Department of Computer Science & Engineering Mini-Project</span>
        </div>
      </div>

      {/* Main Opening Hero Centerpiece */}
      <div className="max-w-4xl mx-auto px-6 py-10 text-center z-10 flex flex-col items-center">
        
        {/* Heritage Emblem Icon */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#4A0E17] to-[#1E0609] border-2 border-[#D4AF37] flex items-center justify-center shadow-2xl shadow-[#D4AF37]/20 relative z-10 group">
            <Landmark className="w-12 h-12 text-[#D4AF37] transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="absolute inset-0 -m-3 rounded-full border border-[#D4AF37]/30 animate-pulse pointer-events-none" />
        </div>

        {/* PROMINENT TITLE "VIRASAT" */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black font-serif-royal text-gold-gradient tracking-widest uppercase shadow-sm drop-shadow-lg">
          VIRASAT
        </h1>
        
        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 my-4 w-full max-w-md">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <span className="text-[#D4AF37] text-sm">◆  𑀯𑀺𑀭𑀸𑀲𑀢𑁆  ◆</span>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
        </div>

        {/* Tagline */}
        <p className="text-lg sm:text-xl font-serif-playfair text-[#F5EBE0] italic max-w-2xl font-medium leading-relaxed">
          "Preserving India's Eternal Soul • Heritage Reimagined for the Modern Generation"
        </p>

        <p className="mt-3 text-sm text-[#D4AF37]/80 max-w-xl">
          An interactive digital platform featuring 3D monument reconstructions, state filtering directory, and a simple Node.js Express backend API.
        </p>

        {/* Primary CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button
            onClick={onEnter}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D97706] via-[#C2410C] to-[#800020] hover:from-[#F59E0B] hover:to-[#A00028] text-[#FFFDF5] font-bold text-base font-serif-royal tracking-wider shadow-xl shadow-[#C2410C]/30 flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-1 border border-[#D4AF37]/50 cursor-pointer"
          >
            <span>ENTER VIRASAT EXPERIENCE</span>
            <ArrowRight className="w-5 h-5 text-[#FFFDF5]" />
          </button>
        </div>

      </div>

      {/* Feature Cards Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-12 z-10 w-full">
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Explore Project Core Modules
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onSelectFeature(item.id)}
                className="heritage-card p-4 heritage-card-hover cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#3D0F14] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] bg-[#4A0E17] text-[#D4AF37] px-2 py-0.5 rounded font-medium border border-[#D4AF37]/20">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif-royal font-bold text-base text-[#FFFDF5] mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#E5C158]/75 leading-relaxed font-serif-playfair italic">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#D4AF37]/15 flex items-center text-xs text-[#D4AF37] font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Launch Module</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="border-t border-[#D4AF37]/20 py-4 bg-[#140305] text-center text-xs text-[#D4AF37]/70 z-10">
        <p><strong className="text-[#FFFDF5]">VIRASAT</strong> — B.Tech Computer Science Project</p>
      </footer>

    </div>
  );
}
