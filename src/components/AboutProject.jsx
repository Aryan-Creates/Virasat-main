import React from 'react';
import { Landmark, Code, BookOpen, CheckCircle2, Server } from 'lucide-react';

export default function AboutProject() {
  const techStack = [
    { name: 'Procedural Three.js WebGL Engine', desc: 'Zero-bandwidth client-side WebGL procedural generation. 100% offline ready with zero network latency, ideal for rural low-bandwidth users.' },
    { name: '4D Temporal Historical Timeline Engine', desc: 'Simulates historical construction, 19th-century defacements, acid rain marble cancer, and ASI restorations dynamically.' },
    { name: 'Native Web Speech API AI Tour Guide', desc: 'Real-time text-to-speech audio guide providing interactive architectural and historical tours with live captions without third-party APIs.' },
    { name: 'High-Fidelity 3D Binary (.GLB) Models', desc: 'Detailed architectural geometries for Taj Mahal, Qutub Minar, Konark Sun Temple, Hawa Mahal, Red Fort, and Humayun’s Tomb.' },
    { name: 'React 18 & Vite', desc: 'Component modularity, state hooks, responsive layouts, and lightning-fast ES-module bundling.' },
    { name: 'Node.js & Express REST Backend with Persistent SQLite', desc: 'Built-in node:sqlite with WAL mode, duplicate rejection via normalized names, and Zod schema validation.' }
  ];

  const vivaQuestions = [
    {
      q: "Q1. How did you solve the 3D model loading problem for rural users with slow/unreliable internet?",
      a: "Standard heritage 3D scans (GLTF/OBJ) are between 30MB and 100MB, which fail to load on 2G/3G rural connections. We solved this by developing a procedural Three.js WebGL engine. The geometry, PBR materials, and architectural structures (Taj Mahal and Qutub Minar) are mathematically assembled directly in the browser's GPU. This results in 0 KB of external 3D file downloads, rendering instantly in less than 20 milliseconds even with airplane mode turned on."
    },
    {
      q: "Q2. How is the 4D historical time-travel and damage simulation implemented?",
      a: "We built a temporal timeline engine based on Archaeological Survey of India (ASI) reports and Supreme Court records (e.g., M.C. Mehta TTZ case). Moving the slider dynamically alters material PBR properties: simulating pristine crystalline Makrana marble in 1653 CE, looting and neglect in 1857 CE, sulfur dioxide acid rain corrosion ('Marble Cancer') in 1998 CE, and ASI 'Multani Mitti' clay-pack restorations and 2-degree minaret tilt monitoring in 2026 CE. For Qutub Minar, it reconstructs the lightning strike repair by Firoz Shah Tughlaq in 1368 and Major Smith's 1828 cupola."
    },
    {
      q: "Q3. How does the AI Tour Guide speak and explain monument history?",
      a: "We integrated the browser's native Web Speech API (window.speechSynthesis). When a user selects a monument, moves the timeline slider, or clicks an architectural hotspot (e.g. Pishtaq Archway, Corner Minarets, or the Iron Pillar of Delhi), the audio guide speaks in natural Indian English. It works 100% offline without requiring paid cloud APIs or internet connectivity, accompanied by live synchronized captions."
    },
    {
      q: "Q4. How does the system guarantee data integrity against duplicate monuments?",
      a: "We implement defense-in-depth: (1) Client-side name checks, (2) Server-side normalization stripping punctuation, whitespace, and titles, and (3) A database-level UNIQUE(normalized_name) index that prevents duplicate entries at the database engine level."
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="border-b border-[#E8E1D5] pb-4">
        <h1 className="text-2xl font-bold font-serif-royal text-[#4A0E17]">
          About Project Virasat & Technical Documentation
        </h1>
        <p className="text-xs text-gray-600 font-medium mt-1">
          Digital Heritage Preservation & Interactive 3D Virtual Tourism Platform
        </p>
      </div>

      {/* Project Mission Card */}
      <div className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A0E17] flex items-center justify-center text-white">
            <Landmark className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h2 className="text-base font-bold font-serif-royal text-[#3D0A11]">Project Mission Statement</h2>
            <p className="text-xs text-gray-500 font-medium">Digital Heritage Preservation Initiative</p>
          </div>
        </div>

        <p className="text-xs text-gray-700 leading-relaxed">
          <strong>VIRASAT</strong> is a digital cultural heritage platform designed to reduce dependence on traditional tourist guides.
          Visitors explore Indian monuments through verified photorealistic 3D models, learning about history, architecture, location, cultural significance, languages, and local activities from authentic records.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-bold font-serif-royal text-[#4A0E17] flex items-center gap-2">
          <Code className="w-4 h-4 text-[#4A0E17]" />
          <span>Core Technology Stack</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {techStack.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold font-serif-royal text-[#4A0E17]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>{item.name}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Express API Endpoint Summary */}
      <div className="space-y-3">
        <h2 className="text-base font-bold font-serif-royal text-[#4A0E17] flex items-center gap-2">
          <Server className="w-4 h-4 text-[#4A0E17]" />
          <span>Node.js / Express REST API Server Architecture</span>
        </h2>

        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] font-mono text-gray-800">
            <strong className="text-emerald-700">GET /api/monuments</strong> — Lists monuments with search, category, state & 3D status filters
          </div>
          <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] font-mono text-gray-800">
            <strong className="text-[#8C6228]">POST /api/monuments</strong> — Validates and inserts new monuments with Zod schema and duplicate rejection
          </div>
          <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8E1D5] font-mono text-gray-800">
            <strong className="text-[#4A0E17]">GET /api/admin/completeness-report</strong> — Administrative data completeness & 3D model status audit
          </div>
        </div>
      </div>

      {/* Viva Exam Defense Guide */}
      <div className="space-y-3">
        <h2 className="text-base font-bold font-serif-royal text-[#4A0E17] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#4A0E17]" />
          <span>Viva Interview Defense Notes (Key Questions & Answers)</span>
        </h2>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1.5">
              <h3 className="text-xs font-bold font-serif-royal text-[#4A0E17]">{item.q}</h3>
              <p className="text-xs text-gray-700 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
