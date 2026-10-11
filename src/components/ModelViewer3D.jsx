/**
 * VIRASAT - 3D Monument & Digital Twin Viewer
 * 
 * Re-exports the unified DigitalTwinViewer engine which provides:
 * 1. Zero-Bandwidth Offline 3D Procedural WebGL generation (Taj Mahal & Qutub Minar).
 * 2. 4D Temporal Historical Damage & Conservation Simulation (ASI Data).
 * 3. AI Audio Tourist Guide (Web Speech API).
 * 4. Architectural Hotspot Discovery & Guided Virtual Tour.
 * 5. WebXR Augmented Reality (AR) mode.
 */

import React from 'react';
import DigitalTwinViewer from './DigitalTwinViewer';

export default function ModelViewer3D({ selectedSite, onSelectSite, sitesList }) {
  return (
    <DigitalTwinViewer 
      selectedSite={selectedSite} 
      onSelectSite={onSelectSite} 
      sitesList={sitesList}
    />
  );
}
