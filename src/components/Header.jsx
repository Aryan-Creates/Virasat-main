import React, { useState } from 'react';
import { Menu, X, Box, PlusCircle, BookOpen, Compass, Home as HomeIcon } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onScrollToCatalogue 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'monuments', label: 'Explore Monuments' },
    { id: '3dtwins', label: '3D Virtual Twins' },
    { id: 'add', label: 'Add Monument' },
    { id: 'about', label: 'About Virasat' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    if (id === 'monuments' && onScrollToCatalogue) {
      onScrollToCatalogue();
    }
  };

  return (
    <header className="bg-[#4A0E17] text-white border-b border-[#6B1724] sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Left Brand Emblem & Title (Exact layout from reference) */}
        <div 
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3.5 cursor-pointer group select-none"
        >
          {/* Circular Gold "V" Badge */}
          <div className="w-10 h-10 rounded-full bg-[#8C6228] border-2 border-[#D4AF37]/60 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="font-serif-royal font-bold text-lg text-[#FFFDF5]">V</span>
          </div>

          <div>
            <div className="font-serif-royal font-bold text-xl sm:text-2xl tracking-wider text-white flex items-center gap-2">
              VIRASAT
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] text-[#D4AF37] uppercase">
              HERITAGE IN 3D
            </div>
          </div>
        </div>

        {/* Right Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id || (item.id === 'monuments' && activeTab === 'dashboard');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 text-sm font-medium tracking-wide transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-[#E8D3D6] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#E8D3D6] hover:text-white hover:bg-[#5C141F] focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#3D0A11] border-b border-[#6B1724] px-4 pt-2 pb-4 space-y-1 shadow-xl">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#5C141F] text-white font-semibold border-l-4 border-[#D4AF37]'
                    : 'text-[#E8D3D6] hover:bg-[#4A0E17] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-xs text-[#D4AF37]">Active</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
