# VIRASAT — Project Context for Antigravity Pro

Use this document as the persistent project brief before making any code changes. The repository itself is the source of truth for implementation details. Inspect the relevant files before editing; do not assume every described feature is complete or connected.

## 1. Project identity and purpose

**VIRASAT** is a React-based Indian heritage and cultural-tourism web application. Its central visitor-facing idea is to reduce dependence on a human tourist guide by letting visitors explore monuments through interactive 3D models, guided narration, architectural points of interest, and contextual information. It also aims to act as a broader digital heritage archive for historical facts, ancient scripts, folk traditions, endangered languages, festivals, and cultural relationships.

The intended visitor journey:
1. Open the immersive Virasat landing screen.
2. Browse a directory/dashboard of Indian monuments.
3. Select a monument and explore its 3D representation by rotating, zooming, and changing viewpoints.
4. Select architectural hotspots to understand features and listen to narrated explanations.
5. Learn the monument's history, era, dynasty, location, architectural style, and conservation context.
6. In the broader vision, explore language, local traditions, festivals, maps/crowd information, and connected cultural knowledge.

**Important scope distinction:** The repository currently contains a large collection of heritage-themed UI components and mock data, but the main `App.jsx` only wires up the landing screen, dashboard, 3D viewer, monument directory, add-monument form, and about page. Several other feature components exist but are not connected to the main navigation. Do not tell the user that every feature is production-ready.

## 2. Stack and run commands

- Frontend: React 18, Vite 5, JavaScript/JSX.
- 3D: Three.js, `GLTFLoader`, `OrbitControls`; one local `.glb` asset is included.
- Icons: `lucide-react`.
- Styling: Tailwind utility classes plus custom CSS in `src/index.css`.
- Optional backend file: `server.js`, intended to be an Express REST API.
- Data: static in-repository JavaScript arrays/objects; the current main frontend uses mock data rather than fetching from the backend.
- Build scripts in `package.json`: `npm run dev`, `npm run build`, `npm run preview`.
- Vite development server configured for host access on port `5173`.
- `index.html` loads Google Fonts and the Google-hosted `<model-viewer>` web component, although the current Three.js viewer uses Three.js directly.

Run frontend from the project root:
```bash
npm install
npm run dev
```
Build check:
```bash
npm run build
```
The root `package.json` does not define a backend start script and does not list Express as a dependency. Do not assume `server.js` is currently runnable without fixing the backend setup.

## 3. Application entry and primary navigation

### `src/main.jsx`
Creates the React root, renders `<App />` inside `React.StrictMode`, and imports `src/index.css`.

### `src/App.jsx`
The application shell and current source of navigation state. It:
- Starts by rendering `OpeningScreen`.
- Maintains `activeTab`, `selectedSite`, and `sitesList` with React state.
- Uses `HERITAGE_SITES` from `src/data/mockData.js` as initial monument data.
- Provides handlers to add a monument to frontend state and to select a site then navigate to the 3D viewer.
- Once the opening screen is dismissed, renders `Header`, `Navigation`, and one of:
  - `Dashboard` (`dashboard`)
  - `ModelViewer3D` (`3dtwins`)
  - `MonumentsList` (`monuments`)
  - `AddMonumentForm` (`add`)
  - `AboutProject` (`about`)
- Shows a footer identifying the app as the Virasat Indian Heritage Platform.

Current integration notes:
- `Dashboard` is passed `onSelectSite`, but its declared props currently only include `setActiveTab` and `sitesList`; verify/fix this if dashboard cards are meant to open a selected monument directly.
- The `Header` component supports an `onSelectSite` prop, but `App.jsx` does not currently pass it.
- `App.jsx` currently adds submitted monuments to in-memory React state only; it does not call the Express backend or persist data after refresh.
- Avoid changing the app's navigation/state model unnecessarily when implementing a feature. Preserve working flows.

### `src/components/OpeningScreen.jsx`
Immersive first screen / landing experience. Receives `onEnter` and `onSelectFeature` callbacks. It presents the Virasat brand and feature entry points. Feature navigation depends on the tab names understood by `App.jsx`; do not route to a tab that the app does not render unless you add that route as part of the requested change.

### `src/components/Header.jsx`
Top header with brand, search-related UI, home/start-screen navigation, and monument data references. Receives `activeTab`, `setActiveTab`, `onOpenStartScreen`, and optionally `onSelectSite`. Check actual callback wiring before assuming a search result changes the selected monument.

### `src/components/Navigation.jsx`
Main tab bar. Current primary tab vocabulary is `dashboard`, `3dtwins`, `monuments`, `add`, and `about`. Keep labels, tab IDs, and `App.jsx` conditional rendering consistent.

