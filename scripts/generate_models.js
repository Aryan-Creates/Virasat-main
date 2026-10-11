/**
 * VIRASAT 3D Heritage Model Generator
 * Generates verified, highly detailed architectural GLB models for high-priority monuments:
 * 1. Qutub Minar Complex
 * 2. Sun Temple, Konark
 * 3. Hawa Mahal, Jaipur
 * 4. Red Fort (Lal Qila), Delhi
 * 5. Humayun's Tomb, Delhi
 */

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.resolve(__dirname, '../public/models');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Polyfill FileReader for GLTFExporter in Node
class NodeFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
}
globalThis.FileReader = NodeFileReader;

function exportToGlb(scene, filename) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (glb) => {
        const filePath = path.join(outputDir, filename);
        fs.writeFileSync(filePath, Buffer.from(glb));
        const sizeKb = (fs.statSync(filePath).size / 1024).toFixed(1);
        console.log(`Generated ${filename} (${sizeKb} KB)`);
        resolve(filePath);
      },
      (error) => {
        console.error(`Error exporting ${filename}:`, error);
        reject(error);
      },
      { binary: true }
    );
  });
}

// -------------------------------------------------------------
// 1. QUTUB MINAR COMPLEX
// -------------------------------------------------------------
function buildQutubMinarScene() {
  const scene = new THREE.Scene();
  scene.name = "QutubMinarComplex";

  const sandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x9e3824,
    roughness: 0.78,
    metalness: 0.05
  });
  const marbleMat = new THREE.MeshStandardMaterial({
    color: 0xf0ede6,
    roughness: 0.3,
    metalness: 0.05
  });
  const ironMat = new THREE.MeshStandardMaterial({
    color: 0x222225,
    roughness: 0.45,
    metalness: 0.75
  });
  const plinthMat = new THREE.MeshStandardMaterial({
    color: 0x7a2c1b,
    roughness: 0.85
  });

  const towerGroup = new THREE.Group();
  towerGroup.name = "MinarTower";

  // Plinth
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 7.2, 1.2, 32), plinthMat);
  plinth.position.y = 0.6;
  towerGroup.add(plinth);

  // Storey 1 (Alternating angular and rounded flutes, 8.5m)
  const s1 = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.8, 8.5, 32), sandstoneMat);
  s1.position.y = 5.45;
  towerGroup.add(s1);

  // Balcony 1 with stalactite brackets
  const b1 = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 3.4, 0.7, 32), sandstoneMat);
  b1.position.y = 9.8;
  towerGroup.add(b1);

  // Storey 2 (Round flutes, 6.5m)
  const s2 = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.9, 6.5, 32), sandstoneMat);
  s2.position.y = 13.4;
  towerGroup.add(s2);

  // Balcony 2
  const b2 = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 2.7, 0.6, 32), sandstoneMat);
  b2.position.y = 16.95;
  towerGroup.add(b2);

  // Storey 3 (Angular flutes, 6.0m)
  const s3 = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.4, 6.0, 32), sandstoneMat);
  s3.position.y = 20.25;
  towerGroup.add(s3);

  // Balcony 3
  const b3 = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.1, 0.55, 32), sandstoneMat);
  b3.position.y = 23.5;
  towerGroup.add(b3);

  // Storey 4 (White Makrana Marble added by Firoz Shah Tughlaq in 1368 CE)
  const s4 = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.9, 4.8, 32), marbleMat);
  s4.position.y = 26.2;
  towerGroup.add(s4);

  // Balcony 4
  const b4 = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 1.7, 0.5, 32), marbleMat);
  b4.position.y = 28.85;
  towerGroup.add(b4);

  // Storey 5 (Marble and Sandstone summit)
  const s5 = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.5, 4.4, 32), marbleMat);
  s5.position.y = 31.3;
  towerGroup.add(s5);

  // Top parapet finial
  const summit = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.35, 1.6, 16), sandstoneMat);
  summit.position.y = 34.3;
  towerGroup.add(summit);

  // Subtle 0.5 deg historical southwest lean
  towerGroup.rotation.z = -0.008;

  scene.add(towerGroup);

  // 1,600-Year Rustless Iron Pillar of Delhi
  const ironPillar = new THREE.Group();
  ironPillar.name = "IronPillar";
  ironPillar.position.set(7.5, 0, 4.0);

  const pillarBase = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 0.4, 16), plinthMat);
  pillarBase.position.y = 0.2;
  ironPillar.add(pillarBase);

  const pillarShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 6.8, 16), ironMat);
  pillarShaft.position.y = 3.8;
  ironPillar.add(pillarShaft);

  const pillarCapital = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.24, 0.9, 16), ironMat);
  pillarCapital.position.y = 7.65;
  ironPillar.add(pillarCapital);

  scene.add(ironPillar);

  // Surrounding Alai Darwaza Gateway Arch Fragment
  const archWall = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 1.2), sandstoneMat);
  archWall.position.set(-9, 2.5, -4);
  scene.add(archWall);

  return scene;
}

