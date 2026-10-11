/**
 * VIRASAT - 3D Heritage & Temporal Damage Datasets
 * 
 * Provides verified historical eras, Archaeological Survey of India (ASI) damage assessments,
 * architectural hotspot coordinates, and voice guide narration scripts for the primary monuments.
 * 
 * Monitored Monuments:
 * 1. Taj Mahal Complex (Agra, Uttar Pradesh)
 * 2. Qutub Minar Complex (Mehrauli, New Delhi)
 */

export const MONUMENTS_3D_DATA = {
  'site-006': {
    id: 'site-006',
    twinKey: 'taj_mahal',
    name: 'Taj Mahal Complex',
    hindiName: 'ताज महल परिसर',
    location: 'Agra, Uttar Pradesh',
    dynasty: 'Mughal Empire (Emperor Shah Jahan)',
    commissionedYear: 1632,
    completionYear: 1653,
    defaultCam: { x: 20, y: 14, z: 24 },
    defaultTarget: { x: 0, y: 4, z: 0 },
    audioIntro: 'Welcome to the Taj Mahal 3D Digital Twin. Built between 1632 and 1653 CE by Emperor Shah Jahan in memory of Mumtaz Mahal. You can explore its 360-degree architecture, drag the timeline slider to witness 370 years of weathering, pollution damage, and ASI restorations, and click any architectural hotspot to begin your private audio tour.',

    // Historical Eras with Government / ASI Damage & Conservation Records
    eras: [
      {
        year: 1653,
        label: '1653 CE',
        title: 'Original Pristine Construction',
        badge: 'PRISTINE MUGHAL ERA',
        badgeColor: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/60',
        summary: 'Pristine Makrana white marble, gleaming gold finial, clear water reflection pool, and flawless bilateral symmetry.',
        damageReport: 'Zero structural damage. Newly completed by chief architect Ustad Ahmad Lahori and 20,000 artisans. Inlaid with 43 types of precious and semi-precious stones including lapis lazuli from Badakhshan, turquoise from Tibet, and jade from China.',
        asiIntervention: 'Historical Mughal Court Archive (Badshahnama). Subterranean foundations engineered with deep timber wells (ebony and sal wood) resting in the moisture of the Yamuna riverbed.',
        marbleColor: '#FFFFFF',
        roughness: 0.18,
        metalness: 0.05,
        poolColor: '#0284c7',
        finialColor: '#F59E0B',
        discoloration: 'None (Pure White Crystalline)',
        minaretTiltDeg: 2.0,
        audioNarration: 'Year 1653 CE: The Taj Mahal is completed. Notice the immaculate white Makrana marble quarried from Rajasthan. Under sunlight, its crystalline structure creates a translucent glow. The central dome rises 35 meters, flanked by four minarets engineered with a deliberate two-degree outward tilt for earthquake safety.'
      },
      {
        year: 1857,
        label: '1857 CE',
        title: 'Colonial Neglect & Defacement',
        badge: 'STRUCTURAL NEGLECT & LOOTING',
        badgeColor: 'border-amber-500/60 text-amber-300 bg-amber-950/60',
        summary: 'Post-1857 Uprising garrison use. British troops chipped out Pietra Dura gemstones; gardens fell into disrepair.',
        damageReport: 'Imperial records document extensive chiseling and theft of carnelian, lapis lazuli, and agate stones from the interior cenotaph screens by British soldiers. Heavy moss and surface weathering on the lower sandstone terraces.',
        asiIntervention: '19th Century British Archaeological records. Lord Curzon later halted looting and initiated early preservation, replacing the original overgrown Mughal orchards with English lawns.',
        marbleColor: '#EBE2D3',
        roughness: 0.44,
        metalness: 0.02,
        poolColor: '#2D6A75',
        finialColor: '#C4983D',
        discoloration: 'Surface Patina & Gem Inlay Cavities',
        minaretTiltDeg: 2.0,
        audioNarration: 'Year 1857 CE: Following the Indian Uprising, the Taj Mahal complex was commandeered as a British military garrison. Soldiers vandalized the delicate Pietra Dura inlay walls, chiseling out lapis lazuli and jade gemstones. The gardens lost their original Mughal layout.'
      },
      {
        year: 1998,
        label: '1998 CE',
        title: 'Industrial Pollution & Acid Rain Peak',
        badge: 'PEAK SULFUR YELLOWING (TTZ REPORT)',
        badgeColor: 'border-red-500/60 text-red-300 bg-red-950/60',
        summary: 'Severe marble yellowing and acidic corrosion caused by sulfur dioxide emissions from the Mathura Refinery and Agra foundries.',
        damageReport: 'Government environmental audits revealed "Marble Cancer": sulfur dioxide and nitrous oxide reacted with rain to form sulfuric acid, converting calcium carbonate into calcium sulfate (gypsum) and resulting in yellowing, pitting, and black soot crusts.',
        asiIntervention: 'Supreme Court of India Landmark Ruling (M.C. Mehta vs Union of India, 1996). Mandated the 10,400 sq km Taj Trapezium Zone (TTZ), shutting down coal-based industries and banning polluting vehicles within a 500-meter perimeter.',
        marbleColor: '#D1BB88',
        roughness: 0.68,
        metalness: 0.0,
        poolColor: '#4A553E',
        finialColor: '#8C7438',
        discoloration: 'Severe Acidic Yellowing & Black Soot Crust',
        minaretTiltDeg: 2.05,
        audioNarration: 'Year 1998 CE: Environmental pollution reached a catastrophic peak. Smoke from the Mathura Oil Refinery and local factories combined with moisture, producing acid rain that corroded the marble facade in a phenomenon dubbed Marble Cancer. The Supreme Court of India intervened to create the Taj Trapezium Zone to halt industrial emissions.'
      },
      {
        year: 2026,
        label: '2026 CE',
        title: 'Modern ASI Conservation & Monitoring',
        badge: 'ACTIVE ASI RESTORATION & SENSORS',
        badgeColor: 'border-cyan-500/60 text-cyan-300 bg-cyan-950/60',
        summary: 'Fuller’s Earth (Multani Mitti) clay-pack treatment, real-time laser tilt monitoring, and riverbed moisture conservation.',
        damageReport: 'Marble whiteness successfully restored without chemical abrasion. Modern laser sensors continuously monitor the 2-degree outward tilt of the minarets to guard against tectonic displacement.',
        asiIntervention: 'Archaeological Survey of India (ASI) Agra Circle: Application of chemical-free Multani Mitti clay packs non-destructively absorbing greasy pollutants. Ground water recharge wells installed to ensure the timber well foundations under the plinth remain damp.',
        marbleColor: '#FBF8F2',
        roughness: 0.26,
        metalness: 0.04,
        poolColor: '#0284c7',
        finialColor: '#F59E0B',
        discoloration: 'Restored White (Under Periodic Mud-Pack)',
        minaretTiltDeg: 2.0,
        audioNarration: 'Year 2026 CE: Present-day preservation by the Archaeological Survey of India. Conservationists employ Multani Mitti clay-pack treatments, gently drawing out trapped pollutants from the porous marble without scratching the stone. Subterranean moisture levels are preserved to keep the deep timber well foundations solid.'
      }
    ],

    // Architectural Hotspots
    hotspots: [
      {
        id: 'dome',
        name: 'Main Onion Dome (Amrud)',
        badge: 'CENTRAL DOME',
        shortDesc: '35-meter tall central bulbous marble dome resting on a 7-meter drum base, flanked by 4 chhatris.',
        details: 'Constructed using a double-dome system. The inner dome creates a balanced interior chamber ceiling, while the bulbous outer dome creates the grand exterior profile. It is topped with an inverted lotus motif and brass finial.',
        camPos: { x: 0, y: 17, z: 15 },
        target: { x: 0, y: 13, z: 0 },
        audioNarration: 'You are now inspecting the central Onion Dome, known in Mughal architecture as the Amrud. It stands 35 meters tall. Notice the inverted lotus collar at its crown and the golden brass finial spire reaching towards the sky.'
      },
      {
        id: 'entrance',
        name: 'Grand Vaulted Arch (Pishtaq)',
        badge: 'MAIN ENTRANCE',
        shortDesc: '33-meter high vaulted portal framed with intricate black marble Quranic calligraphy.',
        details: 'Designed with optical illusion engineering: the Arabic calligraphy inscriptions were meticulously crafted to increase slightly in size as they ascend, ensuring they appear completely uniform when viewed by a person standing on the ground.',
        camPos: { x: 0, y: 7, z: 13 },
        target: { x: 0, y: 5, z: 0 },
        audioNarration: 'This is the Grand Pishtaq Archway. Standing 33 meters high, its border features Thuluth Arabic calligraphy inlaid with black marble into white stone. The master calligrapher Amanat Khan designed the lettering to expand slightly towards the top so it appears perfectly even from the ground.'
      },
      {
        id: 'minarets',
        name: '4 Corner Minarets (2° Outward Tilt)',
        badge: 'ENGINEERING MARVEL',
        shortDesc: 'Four 40-meter tall three-tiered minarets standing at the corners of the plinth.',
        details: 'Architect Ustad Ahmad Lahori deliberately constructed each minaret with a subtle 2-degree outward tilt. In the event of a catastrophic earthquake, the towers will collapse away from the central mausoleum, protecting the royal tomb.',
        camPos: { x: 19, y: 12, z: 19 },
        target: { x: 11, y: 7, z: -11 },
        audioNarration: 'Here are the four corner minarets, each standing 40 meters tall across three tiered balconies. Observe the deliberate two-degree outward lean. This was a brilliant earthquake safety innovation to guarantee that if a tower ever fell, it would fall outwards into the courtyard, leaving the central tomb unharmed.'
      },
      {
        id: 'plinth',
        name: 'Raised Marble Plinth & Wells',
        badge: 'FOUNDATION',
        shortDesc: '7-meter raised square marble terrace built over subterranean wooden well casings.',
        details: 'The massive platform rests upon a grid of ebony and sal wood wells filled with rubble and mortar. These woods require constant moisture from the Yamuna River to maintain their tensile strength and prevent rotting.',
        camPos: { x: 15, y: 5, z: 15 },
        target: { x: 0, y: 2, z: 0 },
        audioNarration: 'You are viewing the elevated marble terrace plinth, which lifts the monument 7 meters above the red sandstone ground. Beneath this platform lies an ancient deep-well foundation made of ebony and sal timber, sustained by the groundwater of the Yamuna riverbed.'
      },
      {
        id: 'pool',
        name: 'Charbagh Reflecting Pool',
        badge: 'WATER COURTYARD',
        shortDesc: 'Central lotus water pool reflecting the entire symmetrical facade.',
        details: 'Designed on the Persian Charbagh four-fold garden layout representing the four rivers of paradise. The water channel acts as an acoustic and thermal cooling system as well as providing mirror symmetry.',
        camPos: { x: 0, y: 9, z: 24 },
        target: { x: 0, y: 1, z: 12 },
        audioNarration: 'This is the iconic Charbagh reflecting pool. Aligned perfectly along the central axis, its still waters cast a breathtaking reflection of the mausoleum. It embodies the Persian concept of paradise gardens divided by streams.'
      }
    ],

    // Camera Preset Angles
    cameraPresets: [
      { name: 'Three-Quarter View', pos: { x: 20, y: 14, z: 24 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Front Facade View', pos: { x: 0, y: 7, z: 26 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Left Minaret View', pos: { x: -24, y: 8, z: 6 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Right Minaret View', pos: { x: 24, y: 8, z: 6 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Back Yamuna View', pos: { x: 0, y: 7, z: -26 }, target: { x: 0, y: 4, z: 0 } },
      { name: 'Top Aerial View', pos: { x: 0, y: 34, z: 2 }, target: { x: 0, y: 4, z: 0 } }
    ]
  },

  'site-007': {
    id: 'site-007',
    twinKey: 'qutub_minar',
    name: 'Qutub Minar Complex',
    hindiName: 'क़ुतुब मीनार परिसर',
    location: 'Mehrauli, New Delhi',
    dynasty: 'Delhi Sultanate (Mamluk & Tughlaq Dynasties)',
    commissionedYear: 1199,
    completionYear: 1368,
    defaultCam: { x: 18, y: 16, z: 22 },
    defaultTarget: { x: 0, y: 8, z: 0 },
    audioIntro: 'Welcome to the Qutub Minar 3D Digital Twin. Standing 72.5 meters tall in New Delhi, it is the tallest brick and stone minaret in the world. Drag the historical timeline slider to see how lightning strikes, earthquakes, and sultanate repairs transformed it from a 3-storey red sandstone tower in 1220 CE into its famous 5-storey marble-banded form.',

    // Historical Eras for Qutub Minar
    eras: [
      {
        year: 1220,
        label: '1220 CE',
        title: 'Sultanate Founding (3 Storeys)',
        badge: 'AIBAK & ILTUTMISH ERA',
        badgeColor: 'border-amber-500/60 text-amber-300 bg-amber-950/60',
        summary: 'Founded in 1199 CE by Qutb-ud-din Aibak; storeys 2 and 3 completed by Iltutmish. Pure red sandstone.',
        damageReport: 'Original 3-storey configuration reaching approximately 45 meters. Alternating angular and rounded flutes on the first storey, rounded on the second, angular on the third.',
        asiIntervention: 'Epigraphical Survey of India. Arabic and Nagari inscriptions record the titles of Sultan Shams-ud-din Iltutmish.',
        sandstoneColor: '#A83B25',
        marbleColor: '#A83B25', // No marble storeys yet
        storeysVisible: 3,
        hasSmithsCupolaOnTop: false,
        hasSmithsCupolaOnGround: false,
        tiltDeg: 0.0,
        audioNarration: 'Year 1220 CE: Sultan Qutb-ud-din Aibak founded the base in 1199, and his successor Iltutmish completed the first three storeys. Standing at 45 meters, the tower is built entirely of red and buff sandstone with intricately carved stalactite corbelled balconies.'
      },
      {
        year: 1368,
        label: '1368 CE',
        title: 'Lightning Strike & Marble Expansion',
        badge: 'TUGHLAQ MARBLE RECONSTRUCTION',
        badgeColor: 'border-emerald-500/60 text-emerald-300 bg-emerald-950/60',
        summary: 'Catastrophic lightning destroyed the upper storey. Sultan Firoz Shah Tughlaq rebuilt it and added two white marble storeys.',
        damageReport: 'ASI historical archives record: 1368 lightning bolt shattered the top sandstone storey. Firoz Shah Tughlaq repaired the damage and added storeys 4 and 5 faced with white Makrana marble, bringing the height to 72.5 meters.',
        asiIntervention: 'ASI Inscription records on the fifth storey commemorate Firoz Shah Tughlaq’s repair in 1368 CE, marking a transition in architectural material.',
        sandstoneColor: '#963420',
        marbleColor: '#EBE6DE',
        storeysVisible: 5,
        hasSmithsCupolaOnTop: false,
        hasSmithsCupolaOnGround: false,
        tiltDeg: 0.1,
        audioNarration: 'Year 1368 CE: Lightning struck the summit of the minar, shattering the topmost storey. Sultan Firoz Shah Tughlaq restored it and boldly added two new storeys faced with white Makrana marble, elevating the tower to its world-famous 72.5-meter height.'
      },
      {
        year: 1828,
        label: '1828 CE',
        title: '1803 Earthquake & Major Smith’s Cupola',
        badge: 'EARTHQUAKE DAMAGE & "SMITH’S FOLLY"',
        badgeColor: 'border-red-500/60 text-red-300 bg-red-950/60',
        summary: '1803 earthquake collapsed the upper cupola. British engineer Major Robert Smith installed an incongruous octagonal kiosk on top.',
        damageReport: 'Violent earthquake on 1 September 1803 damaged the parapet and shattered the summit kiosk. In 1828, Royal Engineer Major Robert Smith repaired the tower and erected an octagonal sandstone cupola on top, which was criticized as an architectural mismatch.',
        asiIntervention: 'Cunningham’s Archaeological Survey Report (1871). The British administration recorded public outcry regarding the cupola clashing with medieval Indo-Islamic fluting.',
        sandstoneColor: '#882E1C',
        marbleColor: '#DDD5C8',
        storeysVisible: 5,
        hasSmithsCupolaOnTop: true,
        hasSmithsCupolaOnGround: false,
        tiltDeg: 0.35,
        audioNarration: 'Year 1828 CE: Following a devastating earthquake in 1803, British engineer Major Robert Smith oversaw structural repairs. He installed an octagonal sandstone cupola atop the fifth storey. However, historians and visitors deemed it an awkward architectural mismatch with the medieval tower.'
      },
      {
        year: 1848,
        label: '1848 CE',
        title: 'Cupola Dismantled ("Smith’s Folly")',
        badge: 'HISTORIC SILHOUETTE RESTORED',
        badgeColor: 'border-indigo-500/60 text-indigo-300 bg-indigo-950/60',
        summary: 'Governor-General Lord Hardinge ordered Major Smith’s cupola removed to the gardens, restoring the original skyline.',
        damageReport: 'Major Smith’s cupola was carefully demounted from the summit and reassembled on the south lawn of the complex, where it became known as "Smith’s Folly".',
        asiIntervention: 'Archaeological Survey of India conservation record: Lord Hardinge minute of 1848. Top parapet secured with iron railings.',
        sandstoneColor: '#90311E',
        marbleColor: '#E2DBD0',
        storeysVisible: 5,
        hasSmithsCupolaOnTop: false,
        hasSmithsCupolaOnGround: true,
        tiltDeg: 0.45,
        audioNarration: 'Year 1848 CE: Governor-General Lord Hardinge ordered Major Smith’s cupola taken down to restore the authentic silhouette of the minar. The dismantled pavilion was re-erected in the outer gardens nearby, where it stands today as Smith’s Folly.'
      },
      {
        year: 2026,
        label: '2026 CE',
        title: 'Present Day ASI Laser Tilt Monitoring',
        badge: 'ACTIVE 65CM TILT MONITORING',
        badgeColor: 'border-cyan-500/60 text-cyan-300 bg-cyan-950/60',
        summary: 'Continuous laser monitoring of the 65-centimeter southwest tilt, ultrasonic crack assessment, and Iron Pillar preservation.',
        damageReport: 'The minaret currently has a documented 65-centimeter tilt towards the southwest (approx 0.65 degrees), caused by deep soft alluvium soil beneath Delhi Sultanate foundations. Periodic crack monitoring confirms no active structural failure.',
        asiIntervention: 'Archaeological Survey of India Delhi Circle: Ultrasonic non-destructive pulse velocity testing, lightning conductor installation, and conservation of the adjacent 1,600-year-old rustless Iron Pillar of Delhi.',
        sandstoneColor: '#993D2A',
        marbleColor: '#F0ECE4',
        storeysVisible: 5,
        hasSmithsCupolaOnTop: false,
        hasSmithsCupolaOnGround: true,
        tiltDeg: 0.65,
        audioNarration: 'Year 2026 CE: Present-day preservation by the Archaeological Survey of India. The minaret leans 65 centimeters towards the southwest, monitored 24/7 by laser inclinometers and seismic sensors. Nearby in the courtyard stands the famous Gupta-era Iron Pillar, renowned for ancient rust-resistant metallurgy.'
      }
    ],

    // Architectural Hotspots for Qutub Minar
    hotspots: [
      {
        id: 'fluted_base',
        name: 'Fluted Red Sandstone Base (Storey 1)',
        badge: 'AIBEK STOREY',
        shortDesc: '29-meter base storey with alternating angular and semicircular red sandstone flutings.',
        details: 'Constructed by Qutb-ud-din Aibak in 1199 CE. Features intricate bands of intertwined floral arabesques and Quranic calligraphic friezes carved deeply into red sandstone.',
        camPos: { x: 0, y: 7, z: 14 },
        target: { x: 0, y: 5, z: 0 },
        audioNarration: 'You are viewing the lowest storey, built in 1199 CE by Qutb-ud-din Aibak. Notice the rhythmic alternation of angular and rounded vertical fluting, overlaid with intricate Quranic calligraphy bands.'
      },
      {
        id: 'marble_storeys',
        name: 'Tughlaq White Marble Storeys (4 & 5)',
        badge: 'WHITE MARBLE',
        shortDesc: 'Upper two storeys rebuilt in 1368 CE with white Makrana marble and red sandstone.',
        details: 'Following lightning damage in 1368 CE, Sultan Firoz Shah Tughlaq added these storeys. The stark contrast between the bright white marble and red sandstone provides the minar with its signature visual identity.',
        camPos: { x: 0, y: 19, z: 12 },
        target: { x: 0, y: 17, z: 0 },
        audioNarration: 'Look closely at the upper two storeys. These were built in 1368 CE by Sultan Firoz Shah Tughlaq after lightning wrecked the original top. He introduced white Makrana marble panels that stand out sharply against the red sandstone.'
      },
      {
        id: 'balconies',
        name: 'Stalactite Corbelled Balconies',
        badge: 'CORBELLED ARCHES',
        shortDesc: 'Projecting stone balconies supported by clusters of mini-arches and stalactite corbels.',
        details: 'Each storey is demarcated by a cantilevered balcony supported by intricate clusters of miniature cusped arches and stalactite corbels (Muqarnas), demonstrating master stone masonry.',
        camPos: { x: 6, y: 12, z: 10 },
        target: { x: 0, y: 11, z: 0 },
        audioNarration: 'These projecting balconies encircle each storey, held up by elaborate stalactite stone corbels known as muqarnas. They allowed the muezzin to call worshippers to prayer across ancient Delhi.'
      },
      {
        id: 'iron_pillar',
        name: 'Rust-Resistant Iron Pillar of Delhi',
        badge: '1600-YR METALLURGY',
        shortDesc: '7.2-meter wrought iron pillar erected in the 4th Century CE by King Chandragupta II (Vikramaditya).',
        details: 'Celebrated worldwide for ancient Indian metallurgical mastery: despite 1,600 years of open-air exposure to Delhi monsoon rains and summer heat, it has completely resisted rust due to a protective crystalline iron hydrogen phosphate layer (misawite).',
        camPos: { x: 9, y: 4, z: 7 },
        target: { x: 7, y: 3, z: 5 },
        audioNarration: 'Standing in the courtyard is the world-renowned Iron Pillar of Delhi, forged during the Gupta Empire in the 4th century CE. Weighing over six tonnes, it has withstood Delhi monsoon and heat for over 1,600 years without rusting, a testament to ancient Indian metallurgy.'
      },
      {
        id: 'smiths_folly',
        name: 'Smith’s Folly (Displaced 1828 Cupola)',
        badge: 'COLONIAL RELIC',
        shortDesc: 'Octagonal sandstone cupola installed on the summit in 1828 and moved to the garden in 1848.',
        details: 'Built by British Royal Engineer Major Robert Smith to replace the earthquake-damaged summit. After being criticized as an aesthetic blunder, Lord Hardinge had it demounted and placed on the southeast lawn.',
        camPos: { x: -10, y: 4, z: 9 },
        target: { x: -8, y: 2, z: 6 },
        audioNarration: 'Over on the lawn stands Smith’s Folly. In 1828, British engineer Major Robert Smith placed this cupola atop the Qutub Minar. After being criticized for spoiling the medieval skyline, it was taken down in 1848 and placed in the gardens.'
      }
    ],

    // Camera Preset Angles for Qutub Minar
    cameraPresets: [
      { name: 'Full Tower View', pos: { x: 18, y: 16, z: 22 }, target: { x: 0, y: 8, z: 0 } },
      { name: 'Ground Perspective', pos: { x: 0, y: 3, z: 18 }, target: { x: 0, y: 10, z: 0 } },
      { name: 'Marble Top View', pos: { x: 0, y: 20, z: 15 }, target: { x: 0, y: 16, z: 0 } },
      { name: 'Courtyard & Iron Pillar', pos: { x: 14, y: 6, z: 12 }, target: { x: 5, y: 3, z: 4 } },
      { name: 'Southwest Tilt Angle', pos: { x: -18, y: 12, z: -16 }, target: { x: 0, y: 8, z: 0 } },
      { name: 'Top Bird’s Eye', pos: { x: 0, y: 28, z: 2 }, target: { x: 0, y: 8, z: 0 } }
    ]
  }
};