### `src/components/Dashboard.jsx`
Home dashboard with welcome area, shortcuts, and featured monument cards. Reads `HERITAGE_SITES` and/or `sitesList` to display site data. Inspect the actual card click handlers when editing; its current signature does not accept the `onSelectSite` prop passed by `App.jsx`, so selected-monument navigation may need to be wired.

### `src/components/ModelViewer3D.jsx`
Thin wrapper around `DigitalTwinViewer`; passes through `selectedSite` and `onSelectSite`. The substantial Three.js implementation lives in `DigitalTwinViewer.jsx`.

### `src/components/MonumentsList.jsx`
Monument directory. Supports search/filtering, site cards, and a detail modal; accepts `sitesList` and `onSelectSite`. It can fall back to `HERITAGE_SITES`. Check that selecting a site calls the callback and that newly added sites are handled safely.

### `src/components/AddMonumentForm.jsx`
Controlled form for a crowdsourced/new monument entry. Collects fields such as name, state, location, dynasty, era, image URL, and description; validates required fields and creates a monument-shaped object. Calls `onAddMonument`, which currently updates `App.jsx` local state only. It does not currently upload a 3D model or persist the entry to a database.

### `src/components/AboutProject.jsx`
Project overview and viva/preparation content. Describes the mission, stack, backend concept, and likely Q&A. Keep documentation claims aligned with what is actually implemented.

## 4. 3D digital twin / virtual tourist guide

### `src/components/DigitalTwinViewer.jsx`
The most substantial component (roughly 57 KB). It creates a Three.js scene and manages rendering, model loading, camera/controls, monument-specific configuration, timeline/conservation views, hotspots, narration, and interface state.

Main implementation concepts visible in the file:
- Uses `THREE`, `OrbitControls`, and `GLTFLoader`.
- Uses React refs for the scene, renderer, camera, controls, canvas container, loaded model, and related Three.js objects.
- Reads monument metadata from `HERITAGE_SITES` and specialized configuration from `MONUMENTS_3D_DATA`.
- Has a selected monument, model-source/rendering mode, loading progress, historical era/timeline selection, hotspot selection, camera presets, audio narration/speech rate, custom GLB upload, and an AR information modal.
- Uses the browser Web Speech API for client-side text-to-speech/narration where supported.
- Provides controls and narrative for architecture/hotspots, camera presets, and a historical/conservation timeline.
- Has custom-model upload handling using an object URL. Any future implementation should revoke object URLs when no longer needed.
- Includes an AR modal whose current “Start WebXR AR Camera Session” button is an explanatory/alert-style interaction, not proof of a real WebXR session. Do not describe it as fully implemented WebXR unless you implement and test the real API flow.
- The viewer has procedural/visual fallback paths and model display options; inspect the exact code around scene setup before altering renderer lifecycle, lighting, geometry, resize behavior, or cleanup.
- Respect the component's existing `useEffect` cleanup and Three.js resource disposal. A careless change can leak WebGL contexts, event listeners, geometries, materials, or animation frames.

**3D asset limitation:** The only bundled model is `public/models/taj_mahal.glb`. The loader selects this local model only when the active site is `site-006` (Taj Mahal) and the relevant high-detail model mode is selected. Other monument IDs can use procedural/fallback visualization; do not imply that every monument currently has its own accurate 3D scan/model. The bundled asset's actual fidelity should be verified visually rather than inferred from comments.

### `src/data/monuments3dData.js`
Specialized data for the digital twin viewer. Currently documents two detailed monument entries:
- `site-006`: Taj Mahal Complex.
- `site-007`: Qutub Minar Complex.

Each entry includes identity/location/dynasty/date fields, default camera and target, intro narration, a sequence of historical eras, damage/conservation narrative, visual material parameters, audio narration, architectural hotspots with camera positions and descriptions, and camera presets. The Taj data includes a 1653 construction-era state, 1857 colonial-era state, 1998 pollution state, and 2026 conservation state. Treat these as UI/demo content until sources and claims are verified; don't present generated/demo timelines as official ASI measurements or verified real-time sensor data.

The specialized dataset uses the same IDs as `HERITAGE_SITES`; preserve ID consistency. `twinKey` is descriptive metadata, not necessarily a real model file path.

### `public/models/taj_mahal.glb`
The only local 3D model asset bundled with the project. Keep it in `public/models/` unless changing the asset-loading path deliberately.

### `src/components/ModelViewer3D.jsx`
Delegates all actual rendering to `DigitalTwinViewer`.

## 5. Data layer and content schemas