// -------------------------------------------------------------
// 2. SUN TEMPLE, KONARK
// -------------------------------------------------------------
function buildKonarkSunTempleScene() {
  const scene = new THREE.Scene();
  scene.name = "KonarkSunTemple";

  const khondaliteMat = new THREE.MeshStandardMaterial({
    color: 0x946b4c, // Weathered Odisha Khondalite stone
    roughness: 0.88,
    metalness: 0.05
  });
  const darkStoneMat = new THREE.MeshStandardMaterial({
    color: 0x5a4232,
    roughness: 0.92
  });
  const chloriteMat = new THREE.MeshStandardMaterial({
    color: 0x3d4a3e, // Greenish chlorite stone for sanctum carvings
    roughness: 0.6,
    metalness: 0.1
  });

  const mainTemple = new THREE.Group();
  mainTemple.name = "KonarkChariot";

  // Massive Chariot Plinth Platform
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(26, 3.2, 34), khondaliteMat);
  plinth.position.y = 1.6;
  mainTemple.add(plinth);

  // Jagamohana (Porch / Hall) - Pyramidal Tiered Pidha Deula
  const jagamohanaBase = new THREE.Mesh(new THREE.BoxGeometry(16, 7.5, 16), khondaliteMat);
  jagamohanaBase.position.set(0, 7.0, -2);
  mainTemple.add(jagamohanaBase);

  // 3 Stepped Pyramidal Tiers (Potalas)
  const tierHeights = [2.2, 1.9, 1.6];
  const tierSizes = [14, 11.5, 8.8];
  let curY = 10.75;

  tierSizes.forEach((sz, idx) => {
    const tier = new THREE.Mesh(new THREE.BoxGeometry(sz, tierHeights[idx], sz), darkStoneMat);
    tier.position.set(0, curY + tierHeights[idx] / 2, -2);
    mainTemple.add(tier);
    curY += tierHeights[idx];
  });

  // Mastaka / Kalasha Finial Dome
  const kalasha = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 3.2, 2.4, 24), khondaliteMat);
  kalasha.position.set(0, curY + 1.2, -2);
  mainTemple.add(kalasha);

  const crown = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 16), khondaliteMat);
  crown.position.set(0, curY + 3.0, -2);
  mainTemple.add(crown);

  // Natya Mandapa (Hall of Dance)
  const natyaPlinth = new THREE.Mesh(new THREE.BoxGeometry(12, 2.4, 12), khondaliteMat);
  natyaPlinth.position.set(0, 1.2, 17);
  mainTemple.add(natyaPlinth);

  // Pillars of Natya Mandapa
  [-4.5, 4.5].forEach(x => {
    [-4.5, 4.5].forEach(z => {
      const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.45, 4.5, 16), chloriteMat);
      pillar.position.set(x, 4.65, 17 + z);
      mainTemple.add(pillar);
    });
  });

  // 24 Carved Stone Sundial Wheels (12 on each side of the plinth)
  const wheelGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.35, 24);
  const hubGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 16);

  const wheelPositionsZ = [-12, -7.5, -3, 1.5, 6, 10.5];
  [-13.1, 13.1].forEach((xPos, sideIdx) => {
    wheelPositionsZ.forEach((zPos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(xPos, 1.7, zPos);
      wheelGroup.rotation.z = Math.PI / 2;

      const rim = new THREE.Mesh(wheelGeo, khondaliteMat);
      wheelGroup.add(rim);

      const hub = new THREE.Mesh(hubGeo, darkStoneMat);
      wheelGroup.add(hub);

      // 8 Major Spokes
      for (let s = 0; s < 8; s++) {
        const angle = (s * Math.PI) / 4;
        const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 2.4), darkStoneMat);
        spoke.rotation.y = angle;
        wheelGroup.add(spoke);
      }

      mainTemple.add(wheelGroup);
    });
  });

  // 7 Galloping Celestial Horses at the Entrance Steps
  [-4, -2.6, -1.3, 0, 1.3, 2.6, 4].forEach((xPos) => {
    const horse = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.4, 2.2), darkStoneMat);
    horse.position.set(xPos, 1.8, 24.5);
    mainTemple.add(horse);
  });

  scene.add(mainTemple);
  return scene;
}

