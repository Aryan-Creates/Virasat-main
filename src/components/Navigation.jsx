import React from 'react';
import { LayoutDashboard, Box, Landmark, PlusCircle, BookOpen } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: '3dtwins', label: '3D Monument Viewer', icon: Box },
    { id: 'monuments', label: 'Monuments Directory', icon: Landmark },
    { id: 'add', label: 'Add Monument', icon: PlusCircle },
    { id: 'about', label: 'About & Viva Guide', icon: BookOpen }
  ];

  return (
    <div className="bg-[#1E0609] border-b border-[#D4AF37]/25 sticky top-[65px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto no-scrollbar py-2 gap-2">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap font-serif-royal transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] shadow border border-[#D4AF37]/50'
                    : 'text-[#E5C158]/80 hover:bg-[#3D0F14] hover:text-[#FFFDF5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FFFDF5]' : 'text-[#D4AF37]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Trigger */}
        <button
          onClick={() => setActiveTab('3dtwins')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#800020] via-[#A00028] to-[#D97706] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs whitespace-nowrap shadow border border-[#D4AF37]/40 transition-all cursor-pointer"
        >
          <Box className="w-4 h-4 text-[#D4AF37]" />
          <span>Launch 3D Viewer</span>
        </button>

      </div>
    </div>
  );
}
