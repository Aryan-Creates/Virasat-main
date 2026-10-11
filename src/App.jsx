/**
 * VIRASAT - Main Application Component (1st-Year CS Student Project)
 * 
 * Student Concepts Used:
 * 1. React useState Hook: Manages active navigation tab and student-added monument data.
 * 2. Props Passing: Functions and state are passed to child components.
 * 3. Conditional Rendering: Renders OpeningScreen, 3D ModelViewer, or main layout pages.
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import ModelViewer3D from './components/ModelViewer3D';
import MonumentsList from './components/MonumentsList';
import AddMonumentForm from './components/AddMonumentForm';
import AboutProject from './components/AboutProject';
import OpeningScreen from './components/OpeningScreen';
import { HERITAGE_SITES } from './data/mockData';
import { apiClient } from './services/api';

export default function App() {
  // State 1: Control whether Opening Landing Screen is active
  const [showOpeningScreen, setShowOpeningScreen] = useState(true);

  // State 2: Active Navigation Tab ('dashboard' | '3dtwins' | 'monuments' | 'add' | 'about')
  const [activeTab, setActiveTab] = useState('dashboard');

  // State 3: Selected Site for 3D Viewer
  const [selectedSite, setSelectedSite] = useState(HERITAGE_SITES[0]);

  // State 4: Dynamic Monuments Data Array
  const [sitesList, setSitesList] = useState(HERITAGE_SITES);

  // State 5: Backend Connectivity Status
  const [isBackendOnline, setIsBackendOnline] = useState(false);

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
          // If the currently selected site is in the list, keep it; otherwise select the first
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

  // Handler: Add a new crowdsourced monument object into state
  const handleAddMonument = (newMonument) => {
    setSitesList((prevList) => [newMonument, ...prevList]);
  };

  // Handler: Select site and navigate to 3D Viewer
  const handleSelectSiteAndNavigate3D = (site) => {
    setSelectedSite(site);
    setActiveTab('3dtwins');
  };

  // Render Opening Landing Screen if active
  if (showOpeningScreen) {
    return (
      <OpeningScreen 
        onEnter={() => setShowOpeningScreen(false)} 
        onSelectFeature={(tab) => {
          setActiveTab(tab);
          setShowOpeningScreen(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#1A0507] text-[#FFFDF5] flex flex-col font-sans bg-jaali-pattern">
      
      {/* Top Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenStartScreen={() => setShowOpeningScreen(true)}
        onSelectSite={handleSelectSiteAndNavigate3D}
        sitesList={sitesList}
      />

      {/* Top Navigation Bar */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Tab 1: Home Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            setActiveTab={setActiveTab} 
            sitesList={sitesList}
            onSelectSite={handleSelectSiteAndNavigate3D}
          />
        )}

        {/* Tab 2: 3D Monument Viewer */}
        {activeTab === '3dtwins' && (
          <ModelViewer3D 
            selectedSite={selectedSite} 
            onSelectSite={setSelectedSite}
            sitesList={sitesList}
          />
        )}

        {/* Tab 3: Monuments Directory */}
        {activeTab === 'monuments' && (
          <MonumentsList 
            sitesList={sitesList}
            onSelectSite={handleSelectSiteAndNavigate3D}
          />
        )}

        {/* Tab 4: Crowdsource Form to Add New Monument */}
        {activeTab === 'add' && (
          <AddMonumentForm 
            onAddMonument={handleAddMonument}
          />
        )}

        {/* Tab 5: About Project & Viva Defense Notes */}
        {activeTab === 'about' && (
          <AboutProject />
        )}

      </main>

      {/* Student Project Footer */}
      <footer className="bg-[#140305] border-t border-[#D4AF37]/25 py-6 text-center text-xs text-[#E5C158]/70">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <p><strong className="text-[#FFFDF5] font-serif-royal">VIRASAT</strong> — Indian Cultural Heritage Platform</p>
            <p className="mt-0.5 text-[#D4AF37]/60">Department of Computer Science & Engineering • Digital Heritage Preservation Initiative</p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E0609] border border-[#D4AF37]/30 text-[11px] font-mono">
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="text-[#FFFDF5]">
              {isBackendOnline ? 'Backend API: SQLite / Node.js Connected' : 'Offline Verified Mode'}
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