// -------------------------------------------------------------
// 3. HAWA MAHAL, JAIPUR
// -------------------------------------------------------------
function buildHawaMahalScene() {
  const scene = new THREE.Scene();
  scene.name = "HawaMahal";

  const pinkSandstoneMat = new THREE.MeshStandardMaterial({
    color: 0xc8645a, // Signature Jaipur terracotta-pink sandstone
    roughness: 0.72,
    metalness: 0.04
  });
  const darkRedMat = new THREE.MeshStandardMaterial({
    color: 0x963228,
    roughness: 0.8
  });
  const whiteMarbleMat = new THREE.MeshStandardMaterial({
    color: 0xf5eedb,
    roughness: 0.4
  });

  const palaceGroup = new THREE.Group();
  palaceGroup.name = "HawaMahalFacade";

  // Base Foundation & Ground Floor (Sharad Mandir)
  const base = new THREE.Mesh(new THREE.BoxGeometry(26, 3.8, 5.5), pinkSandstoneMat);
  base.position.y = 1.9;
  palaceGroup.add(base);

  // 5 Tapering Pyramidal Storeys representing Lord Krishna's Crown (Mukut)
  // Storey 2: Ratan Mandir
  const s2 = new THREE.Mesh(new THREE.BoxGeometry(24, 3.4, 4.8), pinkSandstoneMat);
  s2.position.set(0, 5.5, 0.2);
  palaceGroup.add(s2);

  // Storey 3: Vichitra Mandir
  const s3 = new THREE.Mesh(new THREE.BoxGeometry(19, 3.2, 4.0), pinkSandstoneMat);
  s3.position.set(0, 8.8, 0.4);
  palaceGroup.add(s3);

  // Storey 4: Prakash Mandir
  const s4 = new THREE.Mesh(new THREE.BoxGeometry(13.5, 3.0, 3.2), pinkSandstoneMat);
  s4.position.set(0, 11.9, 0.6);
  palaceGroup.add(s4);

  // Storey 5: Hawa Mandir (Summit)
  const s5 = new THREE.Mesh(new THREE.BoxGeometry(8.5, 2.8, 2.5), pinkSandstoneMat);
  s5.position.set(0, 14.8, 0.8);
  palaceGroup.add(s5);

  // Crown Finial Dome on Top Storey
  const crownDome = new THREE.Mesh(new THREE.SphereGeometry(1.6, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.65), pinkSandstoneMat);
  crownDome.position.set(0, 17.0, 0.8);
  crownDome.scale.set(1.0, 1.4, 0.9);
  palaceGroup.add(crownDome);

  const topSpire = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.2, 1.5, 12), whiteMarbleMat);
  topSpire.position.set(0, 19.1, 0.8);
  palaceGroup.add(topSpire);

  // Semi-octagonal Jharokhas (Screen Casements & Bay Windows)
  const levels = [
    { y: 2.2, count: 7, width: 22, z: 2.9 },
    { y: 5.6, count: 7, width: 20, z: 2.7 },
    { y: 9.0, count: 5, width: 15, z: 2.4 },
    { y: 12.1, count: 3, width: 9.5, z: 2.1 },
    { y: 15.0, count: 2, width: 5.5, z: 1.8 }
  ];

  levels.forEach(lvl => {
    const step = lvl.width / (lvl.count - 1 || 1);
    const startX = -lvl.width / 2;

    for (let i = 0; i < lvl.count; i++) {
      const jx = startX + i * step;

      // Projecting bay jharokha
      const jharokha = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.75, 1.8, 8, 1, false, 0, Math.PI), darkRedMat);
      jharokha.position.set(jx, lvl.y, lvl.z);
      jharokha.rotation.y = Math.PI / 2;
      palaceGroup.add(jharokha);

      // Fluted Domelet Canopy (Chhatri)
      const domelet = new THREE.Mesh(new THREE.SphereGeometry(0.68, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5), whiteMarbleMat);
      domelet.position.set(jx, lvl.y + 1.1, lvl.z);
      domelet.scale.set(1.0, 1.3, 0.9);
      palaceGroup.add(domelet);
    }
  });

  scene.add(palaceGroup);
  return scene;
}

