import React, { useState } from 'react';
import { CalendarCheck, Upload, ThumbsUp, MapPin, Image as ImageIcon } from 'lucide-react';
import { FESTIVAL_ARCHIVE } from '../data/mockData';

export default function FestivalArchive() {
  const [archiveList, setArchiveList] = useState(FESTIVAL_ARCHIVE);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleUpvote = (id) => {
    setArchiveList(prev => prev.map(f => f.id === id ? { ...f, upvotes: f.upvotes + 1 } : f));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newFest = {
      id: `fest-${Date.now()}`,
      title: newTitle,
      location: newLocation || 'Varanasi, Uttar Pradesh',
      date: 'August 2026',
      contributor: 'Student Contributor',
      mediaType: 'HD Photo Archive',
      tags: ['Festival', 'Community Upload'],
      upvotes: 1
    };

    setArchiveList([newFest, ...archiveList]);
    setNewTitle('');
    setNewLocation('');
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D4AF37]/25 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-[#D4AF37]" />
            <h1 className="text-xl font-bold font-serif-royal text-gold-gradient">VIRASAT — Sacred Festival & Ritual Archive</h1>
          </div>
          <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">Crowdsourced digital documentation of Indian cultural festivals & traditional rituals</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs flex items-center gap-2 shadow border border-[#D4AF37]/40 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4 text-[#FFFDF5]" />
          <span>Add Festival Entry</span>
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140305]/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#2D0A0E] rounded-2xl p-5 border border-[#D4AF37]/50 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold font-serif-royal text-gold-gradient">Add Festival Photo / Video</h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="text-xs text-[#D4AF37] font-serif-royal block mb-1">Festival Name / Ritual</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Mysore Dasara Procession"
                  className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-[#FFFDF5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-xs text-[#D4AF37] font-serif-royal block mb-1">Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g., Mysore Palace, Karnataka"
                  className="w-full bg-[#1E0609] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs text-[#FFFDF5] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="p-4 rounded-lg border border-dashed border-[#D4AF37]/40 text-center space-y-1 bg-[#1E0609]">
                <ImageIcon className="w-6 h-6 text-[#D4AF37] mx-auto" />
                <p className="text-xs text-[#E5C158]/80 font-serif-playfair">Click to select photo / video file</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 rounded text-xs text-[#E5C158]/70 hover:text-white font-serif-royal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] font-serif-royal font-bold text-xs border border-[#D4AF37]/40"
                >
                  Upload Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid of Festival Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {archiveList.map((fest) => (
          <div
            key={fest.id}
            className="heritage-card p-5 flex flex-col justify-between space-y-4 heritage-card-hover"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 text-[10px] rounded bg-[#4A0E17] text-[#D4AF37] border border-[#D4AF37]/30 font-semibold font-serif-royal">
                  {fest.date}
                </span>
              </div>

              <h3 className="text-base font-bold font-serif-royal text-[#FFFDF5]">{fest.title}</h3>

              <div className="flex items-center gap-1.5 text-xs text-[#E5C158]/80 font-serif-playfair italic">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{fest.location}</span>
              </div>

              <div className="flex flex-wrap gap-1 pt-1">
                {fest.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-[#1E0609] text-[10px] text-[#D4AF37] border border-[#D4AF37]/25 font-serif-royal">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#E5C158]/70">
              <span className="text-[11px] text-[#E5C158]/70 truncate font-serif-playfair italic">By {fest.contributor}</span>
              <button
                onClick={() => handleUpvote(fest.id)}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#1E0609] hover:bg-[#4A0E17] border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold font-serif-royal transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>{fest.upvotes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
