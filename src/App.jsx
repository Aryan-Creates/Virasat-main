import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ModelViewer3D from './components/ModelViewer3D';
import AddMonumentForm from './components/AddMonumentForm';
import AboutProject from './components/AboutProject';
import { HERITAGE_SITES } from './data/mockData';
import { apiClient } from './services/api';

export default function App() {
  // Active Navigation Tab ('dashboard' | '3dtwins' | 'add' | 'about')
  const [activeTab, setActiveTab] = useState('dashboard');

  // Selected Site for 3D Viewer
  const [selectedSite, setSelectedSite] = useState(HERITAGE_SITES[0]);

  // Dynamic Monuments Data Array
  const [sitesList, setSitesList] = useState(HERITAGE_SITES);

  // Backend Connectivity Status
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Ref to smoothly scroll to the Monuments Catalogue
  const catalogueRef = useRef(null);

  // Load monuments from persistent backend API (with offline fallback)
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const health = await apiClient.checkHealth();
        if (isMounted) setIsBackendOnline(health?.success && health?.status === 'OK');

        const result = await apiClient.getMonuments();
        if (isMounted && result?.success && result.data && result.data.length > 0) {
          setSitesList(result.data);
          if (!result.data.some(s => s.id === selectedSite?.id)) {
            setSelectedSite(result.data[0]);
          }
        }
      } catch (err) {
        console.warn('API sync warning:', err);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Handler: Add a new crowdsourced monument
  const handleAddMonument = (newMonument) => {
    setSitesList((prevList) => [newMonument, ...prevList]);
    setActiveTab('dashboard');
    setTimeout(() => {
      catalogueRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Handler: Select site and navigate to 3D Viewer
  const handleSelectSiteAndNavigate3D = (site) => {
    setSelectedSite(site);
    setActiveTab('3dtwins');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Scroll down to catalogue section
  const handleScrollToCatalogue = () => {
    if (activeTab !== 'dashboard') {
      setActiveTab('dashboard');
      setTimeout(() => {
        catalogueRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      catalogueRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1810] flex flex-col font-sans selection:bg-[#4A0E17] selection:text-white">
      
      {/* 1. Single Unified Top Header matching reference screenshot */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onScrollToCatalogue={handleScrollToCatalogue}
      />

      {/* 2. Main Content Viewport */}
      <main className="flex-1 w-full">
        
        {/* Main Dashboard: Royal Maroon Hero + Clean Ivory Catalogue */}
        {(activeTab === 'dashboard' || activeTab === 'monuments') && (
          <Dashboard 
            sitesList={sitesList}
            onSelectSite={handleSelectSiteAndNavigate3D}
            setActiveTab={setActiveTab}
            catalogueRef={catalogueRef}
          />
        )}

        {/* 3D Digital Twin Viewer */}
        {activeTab === '3dtwins' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#E8E1D5] hover:bg-gray-50 text-xs font-semibold text-[#4A0E17] shadow-sm cursor-pointer transition-all"
              >
                <span>← Back to Monuments Catalogue</span>
              </button>
            </div>
            
            <ModelViewer3D 
              selectedSite={selectedSite} 
              onSelectSite={setSelectedSite}
              sitesList={sitesList}
            />
          </div>
        )}

        {/* Add Monument Form */}
        {activeTab === 'add' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A0E17] hover:underline cursor-pointer"
              >
                ← Back to Dashboard
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E1D5] shadow-sm">
              <AddMonumentForm 
                onAddMonument={handleAddMonument}
              />
            </div>
          </div>
        )}

        {/* About Virasat & Viva Guide */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4A0E17] hover:underline cursor-pointer"
              >
                ← Back to Dashboard
              </button>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E1D5] shadow-sm">
              <AboutProject />
            </div>
          </div>
        )}

      </main>

      {/* Clean Heritage Footer */}
      <footer className="bg-[#4A0E17] text-white border-t border-[#6B1724] py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-serif-royal font-bold text-base text-white">VIRASAT</span>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">• HERITAGE IN 3D</span>
            </div>
            <p className="text-[#E8D3D6] text-[11px] mt-1">
              Interactive Digital Cultural Heritage Preservation & Virtual Tourism Platform
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3D0A11] border border-[#6B1724] text-[11px] text-[#FDE6D2]">
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span>{isBackendOnline ? 'Live SQLite Backend' : 'Offline Verified Mode'}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