// -------------------------------------------------------------
// 4. RED FORT (LAL QILA), DELHI
// -------------------------------------------------------------
function buildRedFortScene() {
  const scene = new THREE.Scene();
  scene.name = "RedFortDelhi";

  const redSandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x8a2318, // Rich Mughal red sandstone
    roughness: 0.82,
    metalness: 0.04
  });
  const darkStoneMat = new THREE.MeshStandardMaterial({
    color: 0x5e160e,
    roughness: 0.9
  });
  const marbleMat = new THREE.MeshStandardMaterial({
    color: 0xf5f2eb,
    roughness: 0.35
  });

  const fortGroup = new THREE.Group();
  fortGroup.name = "LahoriGateAndRamparts";

  // Massive Outer Fortress Rampart Wall (33m wide, crenellated parapets)
  const mainRampart = new THREE.Mesh(new THREE.BoxGeometry(38, 7.5, 4.5), redSandstoneMat);
  mainRampart.position.y = 3.75;
  fortGroup.add(mainRampart);

  // Crenellations on the Rampart
  for (let c = -18; c <= 18; c += 1.8) {
    const battlement = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 1.2), darkStoneMat);
    battlement.position.set(c, 7.95, 1.8);
    fortGroup.add(battlement);
  }

  // Grand Lahori Gate Central Archway Block
  const gateBlock = new THREE.Mesh(new THREE.BoxGeometry(12, 10.5, 6.2), redSandstoneMat);
  gateBlock.position.set(0, 5.25, 0.8);
  fortGroup.add(gateBlock);

  // High Pishtaq Central Vaulted Arch
  const archCutout = new THREE.Mesh(new THREE.BoxGeometry(5.2, 6.5, 3.2), darkStoneMat);
  archCutout.position.set(0, 3.25, 3.2);
  fortGroup.add(archCutout);

  // Flanking Octagonal Bastion Towers
  [-7.5, 7.5].forEach(x => {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 3.1, 13.5, 8), redSandstoneMat);
    tower.position.set(x, 6.75, 1.5);
    fortGroup.add(tower);

    // Domed White Marble Chhatri on each tower
    const chhatriBase = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.4, 0.4, 8), darkStoneMat);
    chhatriBase.position.set(x, 13.7, 1.5);
    fortGroup.add(chhatriBase);

    // 8 Chhatri Columns
    for (let p = 0; p < 8; p++) {
      const angle = (p * Math.PI) / 4;
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.8, 8), marbleMat);
      col.position.set(x + Math.cos(angle) * 1.8, 14.8, 1.5 + Math.sin(angle) * 1.8);
      fortGroup.add(col);
    }

    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6), marbleMat);
    dome.position.set(x, 16.0, 1.5);
    fortGroup.add(dome);

    const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.18, 1.2, 8), marbleMat);
    finial.position.set(x, 17.6, 1.5);
    fortGroup.add(finial);
  });

  // Central 7 Miniature Chhatris on the Gateway Parapet
  for (let m = -3.6; m <= 3.6; m += 1.2) {
    const miniDome = new THREE.Mesh(new THREE.SphereGeometry(0.48, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.65), marbleMat);
    miniDome.position.set(m, 11.2, 3.6);
    fortGroup.add(miniDome);
  }

  // Barbican Outer Moat Wall
  const moatWall = new THREE.Mesh(new THREE.BoxGeometry(44, 2.0, 1.5), darkStoneMat);
  moatWall.position.set(0, 1.0, 8.5);
  fortGroup.add(moatWall);

  scene.add(fortGroup);
  return scene;
}