### `src/data/mockData.js`
Central static/mock content file. It exports:
- `HERITAGE_SITES`: monument directory entries. These include IDs, names, state/location/coordinates, dynasty, era, architectural style, descriptions, imagery and other display metadata. IDs include `site-006` (Taj Mahal), `site-007` (Qutub Minar), `site-001` (Sun Temple, Konark), `site-002` (Vittala Temple/Stone Chariot, Hampi), and other Indian heritage sites.
- `ANCIENT_SCRIPTS`: sample historical writing systems with periods, regions, original/transliterated text, translation, historical context, confidence-like demo values, and sample images.
- `FOLK_TRADITIONS`: sample oral/performing traditions, including artist/community, region, language, status, audio length, original/translated lyrics, instruments, transcription confidence, and preservation notes.
- `ENDANGERED_LANGUAGES`: sample language records with speaker counts, region, status, script/oral status, phoneme/phrase samples, and demo preservation status.
- `CULTURAL_KNOWLEDGE_GRAPH`: nodes and edges describing relationships between monuments, people, dynasties, architecture, and traditions.
- `MISREPRESENTATION_FACT_CHECKS`: sample claims, verdicts, trust scores, and explanatory fact-check content.
- `FESTIVAL_ARCHIVE`: sample festivals/rituals and cultural archive entries.

This data is primarily hardcoded demo/mock content. Confidence percentages, speaker counts, preservation claims, and historical interpretations need credible sourcing before being represented as authoritative. Keep components aligned with the schema and avoid silently renaming IDs/fields.

### `src/data/monuments3dData.js`
See the 3D section above. It is separate from the broad `mockData.js` dataset and only provides detailed digital-twin configuration for two sites.

## 6. Additional feature components currently present but not integrated into `App.jsx`

These files exist and are substantial UI prototypes. They are not imported by the current `App.jsx` routing, so they are not reachable through the main app unless explicitly integrated.

- `src/components/AIScannerModal.jsx`: modal-style AI heritage/epigraphy scanner concept. Uses monument data and ancient-script samples; inspect implementation before claiming real computer vision/OCR/AI inference. It is a frontend prototype unless a model/API is connected.
- `src/components/SmartTourismMap.jsx`: tourist/crowd helper UI using monument data and hardcoded alternatives/crowd indicators. It is not a live map/traffic/crowd service unless a real provider/API is added.
- `src/components/FolkLanguageVault.jsx`: UI for folk traditions and endangered languages; data comes from `FOLK_TRADITIONS` and `ENDANGERED_LANGUAGES`. Any audio playback or transcription should be checked for actual audio/API integration.
- `src/components/FestivalArchive.jsx`: festival/ritual archive UI using `FESTIVAL_ARCHIVE`; upload-like UI does not automatically mean media is uploaded to a server.
- `src/components/KnowledgeGraphExplorer.jsx`: cultural knowledge graph explorer using `CULTURAL_KNOWLEDGE_GRAPH`; inspect the rendering and interaction code before claiming a graph database or graph-engine backend exists.
- `src/components/RAGFactChecker.jsx`: fact-check/epigraphic content UI using `MISREPRESENTATION_FACT_CHECKS`. It is not a real retrieval-augmented generation system unless document retrieval and an LLM pipeline are connected.
- `src/components/AboutProject.jsx`: integrated and reachable via the `about` tab.
- `src/components/OpeningScreen.jsx`: integrated landing screen.
- `src/components/Header.jsx`, `Navigation.jsx`, `Dashboard.jsx`, `MonumentsList.jsx`, `AddMonumentForm.jsx`, `ModelViewer3D.jsx`, `DigitalTwinViewer.jsx`: part of the current main flow.

Do not add all orphaned components to navigation just because they exist. Only integrate them when requested, and ensure `OpeningScreen`, `Navigation`, `App.jsx`, component props, and tab rendering agree.

## 7. Optional Express backend: `server.js`

The file intends to implement a simple REST API with an in-memory array:
- `GET /api/monuments`: returns all monuments.
- `GET /api/monuments/:id`: returns one monument or 404.
- `POST /api/monuments`: validates basic required fields and adds an item to the in-memory array.

It also adds permissive CORS and JSON body parsing. Important current limitations:
- It uses CommonJS `require` and `module.exports`, but the root `package.json` sets `"type": "module"`. That module-format mismatch means `node server.js` is likely to fail unless the file/module configuration is reconciled.
- Express is not listed in the supplied `package.json` dependencies and no backend start script is defined.
- Data is in memory and disappears on server restart.
- Frontend code currently does not call these endpoints.
- The sample backend monument `modelUrl` values point to unrelated astronaut/Neil Armstrong demo models, not actual monument models. Do not use these as real monument assets.
- CORS allows all origins; appropriate only for a simple prototype, not production.
- No database, authentication, authorization, upload storage, moderation, or persistent data store is configured.

If asked to connect frontend and backend, first make the backend executable and define the API/data contract, then add loading/error states and a clear fallback policy. Do not silently mix local mock state and backend state.

## 8. Styling and configuration files

