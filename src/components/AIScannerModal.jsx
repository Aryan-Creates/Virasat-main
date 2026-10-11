import React, { useState, useEffect } from 'react';
import { 
  X, 
  Camera, 
  CheckCircle2, 
  Database, 
  Box, 
  FileText, 
  RefreshCw
} from 'lucide-react';
import { HERITAGE_SITES, ANCIENT_SCRIPTS } from '../data/mockData';

export default function AIScannerModal({ isOpen, onClose, onNavigateToTwin, onNavigateToGraph }) {
  const [scanMode, setScanMode] = useState('monument'); // 'monument' | 'script'
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [detectedResult, setDetectedResult] = useState(null);

  useEffect(() => {
    if (isOpen) {
      handleSelectSample(HERITAGE_SITES[0]);
    } else {
      setIsScanning(false);
      setScanComplete(false);
    }
  }, [isOpen, scanMode]);

  if (!isOpen) return null;

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setScanComplete(false);
    setIsScanning(true);

    // Simulate AI image recognition delay
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      setDetectedResult(sample);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#140305]/85 backdrop-blur-sm">
      
      <div className="relative w-full max-w-3xl bg-[#2D0A0E] rounded-2xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF37]/30 bg-[#1E0609]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] border border-[#D4AF37]/40">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold font-serif-royal text-gold-gradient">
                VIRASAT — AI Epigraphy & Heritage Scanner
              </h2>
              <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">Select an image sample or upload a photo to identify ancient details</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#E5C158]/70 hover:text-white hover:bg-[#4A0E17] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scan Mode Toggle */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-[#1E0609] border-b border-[#D4AF37]/25">
          <button
            onClick={() => {
              setScanMode('monument');
              handleSelectSample(HERITAGE_SITES[0]);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif-royal font-semibold transition-all ${
              scanMode === 'monument'
                ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] border border-[#D4AF37]/40 shadow'
                : 'text-[#E5C158]/80 hover:bg-[#3D0F14]'
            }`}
          >
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>Monument Identification</span>
          </button>

          <button
            onClick={() => {
              setScanMode('script');
              handleSelectSample(ANCIENT_SCRIPTS[0]);
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-serif-royal font-semibold transition-all ${
              scanMode === 'script'
                ? 'bg-gradient-to-r from-[#D97706] to-[#C2410C] text-[#FFFDF5] border border-[#D4AF37]/40 shadow'
                : 'text-[#E5C158]/80 hover:bg-[#3D0F14]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>Ancient Script OCR</span>
          </button>
        </div>

        {/* Main Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* Left: Sample Image View */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative w-full h-56 rounded-xl overflow-hidden bg-[#1E0609] border border-[#D4AF37]/30 flex items-center justify-center">
                {selectedSample && (
                  <img
                    src={scanMode === 'monument' ? selectedSample.imageUrl : selectedSample.sampleImage}
                    alt="Scan Sample"
                    className="w-full h-full object-cover"
                  />
                )}
                {isScanning && (
                  <div className="absolute inset-0 bg-[#140305]/80 flex flex-col items-center justify-center text-center p-4">
                    <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mb-2" />
                    <span className="text-xs font-serif-royal font-bold text-[#FFFDF5]">Analyzing Inscription & Features...</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs text-[#E5C158]/80 font-serif-royal font-semibold">Select a sample to analyze:</span>
                <div className="grid grid-cols-4 gap-2">
                  {(scanMode === 'monument' ? HERITAGE_SITES.slice(0, 4) : ANCIENT_SCRIPTS).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectSample(item)}
                      className={`relative rounded-lg overflow-hidden border h-14 transition-all ${
                        selectedSample?.id === item.id
                          ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/60'
                          : 'border-[#D4AF37]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={scanMode === 'monument' ? item.imageUrl : item.sampleImage}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Results Pane */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-4">
              {scanComplete && detectedResult ? (
                <div className="bg-[#1E0609] p-4 rounded-xl border border-[#D4AF37]/30 space-y-4">
                  <div className="space-y-1 border-b border-[#D4AF37]/25 pb-3">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-serif-royal">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>AI Epigraphy Result</span>
                    </div>
                    <h3 className="text-lg font-bold font-serif-royal text-gold-gradient">{detectedResult.name}</h3>
                    <p className="text-xs text-[#E5C158]/70 font-serif-playfair italic">
                      {scanMode === 'monument' ? `${detectedResult.dynasty} • ${detectedResult.era}` : `${detectedResult.period} • ${detectedResult.region}`}
                    </p>
                  </div>

                  {scanMode === 'monument' ? (
                    <div className="space-y-2 text-xs text-[#FFFDF5]">
                      <div>
                        <span className="text-[#D4AF37] font-serif-royal font-semibold block">Architecture Style:</span>
                        <p>{detectedResult.architecturalStyle}</p>
                      </div>
                      <div>
                        <span className="text-[#D4AF37] font-serif-royal font-semibold block">Historical Overview:</span>
                        <p className="line-clamp-3 font-serif-playfair italic text-[#E5C158]/90">{detectedResult.description}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-[#D4AF37] font-serif-royal font-semibold block">Deciphered Inscription:</span>
                        <p className="font-mono text-[#F59E0B] bg-[#2D0A0E] p-2 rounded border border-[#D4AF37]/20">{detectedResult.sampleTextOriginal}</p>
                      </div>
                      <div>
                        <span className="text-[#D4AF37] font-serif-royal font-semibold block">English Translation:</span>
                        <p className="text-[#FFFDF5] font-serif-playfair italic">"{detectedResult.translationEnglish}"</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col gap-2">
                    {scanMode === 'monument' && (
                      <button
                        onClick={() => {
                          onClose();
                          onNavigateToTwin(detectedResult);
                        }}
                        className="w-full py-2 rounded-lg bg-gradient-to-r from-[#D97706] to-[#C2410C] hover:opacity-95 text-[#FFFDF5] font-serif-royal font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all border border-[#D4AF37]/40 shadow"
                      >
                        <Box className="w-4 h-4 text-[#FFFDF5]" />
                        <span>View 3D Monument Twin</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onClose();
                        onNavigateToGraph();
                      }}
                      className="w-full py-2 rounded-lg bg-[#3D0F14] hover:bg-[#4A0E17] text-[#D4AF37] font-serif-royal font-semibold text-xs flex items-center justify-center gap-2 border border-[#D4AF37]/30 cursor-pointer transition-colors"
                    >
                      <Database className="w-4 h-4 text-[#D4AF37]" />
                      <span>Inspect Knowledge Graph</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-[#E5C158]/70 text-xs font-serif-playfair">
                  Processing epigraphic image...
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