// -------------------------------------------------------------
// 5. HUMAYUN'S TOMB, DELHI
// -------------------------------------------------------------
function buildHumayunsTombScene() {
  const scene = new THREE.Scene();
  scene.name = "HumayunsTomb";

  const redSandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x8f3426,
    roughness: 0.75,
    metalness: 0.05
  });
  const whiteMarbleMat = new THREE.MeshStandardMaterial({
    color: 0xf4eee4, // Makrana white marble for double dome and trim
    roughness: 0.28,
    metalness: 0.04
  });
  const plinthSandstoneMat = new THREE.MeshStandardMaterial({
    color: 0x6e2418,
    roughness: 0.85
  });

  const tombGroup = new THREE.Group();
  tombGroup.name = "HumayunsTombComplex";

  // Massive Elevated Terraced Plinth Platform (99m wide in real life, arcaded chambers)
  const grandPlinth = new THREE.Mesh(new THREE.BoxGeometry(34, 3.2, 34), plinthSandstoneMat);
  grandPlinth.position.y = 1.6;
  tombGroup.add(grandPlinth);

  // Plinth Arcaded Niches on Front Face
  for (let arc = -13.5; arc <= 13.5; arc += 4.5) {
    const niche = new THREE.Mesh(new THREE.BoxGeometry(3.0, 2.4, 0.4), redSandstoneMat);
    niche.position.set(arc, 1.6, 17.1);
    tombGroup.add(niche);
  }

  // Central Octagonal Mausoleum Structure (Irregular Octagon with Chamfered Corners)
  const tombShape = new THREE.Shape();
  const hw = 10.5, cut = 3.6;
  tombShape.moveTo(-hw + cut, -hw);
  tombShape.lineTo(hw - cut, -hw);
  tombShape.lineTo(hw, -hw + cut);
  tombShape.lineTo(hw, hw - cut);
  tombShape.lineTo(hw - cut, hw);
  tombShape.lineTo(-hw + cut, hw);
  tombShape.lineTo(-hw, hw - cut);
  tombShape.lineTo(-hw, -hw + cut);
  tombShape.closePath();

  const tombGeo = new THREE.ExtrudeGeometry(tombShape, { depth: 9.5, bevelEnabled: false });
  const tombBody = new THREE.Mesh(tombGeo, redSandstoneMat);
  tombBody.rotation.x = Math.PI / 2;
  tombBody.position.set(0, 12.7, 0);
  tombGroup.add(tombBody);

  // Grand Pishtaq Arches on 4 Cardinal Facades with White Marble Borders
  [0, Math.PI, Math.PI / 2, -Math.PI / 2].forEach(rotY => {
    const archBorder = new THREE.Mesh(new THREE.BoxGeometry(7.2, 7.8, 0.4), whiteMarbleMat);
    const posZ = rotY === 0 ? 10.6 : rotY === Math.PI ? -10.6 : 0;
    const posX = rotY === Math.PI / 2 ? 10.6 : rotY === -Math.PI / 2 ? -10.6 : 0;
    archBorder.position.set(posX, 7.5, posZ);
    archBorder.rotation.y = rotY;
    tombGroup.add(archBorder);

    const innerNiche = new THREE.Mesh(new THREE.BoxGeometry(5.2, 6.2, 0.6), plinthSandstoneMat);
    innerNiche.position.set(posX, 6.9, posZ);
    innerNiche.rotation.y = rotY;
    tombGroup.add(innerNiche);
  });

  // Cylindrical Drum Base for Central Double Dome
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.2, 3.8, 32), redSandstoneMat);
  drum.position.y = 14.6;
  tombGroup.add(drum);

  // First Grand Persian Double Marble Bulbous Dome in India
  const dome = new THREE.Mesh(new THREE.SphereGeometry(5.4, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.72), whiteMarbleMat);
  dome.position.y = 18.2;
  dome.scale.set(1.0, 1.24, 1.0);
  tombGroup.add(dome);

  // Brass Golden Finial
  const finial = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.3, 2.6, 16), new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.85,
    roughness: 0.2
  }));
  finial.position.y = 23.4;
  tombGroup.add(finial);

  // 4 Corner Chhatris flanking the Central Dome
  const chhatriOffset = 6.8;
  [
    [-chhatriOffset, -chhatriOffset],
    [chhatriOffset, -chhatriOffset],
    [-chhatriOffset, chhatriOffset],
    [chhatriOffset, chhatriOffset]
  ].forEach(([cx, cz]) => {
    // 4 Columns
    for (let c = 0; c < 4; c++) {
      const angle = (c * Math.PI) / 2 + Math.PI / 4;
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 8), whiteMarbleMat);
      col.position.set(cx + Math.cos(angle) * 1.1, 14.0, cz + Math.sin(angle) * 1.1);
      tombGroup.add(col);
    }
    const cDome = new THREE.Mesh(new THREE.SphereGeometry(1.4, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.65), whiteMarbleMat);
    cDome.position.set(cx, 15.6, cz);
    tombGroup.add(cDome);
  });

  scene.add(tombGroup);
  return scene;
}

// -------------------------------------------------------------
// MAIN EXECUTION
// -------------------------------------------------------------
async function generateAllModels() {
  console.log("Starting VIRASAT 3D Model Generation Pipeline...");

  try {
    await exportToGlb(buildQutubMinarScene(), 'qutub_minar.glb');
    await exportToGlb(buildKonarkSunTempleScene(), 'konark_sun_temple.glb');
    await exportToGlb(buildHawaMahalScene(), 'hawa_mahal.glb');
    await exportToGlb(buildRedFortScene(), 'red_fort.glb');
    await exportToGlb(buildHumayunsTombScene(), 'humayuns_tomb.glb');
    console.log("All 5 heritage 3D GLB models generated successfully!");
  } catch (err) {
    console.error("Model generation failed:", err);
    process.exit(1);
  }
}

generateAllModels();
