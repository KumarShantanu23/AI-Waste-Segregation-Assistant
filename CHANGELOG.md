# Changelog

All notable changes to the **AI Waste Segregation Assistant** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.3.0] - 2026-09-15

### Added
* Core user interface components:
  * `Header.tsx`: Project title, subtitle, and UN SDG 12 indicator badge.
  * `QuickExamples.tsx`: Five clickable prompt chips (*"Plastic water bottle"*, *"Used tissue"*, *"Pizza box with leftover food"*, *"Old mobile phone"*, *"Glass bottle"*).
  * `WasteInput.tsx`: Accessible input form with character limit counter (`0 / 150`), clear button, guidance hint, and disabled/active state submission button.
  * `ResultSkeleton.tsx`: Reusable animated placeholder component structuring category badge, disposal steps, material reasoning, sustainability tip, and municipal disclaimer.
  * `Footer.tsx`: Educational disclaimer and SDG 12 attribution.
* Integrated responsive main page in `src/app/page.tsx` with interactive chip selection, input handling, and skeleton preview toggle.

### Changed
* Updated `ROADMAP.md` checking off Phase 3 tasks.
* Updated `PROJECT_CONTEXT.md` to reflect Phase 3 completion and document readiness for Phase 4.

### Fixed
* None.

### Important Decisions
* **Strict Phase Isolation**: The "Classify Waste" button is visually enabled when input is valid, but strictly prevented from calling any API or classification logic during Phase 3.
* **Component Modularity**: Extracted `Header`, `WasteInput`, `QuickExamples`, `ResultSkeleton`, and `Footer` into dedicated, typed components in `src/components/` without adding any third-party UI libraries.

### Next Step
* Await approval to proceed to Phase 4: Backend API & AI Integration (`POST /api/classify` with Google Gemini Flash and local fallback engine).

---

## [0.2.0] - 2026-09-15

### Added
* Next.js 15 (React 19) and TypeScript setup with `@google/genai` dependency.
* Tailwind CSS and PostCSS configuration with custom waste category theme color palette.
* Clean source directory architecture: `src/app`, `src/components`, `src/lib`, `src/types`.
* TypeScript contracts in `src/types/waste.ts` for classification results, categories, and API requests/responses.
* Initial root layout (`src/app/layout.tsx`), Tailwind globals (`src/app/globals.css`), and minimal placeholder page (`src/app/page.tsx`).

### Changed
* Updated `ROADMAP.md` marking Phase 2 tasks complete.
* Updated `PROJECT_CONTEXT.md` to reflect Phase 2 completion and prepare for Phase 3 UI development.

### Fixed
* None.

### Important Decisions
* **Strict Minimal Dependencies**: Confined dependencies strictly to Next.js 15, React 19, TypeScript, Tailwind CSS, and `@google/genai` to prevent bloat.
* **Build & Dev Verification**: Confirmed that `npm run build` succeeds and `next dev` starts and returns HTTP 200 prior to UI implementation.

### Next Step
* Await approval to proceed to Phase 3: Core UI Implementation.

---

## [0.1.0] - 2026-09-15

### Added
* Initial project repository documentation suite:
  * `README.md`: Project overview, SDG 12 alignment, core features, technology stack, and local running instructions.
  * `PRD.md`: Focused Product Requirements Document covering problem statement, user flows, functional/non-functional requirements, responsible AI safeguards, and explicit out-of-scope boundaries.
  * `ARCHITECTURE.md`: Monolithic single-tier Next.js architecture, secure server-side API proxying, Google Gemini AI integration schema, and anti-overengineering design decisions.
  * `PROJECT_CONTEXT.md`: System status file for future AI agent sessions detailing current state, key decisions, constraints, and instructions.
  * `ROADMAP.md`: Structured, actionable phase-by-phase development checklist.
  * `.gitignore`: Comprehensive ignore rules for Next.js, Node.js dependencies, environment secrets, and OS metadata.

### Changed
* None (initialization phase).

### Fixed
* None.

### Important Decisions
* **Stack Choice**: Next.js 15 (React 19, TypeScript, Tailwind CSS) selected as a unified, single-process stack. It keeps LLM API credentials secure server-side in `/api/classify` without requiring separate backend hosting or container orchestration.
* **Stateless Design**: Eliminated database, authentication, and user tracking to uphold privacy, reduce latency, and adhere strictly to the anti-overengineering principle.
* **Deterministic Fallback Engine**: Decided to include a local rule-based fallback for standard evaluation items so evaluators can run and test the application even without configuring a live Gemini API key.
* **Responsible AI Safeguards**: Embedded municipal variance disclaimers and uncertainty protocols into the product specification and UI design.

### Next Step
* Report foundation completion to the project owner and request approval for technology stack and initial roadmap before proceeding to Phase 2 (application scaffolding).