- `src/index.css`: global dark maroon/black heritage theme with antique gold and saffron accents, serif display fonts, jaali-like background, heritage card styles, hover transitions, and custom scrollbars.
- `tailwind.config.js`: Tailwind config scanning `index.html` and `src/**/*.{js,ts,jsx,tsx}`.
- `postcss.config.js`: PostCSS/Tailwind plugin setup (inspect the file if changing styling/build configuration).
- `vite.config.js`: React plugin; dev server host enabled on port 5173; `allowedHosts: true`.
- `index.html`: document metadata, Google Fonts, Google-hosted `<model-viewer>` script, root node, and `/src/main.jsx` entry.
- `.gitignore`: repository ignore rules.
- `package.json` / `package-lock.json`: dependencies and npm scripts; update both consistently when changing packages.
- `dist/index.html`: prebuilt Vite output committed/included in the ZIP. Treat `dist/` as generated output, not source; regenerate with `npm run build` rather than editing it manually.
- `public/models/taj_mahal.glb`: static model asset served as `/models/taj_mahal.glb`.

## 9. Current limitations and technical risks to keep in mind

1. **No persistent database:** main frontend data is hardcoded and new monuments are held in React state only.
2. **Backend disconnected and currently mismatched:** Express is not a declared dependency; CommonJS server conflicts with `"type": "module"`; no server script; frontend does not fetch API data.
3. **Only one bundled monument model:** Taj Mahal GLB; no separate verified GLB for each directory entry.
4. **Some feature components are orphaned:** scanner, map, language vault, festival archive, knowledge graph, and fact checker are not routed in the current app.
5. **Feature labels may overstate real integrations:** AI, RAG, crowdsourcing, live crowd status, AR, and confidence values may be prototype/demo UI rather than actual connected systems.
6. **Content accuracy:** historical, conservation, damage, architectural, endangered-language, and confidence statements should be verified and sourced before presenting as authoritative.
7. **State and callback integration:** verify prop signatures and navigation wiring before modifying dashboard/header selection behavior.
8. **3D lifecycle:** preserve proper Three.js animation-loop, resize-listener, event-listener, and GPU-resource cleanup.
9. **Dependency/config consistency:** check `npm run build` after edits; align Tailwind/PostCSS configuration with the installed Tailwind major version rather than assuming the config is correct.
10. **Accessibility/responsiveness:** preserve keyboard accessibility, semantic buttons/labels, mobile layouts, reduced-motion considerations, and useful loading/error states when making UI changes.

## 10. Antigravity Pro working rules

For every requested change:
1. Read this brief, then inspect the actual relevant source files. The source code overrides this summary if they differ.
2. Before editing, identify the exact components, data fields, routes, styles, and callbacks affected.
3. Make the smallest coherent set of changes. Preserve unrelated functionality and the established visual identity unless the user asks for a redesign.
4. Keep React state flow explicit. Prefer passing data/callbacks through the existing component tree over adding duplicate state.
5. For new monument content, maintain a consistent ID/schema across `HERITAGE_SITES`, `MONUMENTS_3D_DATA`, and viewer selection logic as applicable.
6. Never pretend mock data is live data, a demo classifier is real AI, a UI modal is real AR, or a hardcoded crowd value is live crowd sensing.
7. If adding real APIs/services, state the provider, credentials/config required, request/response contract, failure behavior, and any privacy/security implications. Do not hardcode secrets.
8. After coding, run `npm run build` and fix regressions. If a backend was touched, test its startup and endpoints too. Report what was changed, files affected, commands/tests run, and any remaining limitations.
9. Do not rewrite the app wholesale or replace the design system unless explicitly requested.
10. Ask a concise clarification only when a material product decision cannot be inferred safely; otherwise make a sensible minimal implementation and state assumptions.

## 11. One-paragraph project prompt

VIRASAT is a React + Vite Indian heritage tourism platform intended to help visitors explore monuments without relying entirely on a human tourist guide. Its main experience is an interactive Three.js digital-twin viewer with orbit/zoom controls, camera presets, architectural hotspots, browser-based narration, and a historical/conservation timeline. The directory and other content are driven mostly by static mock data. A Taj Mahal GLB is the only bundled 3D model; detailed timeline/hotspot configuration exists for Taj Mahal and Qutub Minar, while several broader culture features (AI scanner, tourism/crowd map, folk-language vault, festival archive, knowledge graph, fact checker) are prototype components not currently connected to the main app navigation. An Express API file exists but is not wired into the frontend and currently has module/dependency/persistence issues. When implementing future requests, inspect the actual code, preserve the maroon-and-antique-gold heritage design unless asked otherwise, distinguish prototype/demo behavior from real integrations, maintain consistent monument IDs/data schemas, and run the build to verify changes.
