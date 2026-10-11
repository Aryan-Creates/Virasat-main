import React, { useState } from 'react';
import { Network, Database, Filter, ArrowRight, Code } from 'lucide-react';
import { CULTURAL_KNOWLEDGE_GRAPH } from '../data/mockData';

export default function KnowledgeGraphExplorer({ initialNode, onSelectSite }) {
  const [selectedNode, setSelectedNode] = useState(initialNode || CULTURAL_KNOWLEDGE_GRAPH.nodes[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredNodes = activeFilter === 'ALL'
    ? CULTURAL_KNOWLEDGE_GRAPH.nodes
    : CULTURAL_KNOWLEDGE_GRAPH.nodes.filter(n => n.type === activeFilter);

  const connectedLinks = CULTURAL_KNOWLEDGE_GRAPH.links.filter(
    link => link.source === selectedNode.id || link.target === selectedNode.id
  );

  const getConnectedNode = (link) => {
    const targetId = link.source === selectedNode.id ? link.target : link.source;
    return CULTURAL_KNOWLEDGE_GRAPH.nodes.find(n => n.id === targetId);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xl font-bold font-serif-royal text-gold-gradient">VIRASAT — Cultural Knowledge Graph</h1>
          </div>
          <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">Explore ancient connections between Indian monuments, ruling dynasties, scripts, and art forms</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D0A0E] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif-royal font-semibold">
          <Database className="w-4 h-4 text-[#F59E0B]" />
          <span>Graph Database Connected</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[#D4AF37] flex items-center gap-1 font-serif-royal font-semibold">
          <Filter className="w-3.5 h-3.5" /> Filter Category:
        </span>
        {['ALL', 'MONUMENT', 'DYNASTY', 'PERSON', 'STYLE', 'INTANGIBLE_ART', 'SCRIPT'].map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-3 py-1.5 rounded-lg border font-serif-royal text-xs transition-all whitespace-nowrap cursor-pointer ${
              activeFilter === type
                ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] border-[#D4AF37] text-[#FFFDF5] font-bold shadow'
                : 'bg-[#1E0609] border-[#D4AF37]/30 text-[#E5C158]/80 hover:bg-[#3D0F14] hover:text-[#FFFDF5]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Interactive Node Canvas */}
        <div className="lg:col-span-7 heritage-card p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#E5C158]/70 border-b border-[#D4AF37]/20 pb-2">
            <span className="font-serif-royal text-[#D4AF37]">DATABASE NODES ({filteredNodes.length})</span>
            <span className="text-[#F59E0B] font-serif-playfair italic">Click any node to inspect relationships</span>
          </div>

          <div className="bg-[#1E0609] rounded-xl p-4 border border-[#D4AF37]/30 min-h-[320px] flex flex-wrap items-center justify-center gap-3">
            {filteredNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#4A0E17] to-[#3D0F14] border-[#D4AF37] text-[#FFFDF5] font-semibold scale-105 shadow-lg ring-1 ring-[#D4AF37]'
                      : 'bg-[#2D0A0E] border-[#D4AF37]/25 text-[#E5C158]/90 hover:border-[#D4AF37] hover:bg-[#3D0F14]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
                    <span className="text-xs font-bold font-serif-royal">{node.name}</span>
                  </div>
                  <span className="text-[10px] text-[#F59E0B] block mt-1 font-serif-playfair">{node.type}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Node Details Pane */}
        <div className="lg:col-span-5 space-y-4">
          <div className="heritage-card p-5 space-y-4">
            <div className="border-b border-[#D4AF37]/25 pb-3">
              <span className="text-xs font-semibold text-[#D4AF37] font-serif-royal uppercase">{selectedNode.type}</span>
              <h3 className="text-xl font-bold font-serif-royal text-gold-gradient">{selectedNode.name}</h3>
              <p className="text-xs text-[#E5C158]/80 font-serif-playfair italic">{selectedNode.era || selectedNode.group}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#D4AF37] font-serif-royal block">Connected Entity Edges ({connectedLinks.length}):</span>
              {connectedLinks.map((link, idx) => {
                const targetNode = getConnectedNode(link);
                return (
                  <div
                    key={idx}
                    onClick={() => targetNode && setSelectedNode(targetNode)}
                    className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30 hover:border-[#D4AF37] cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-semibold text-[#F59E0B] font-serif-royal">{link.label}</div>
                      <div className="text-xs font-bold text-[#FFFDF5]">{targetNode?.name}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                );
              })}
            </div>

            {/* Generated Cypher SQL Query */}
            <div className="p-3 rounded-lg bg-[#1E0609] border border-[#D4AF37]/30 space-y-1">
              <div className="flex items-center gap-1 text-xs text-[#D4AF37] font-semibold font-serif-royal">
                <Code className="w-3.5 h-3.5 text-[#F59E0B]" /> Database Cypher Query:
              </div>
              <pre className="font-mono text-[11px] text-[#E5C158] overflow-x-auto">
{`MATCH (n:${selectedNode.type} {name: "${selectedNode.name}"})-[r]-(connected)
RETURN n, r, connected;`}
              </pre>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
