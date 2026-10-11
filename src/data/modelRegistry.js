/**
 * VIRASAT - 3D Heritage Model Registry & Architectural Configuration
 * Maps canonical monument IDs to their verified 3D GLB assets,
 * camera coordinates, lighting presets, architectural hotspots, and historical timelines.
 */

import { MONUMENTS_3D_DATA } from './monuments3dData';

export const MONUMENT_MODEL_REGISTRY = {
  // 1. TAJ MAHAL COMPLEX
  'site-006': {
    id: 'site-006',
    name: 'Taj Mahal Complex',
    modelUrl: '/models/taj_mahal.glb',
    modelScale: 0.072,
    offsetPosition: { x: 0, y: 3.16, z: 16.27 },
    defaultCam: { x: 20, y: 14, z: 24 },
    defaultTarget: { x: 0, y: 4, z: 0 },
    lighting: {
      ambientIntensity: 0.9,
      directionalIntensity: 1.6,
      sunPosition: { x: 25, y: 35, z: 20 }
    },
    attribution: 'ASI & UNESCO Architectural Blueprints 3D Reconstruction',
    audioIntro: 'Welcome to the Taj Mahal 3D Digital Twin. Built between 1632 and 1653 CE by Emperor Shah Jahan in memory of Mumtaz Mahal. Explore its 360-degree architecture, drag the timeline slider to view historical conservation eras, and select any architectural hotspot.',
    hotspots: MONUMENTS_3D_DATA['site-006']?.hotspots || [
      {
        id: 'main-dome',
        name: 'Central Onion Dome & Finial',
        badge: 'ARCHITECTURE',
        camPos: { x: 6, y: 17, z: 10 },
        target: { x: 0, y: 15.6, z: 0 },
        shortDesc: 'Rising 35 meters high, the central bulbous double dome of white Makrana marble.',
        audioNarration: 'Rising 35 meters high, the central bulbous double dome of white Makrana marble is crowned by a golden brass finial combining Islamic and Hindu motifs.'
      },
      {
        id: 'pishtaq-arch',
        name: 'Grand Pishtaq Vaulted Iwan',
        badge: 'GATEWAY',
        camPos: { x: 0, y: 6, z: 14 },
        target: { x: 0, y: 6.2, z: 6.9 },
        shortDesc: 'Recessed semi-octagonal entrance arch decorated with Qur’anic calligraphy.',
        audioNarration: 'Recessed semi-octagonal entrance arch decorated with Qur’anic Thuluth calligraphy that scales upward to appear optically uniform from ground level.'
      },
      {
        id: 'corner-minarets',
        name: 'Tilting Corner Minarets',
        badge: 'MINARETS',
        camPos: { x: 18, y: 14, z: 18 },
        target: { x: 12, y: 12, z: 12 },
        shortDesc: 'Four 40-meter minarets engineered with deliberate 2-degree outward tilt.',
        audioNarration: 'Four 40-meter minarets engineered with a deliberate 2-degree outward tilt so that in an earthquake, they collapse away from the central tomb.'
      }
    ],
    cameraPresets: MONUMENTS_3D_DATA['site-006']?.cameraPresets || [
      { name: 'Three-Quarter View', pos: { x: 20, y: 14, z: 24 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Front Facade View', pos: { x: 0, y: 7, z: 26 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Left Minaret View', pos: { x: -24, y: 8, z: 6 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Right Minaret View', pos: { x: 24, y: 8, z: 6 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Back Yamuna View', pos: { x: 0, y: 7, z: -26 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Top Aerial View', pos: { x: 0, y: 34, z: 2 }, target: { x: 0, y: 4, z: 0 } }
    ],
    eras: MONUMENTS_3D_DATA['site-006']?.eras || []
  },

  // 2. QUTUB MINAR COMPLEX
  'site-007': {
    id: 'site-007',
    name: 'Qutub Minar Complex',
    modelUrl: '/models/qutub_minar.glb',
    modelScale: 0.75,
    offsetPosition: { x: 0, y: 0, z: 0 },
    defaultCam: { x: 18, y: 16, z: 22 },
    defaultTarget: { x: 0, y: 10, z: 0 },
    lighting: {
      ambientIntensity: 0.85,
      directionalIntensity: 1.5,
      sunPosition: { x: 20, y: 30, z: 15 }
    },
    attribution: 'Archaeological Survey of India Delhi Circle Measured Elevation Survey',
    audioIntro: 'Welcome to the Qutub Minar 3D Digital Twin. Standing 72.5 meters tall in New Delhi, it is the tallest brick and sandstone minaret in the world. Drag the historical timeline slider to inspect Sultanate additions, lightning reconstructions, and the 1,600-year rustless Iron Pillar.',
    hotspots: MONUMENTS_3D_DATA['site-007']?.hotspots || [
      {
        id: 'iron-pillar',
        name: '1,600-Year Rustless Iron Pillar',
        badge: 'METALLURGY',
        camPos: { x: 9.0, y: 5.0, z: 6.0 },
        target: { x: 5.6, y: 3.5, z: 3.0 },
        shortDesc: 'Erected in the 4th-5th century CE by King Chandra (Chandragupta II).',
        audioNarration: 'Erected in the 4th-5th century CE by King Chandra. Celebrated worldwide for its high-phosphorus forge-welded iron alloy that has resisted rust for over sixteen centuries.'
      },
      {
        id: 'fluted-shaft',
        name: 'Alternating Fluted Shaft & Balconies',
        badge: 'SANDSTONE',
        camPos: { x: 0, y: 12, z: 8 },
        target: { x: 0, y: 9.8, z: 2.8 },
        shortDesc: 'Alternating semicircular and angular flutings supporting stalactite balconies.',
        audioNarration: 'The lower storeys feature alternating semicircular and angular flutings of red sandstone supporting stalactite corbelled projecting balconies.'
      },
      {
        id: 'marble-upper',
        name: 'Firoz Shah Tughlaq Marble Storeys (1368 CE)',
        badge: 'MARBLE',
        camPos: { x: 4, y: 24, z: 7 },
        target: { x: 0, y: 22.5, z: 1.5 },
        shortDesc: 'Storeys 4 and 5 rebuilt in 1368 CE after a lightning strike.',
        audioNarration: 'Storeys 4 and 5 were rebuilt in 1368 CE by Sultan Firoz Shah Tughlaq after a devastating lightning strike, using gleaming white Makrana marble bands.'
      }
    ],
    cameraPresets: MONUMENTS_3D_DATA['site-007']?.cameraPresets || [
      { name: 'Three-Quarter View', pos: { x: 18, y: 16, z: 22 }, target: { x: 0, y: 8, z: 0 } },
      { name: 'Ground Base Angle', pos: { x: 8, y: 4, z: 14 }, target: { x: 0, y: 8, z: 0 } },
      { name: 'Summit Telephoto View', pos: { x: 2, y: 30, z: 10 }, target: { x: 0, y: 28, z: 0 } },
      { name: 'Iron Pillar Focus', pos: { x: 9, y: 4, z: 6 }, target: { x: 5.6, y: 3.5, z: 3 } },
      { name: 'Top Aerial View', pos: { x: 0, y: 38, z: 4 }, target: { x: 0, y: 8, z: 0 } }
    ],
    eras: MONUMENTS_3D_DATA['site-007']?.eras || []
  },

  // 3. SUN TEMPLE, KONARK
  'site-001': {
    id: 'site-001',
    name: 'Sun Temple, Konark',
    modelUrl: '/models/konark_sun_temple.glb',
    modelScale: 0.65,
    offsetPosition: { x: 0, y: 0, z: 0 },
    defaultCam: { x: 22, y: 14, z: 24 },
    defaultTarget: { x: 0, y: 6, z: 0 },
    lighting: {
      ambientIntensity: 0.9,
      directionalIntensity: 1.7,
      sunPosition: { x: 30, y: 25, z: 15 }
    },
    attribution: 'ASI Bhubaneswar Circle Archaeological Photogrammetry Blueprint',
    audioIntro: 'Welcome to the Konark Sun Temple 3D Digital Twin. Built in 1250 CE by King Narasimhadeva I of the Eastern Ganga Dynasty. The entire temple is designed as a colossal stone chariot of Surya with 24 carved solar wheels and seven celestial horses.',
    hotspots: [
      {
        id: 'sundial-wheel',
        name: 'Carved Astronomical Sundial Wheel',
        badge: 'ASTRONOMY',
        camPos: { x: 13, y: 3, z: 6 },
        target: { x: 8.5, y: 1.8, z: 4.0 },
        shortDesc: 'Each 3-meter stone wheel acts as a precision solar sundial.',
        audioNarration: 'Each 3-meter stone wheel features 8 major spokes and 8 minor spokes that act as sundials, calculating solar time to within a minute based on spoke shadows.'
      },
      {
        id: 'jagamohana-vimana',
        name: 'Tiered Pyramidal Jagamohana (Porch)',
        badge: 'KALINGA DEULA',
        camPos: { x: 0, y: 14, z: 16 },
        target: { x: 0, y: 10, z: -1 },
        shortDesc: 'Stepped pyramidal tiers (potalas) crowned with the sacred kalasha.',
        audioNarration: 'The colossal Pidha Deula porch rises in three stepped pyramidal tiers crowned with the sacred kalasha finial.'
      },
      {
        id: 'natya-mandapa',
        name: 'Natya Mandapa (Hall of Dance)',
        badge: 'PERFORMING ARTS',
        camPos: { x: 0, y: 6, z: 18 },
        target: { x: 0, y: 3.5, z: 11 },
        shortDesc: 'Pillared dance pavilion sculpted with hundreds of musicians and Odissi poses.',
        audioNarration: 'Pillared dance pavilion sculpted with hundreds of musicians playing mardala drums, flutes, and classical Odissi dance poses.'
      }
    ],
    cameraPresets: [
      { name: 'Three-Quarter Chariot', pos: { x: 22, y: 14, z: 24 }, target: { x: 0, y: 6, z: 0 } },
      { name: 'Front Entrance & Horses', pos: { x: 0, y: 5, z: 26 }, target: { x: 0, y: 4, z: 12 } },
      { name: 'Side Sundial Wheels', pos: { x: 16, y: 4, z: 2 }, target: { x: 0, y: 3, z: 2 } },
      { name: 'Jagamohana Summit', pos: { x: 0, y: 18, z: 14 }, target: { x: 0, y: 12, z: -2 } },
      { name: 'Top Aerial View', pos: { x: 0, y: 34, z: 2 }, target: { x: 0, y: 4, z: 0 } }
    ],
    eras: [
      {
        year: 1250,
        label: '1250 CE',
        title: 'Consecration of the Surya Chariot',
        badge: 'EASTERN GANGA GOLDEN AGE',
        badgeColor: 'border-amber-500/60 text-amber-300 bg-amber-950/60',
        summary: 'King Narasimhadeva I completes the 12-year construction with 1,200 sculptors.',
        audioNarration: 'Year 1250 CE: The colossal chariot of the Sun God stands complete on the shores of the Bay of Bengal, with its 24 astronomical wheels tracking the celestial movement of the sun.'
      },
      {
        year: 1903,
        label: '1903 CE',
        title: 'British Conservation & Sand-Filling',
        badge: 'STRUCTURAL INTERVENTION',
        badgeColor: 'border-cyan-500/60 text-cyan-300 bg-cyan-950/60',
        summary: 'Lt. Governor Sir John Woodburn ordered the Jagamohana filled with sand to prevent catastrophic structural collapse.',
        audioNarration: 'Year 1903 CE: To preserve the precarious Jagamohana from collapsing inward, British engineers permanently packed the interior chamber with sand and sealed the entrances.'
      },
      {
        year: 2026,
        label: '2026 CE',
        title: 'ASI Modern Sand Removal & Laser Scanning',
        badge: 'ACTIVE ASI RESTORATION',
        badgeColor: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/60',
        summary: 'ASI undertakes careful extraction of settling sand and internal steel reinforcement monitoring.',
        audioNarration: 'Year 2026 CE: Modern conservationists employ laser radar scanning and careful sediment monitoring to preserve the Kalinga stone reliefs against coastal salinity.'
      }
    ]
  },

  // 4. RED FORT (LAL QILA), DELHI
  'site-008': {
    id: 'site-008',
    name: 'Red Fort (Lal Qila), Delhi',
    modelUrl: '/models/red_fort.glb',
    modelScale: 0.55,
    offsetPosition: { x: 0, y: 0, z: 0 },
    defaultCam: { x: 24, y: 12, z: 26 },
    defaultTarget: { x: 0, y: 5, z: 0 },
    lighting: {
      ambientIntensity: 0.9,
      directionalIntensity: 1.6,
      sunPosition: { x: 25, y: 30, z: 20 }
    },
    attribution: 'ASI Delhi Circle Measured Fortress Elevation Blueprint',
    audioIntro: 'Welcome to the Red Fort 3D Digital Twin. Built between 1638 and 1648 CE by Mughal Emperor Shah Jahan as the imperial palace of Shahjahanabad. Explore the grand Lahori Gate, fortified octagonal ramparts, and white marble chhatris.',
    hotspots: [
      {
        id: 'lahori-gate',
        name: 'Lahori Gate & Royal Gateway',
        badge: 'CEREMONIAL GATE',
        camPos: { x: 0, y: 8, z: 12 },
        target: { x: 0, y: 6.5, z: 1.5 },
        shortDesc: 'The principal ceremonial gateway facing Lahore, crowned with miniature chhatris.',
        audioNarration: 'The principal ceremonial gateway facing Lahore, crowned with seven miniature marble chhatris and flanking octagonal bastions.'
      },
      {
        id: 'ramparts',
        name: 'Crenellated 33-Meter Red Sandstone Ramparts',
        badge: 'FORTIFICATIONS',
        camPos: { x: -16, y: 7, z: 10 },
        target: { x: -12, y: 5, z: 2 },
        shortDesc: 'Defensive battlements crafted from Rajasthan red sandstone.',
        audioNarration: 'Massive defensive battlements crafted from red sandstone quarried from Rajasthan, surrounded by a 10-meter deep moat.'
      },
      {
        id: 'chhatri-pavilion',
        name: 'White Marble Domed Chhatris',
        badge: 'MUGHAL ROOFTOP',
        camPos: { x: 7, y: 11, z: 5 },
        target: { x: 4.8, y: 9.8, z: 1.0 },
        shortDesc: 'Octagonal domed chhatris surmounting the twin bastion towers.',
        audioNarration: 'Octagonal domed chhatris surmounting the twin bastion towers, combining classical Mughal symmetry with Rajput canopy designs.'
      }
    ],
    cameraPresets: [
      { name: 'Three-Quarter View', pos: { x: 24, y: 12, z: 26 }, target: { x: 0, y: 5, z: 0 } },
      { name: 'Lahori Gate Frontal', pos: { x: 0, y: 6, z: 18 }, target: { x: 0, y: 5, z: 0 } },
      { name: 'Rampart Bastion Focus', pos: { x: -18, y: 8, z: 10 }, target: { x: -6, y: 6, z: 0 } },
      { name: 'Moat Low Angle', pos: { x: 0, y: 2, z: 16 }, target: { x: 0, y: 6, z: 0 } },
      { name: 'Top Aerial View', pos: { x: 0, y: 32, z: 2 }, target: { x: 0, y: 4, z: 0 } }
    ],
    eras: [
      {
        year: 1648,
        label: '1648 CE',
        title: 'Imperial Inauguration by Shah Jahan',
        badge: 'SHAHJAHANABAD APOGEE',
        badgeColor: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/60',
        summary: 'Emperor Shah Jahan enters his newly completed citadel through the Lahori Gate.',
        audioNarration: 'Year 1648 CE: The Red Fort is consecrated as the imperial seat of the Mughal Empire. Its red sandstone ramparts gleam along the Yamuna riverfront.'
      },
      {
        year: 1947,
        label: '1947 CE',
        title: 'Tryst with Destiny: Indian Independence',
        badge: 'NATIONAL SOVEREIGNTY',
        badgeColor: 'border-amber-500/60 text-amber-300 bg-amber-950/60',
        summary: 'Prime Minister Jawaharlal Nehru unfurls the Indian Tricolour from the Lahori Gate ramparts.',
        audioNarration: 'Year 1947 CE: The Red Fort becomes the eternal symbol of Indian freedom, beginning the annual tradition of the Prime Minister addressing the nation from its battlements.'
      }
    ]
  },

  // 5. HUMAYUN'S TOMB, DELHI
  'site-009': {
    id: 'site-009',
    name: "Humayun's Tomb, Delhi",
    modelUrl: '/models/humayuns_tomb.glb',
    modelScale: 0.62,
    offsetPosition: { x: 0, y: 0, z: 0 },
    defaultCam: { x: 22, y: 14, z: 24 },
    defaultTarget: { x: 0, y: 6, z: 0 },
    lighting: {
      ambientIntensity: 0.85,
      directionalIntensity: 1.6,
      sunPosition: { x: 20, y: 30, z: 15 }
    },
    attribution: 'Aga Khan Trust for Culture & ASI Architectural Survey',
    audioIntro: "Welcome to the Humayun's Tomb 3D Digital Twin. Built between 1565 and 1572 CE by Empress Bega Begum. It is the first grand garden-tomb on the Indian subcontinent and the direct architectural inspiration for the Taj Mahal.",
    hotspots: [
      {
        id: 'double-dome',
        name: 'First Grand Persian Double Marble Dome in India',
        badge: 'DOUBLE DOME',
        camPos: { x: 0, y: 15, z: 12 },
        target: { x: 0, y: 12.5, z: 0 },
        shortDesc: 'Engineered with inner ceiling and towering outer marble shell.',
        audioNarration: 'Engineered with an inner ceiling that keeps proportions intimate inside, while the towering outer marble shell creates a monumental silhouette.'
      },
      {
        id: 'pishtaq-facade',
        name: 'Grand Pishtaq Arched Vaults',
        badge: 'FAÇADE',
        camPos: { x: 0, y: 6, z: 13 },
        target: { x: 0, y: 5.5, z: 6.8 },
        shortDesc: 'Recessed pointed archway framed with white Makrana marble.',
        audioNarration: 'Recessed pointed archway framed with white Makrana marble and black slate geometrical borders against rich red sandstone.'
      },
      {
        id: 'terraced-plinth',
        name: 'Arcaded Terraced Plinth Podium',
        badge: 'FOUNDATION',
        camPos: { x: 12, y: 4, z: 14 },
        target: { x: 8, y: 1.5, z: 10 },
        shortDesc: 'Elevated 7-meter podium with 56 arcaded burial chambers.',
        audioNarration: 'Elevated 7-meter high podium with 56 arcaded burial chambers overlooking the 30-acre Charbagh quadripartite water gardens.'
      }
    ],
    cameraPresets: [
      { name: 'Three-Quarter Tomb', pos: { x: 22, y: 14, z: 24 }, target: { x: 0, y: 6, z: 0 } },
      { name: 'Front Charbagh View', pos: { x: 0, y: 7, z: 22 }, target: { x: 0, y: 6, z: 0 } },
      { name: 'Double Dome Focus', pos: { x: 0, y: 16, z: 12 }, target: { x: 0, y: 13, z: 0 } },
      { name: 'Terrace Plinth Angle', pos: { x: -16, y: 5, z: 12 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Top Aerial View', pos: { x: 0, y: 32, z: 2 }, target: { x: 0, y: 4, z: 0 } }
    ],
    eras: [
      {
        year: 1572,
        label: '1572 CE',
        title: 'Completion under Mirak Mirza Ghiyas',
        badge: 'EARLY MUGHAL SYNTHESIS',
        badgeColor: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/60',
        summary: 'Empress Bega Begum oversees final consecration of the garden mausoleum.',
        audioNarration: 'Year 1572 CE: Humayun’s Tomb is completed, pioneering the monumental synthesis of Persian Timurid gardens and Indian red sandstone architecture.'
      },
      {
        year: 2013,
        label: '2013 CE',
        title: 'AKTC & ASI Historic Restoration',
        badge: 'UNESCO EXCELLENCE RESTORATION',
        badgeColor: 'border-cyan-500/60 text-cyan-300 bg-cyan-950/60',
        summary: 'Meticulous chemical-free stone restoration, revitalizing water gardens and re-carving deteriorated sandstone.',
        audioNarration: 'Year 2013 CE: A landmark 10-year conservation initiative by the Aga Khan Trust for Culture and the Archaeological Survey of India restores the original waterworks and stone facades.'
      }
    ]
  },

  // 6. HAWA MAHAL, JAIPUR
  'site-010': {
    id: 'site-010',
    name: 'Hawa Mahal (Palace of Winds), Jaipur',
    modelUrl: '/models/hawa_mahal.glb',
    modelScale: 0.65,
    offsetPosition: { x: 0, y: 0, z: 0 },
    defaultCam: { x: 18, y: 12, z: 22 },
    defaultTarget: { x: 0, y: 6, z: 0 },
    lighting: {
      ambientIntensity: 0.9,
      directionalIntensity: 1.7,
      sunPosition: { x: 20, y: 25, z: 20 }
    },
    attribution: 'Department of Archaeology & Museums Rajasthan Elevation Plan',
    audioIntro: 'Welcome to the Hawa Mahal 3D Digital Twin. Built in 1799 CE by Maharaja Sawai Pratap Singh in Jaipur. Shaped like Lord Krishna’s crown, its five-storey facade contains 953 sculpted jharokha screens engineered for cooling desert breezes.',
    hotspots: [
      {
        id: 'jharokha-screens',
        name: '953 Sculpted Stone Jharokha Screens',
        badge: 'JHAROKHA',
        camPos: { x: 0, y: 7.0, z: 7.0 },
        target: { x: 0, y: 6.0, z: 1.8 },
        shortDesc: 'Intricately latticed bay windows creating venturi cooling airflow.',
        audioNarration: 'Intricately latticed bay windows that create a venturi effect, drawing in cooling winds while allowing royal women to look down into street festivals without being seen.'
      },
      {
        id: 'krishna-crown',
        name: 'Mukut (Lord Krishna Crown) Pyramidal Profile',
        badge: 'SILHOUETTE',
        camPos: { x: 0, y: 13.0, z: 9.0 },
        target: { x: 0, y: 11.5, z: 0.6 },
        shortDesc: 'Stepped pyramidal profile tapering to 20cm at the top storey.',
        audioNarration: 'The stepped pyramidal facade tapers from a full palace base to just 20 centimeters wide at the top storey (Hawa Mandir).'
      },
      {
        id: 'pink-sandstone',
        name: 'Jaipur Pink Sandstone & Marble Trims',
        badge: 'PINK CITY',
        camPos: { x: 9, y: 5.0, z: 6.0 },
        target: { x: 6, y: 3.5, z: 1.5 },
        shortDesc: 'Crafted from indigenous pink and terracotta desert sandstone.',
        audioNarration: 'Crafted from indigenous pink and terracotta sandstone quarried from nearby desert hills, giving Jaipur its iconic identity as the Pink City.'
      }
    ],
    cameraPresets: [
      { name: 'Three-Quarter Facade', pos: { x: 18, y: 12, z: 22 }, target: { x: 0, y: 6, z: 0 } },
      { name: 'Street Frontal View', pos: { x: 0, y: 7, z: 16 }, target: { x: 0, y: 7, z: 0 } },
      { name: 'Jharokha Close-up', pos: { x: 0, y: 8, z: 6 }, target: { x: 0, y: 8, z: 1 } },
      { name: 'Crown Summit Angle', pos: { x: 0, y: 15, z: 8 }, target: { x: 0, y: 14, z: 0 } },
      { name: 'Top Aerial View', pos: { x: 0, y: 28, z: 2 }, target: { x: 0, y: 6, z: 0 } }
    ],
    eras: [
      {
        year: 1799,
        label: '1799 CE',
        title: 'Sawai Pratap Singh Inauguration',
        badge: 'RAJPUT COURT SPLENDOR',
        badgeColor: 'border-amber-500/60 text-amber-300 bg-amber-950/60',
        summary: 'Architect Lal Chand Ustad completes the 953-jharokha cooling facade.',
        audioNarration: 'Year 1799 CE: Maharaja Sawai Pratap Singh dedicates the Hawa Mahal to Lord Krishna, creating one of the world’s most famous landmarks of passive desert architecture.'
      },
      {
        year: 2019,
        label: '2019 CE',
        title: 'Jaipur Pink City UNESCO Inscription',
        badge: 'WORLD HERITAGE INSCRIPTION',
        badgeColor: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/60',
        summary: 'Jaipur is designated a UNESCO World Heritage City, with Hawa Mahal as its primary visual identity.',
        audioNarration: 'Year 2019 CE: The historic walled city of Jaipur is inscribed as a UNESCO World Heritage Site, recognizing Hawa Mahal as an extraordinary masterpiece of Indian civic architecture.'
      }
    ]
  }
};

export function getMonumentModelConfig(siteId) {
  return MONUMENT_MODEL_REGISTRY[siteId] || null;
}
