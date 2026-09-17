# Changelog

All notable changes to the **AI Waste Segregation Assistant** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.7.0] - 2026-09-17

### Added
* Redesigned Hero in `src/components/Header.tsx` with headline: *"Know where your waste belongs."*, SDG 12 context badge, concise subhead, and 3 value pillars.
* Centralized input experience in `src/components/WasteInput.tsx` with clear action hierarchy, search icon, dynamic character count styling, and enhanced focus indicators.
* Polished `QuickExamples.tsx` with category color indicators, tactile hover micro-interactions, and disabled state during in-flight queries.
* Elevated `ResultCard.tsx` with:
  * High-contrast, accessible category badges combining distinct icons, labels, and borders for all 4 streams.
  * Highlighted, scannable **Recommended Disposal Method** callout card as the central action.
  * Clearly separated **Why It Belongs in This Category** educational reasoning.
  * Distinct eco-accented **Sustainability & Reduction Tip** container.
  * Prominent **Uncertainty & Safety Advisory** with high-visibility notice for ambiguous items (*"Classification uncertain — check local guidance"*).
  * Seamlessly integrated municipal disclaimer.
* Dedicated **Batteries & Portable Power Sources** classification rule in `src/lib/fallbackClassifier.ts` separating battery terminal taping and fire hazards from paints/liquids.
* Geographically neutral language across sharps and pharmaceutical rules (removed US-specific FDA and DEA references).
* Intentional empty state in `src/app/page.tsx` displaying a 3-step segregation guide and a 4-stream visual quick reference.
* Ambient eco-tint radial gradient and reduced-motion reset in `src/app/globals.css`.
* Comprehensive automated end-to-end verification suite (`test_phase7_complete.js`) passing 47/47 assertions across all 18 required test cases.

### Changed
* Updated `ROADMAP.md` checking off all Phase 7 milestones.
* Updated `PROJECT_CONTEXT.md` to version 1.6.0 documenting project completion and internship-demo readiness.
* Reconciled `README.md` project status section.

---

## [0.6.0] - 2026-09-17

### Added
* High-priority safety classification rules in `src/lib/fallbackClassifier.ts`:
  * **Medical Sharps & Syringes**: Categorized as `Hazardous / E-Waste` with explicit instructions to place in puncture-proof sharps containers or rigid heavy plastic bottles with sealed lids and take to authorized pharmacy/hospital drop-off facilities.
  * **Pharmaceuticals & Medications**: Categorized as `Hazardous / E-Waste` with instructions against flushing or general dumping, directing users to community pharmacy drug take-back kiosks or DEA collection events.
  * **Hazardous Household Chemicals & Power Sources**: Categorized as `Hazardous / E-Waste` covering lithium-ion batteries, solvents, motor oils, fluorescent tubes, and paints with HHW drop-off instructions.
  * **Broken Glass Safety Rule**: Categorized as `Landfill / General Waste` with strict prohibition from curbside recycling and mandatory puncture-resistant wrapping instructions to protect waste workers.
  * **Transparent Uncertain Fallback**: Updated unknown item fallback to honestly communicate offline classifier limitations, generate an `uncertainty_note`, and advise consulting local municipal directories instead of providing confident "when in doubt, place in landfill" messaging.
* Updated `src/lib/gemini.ts` system prompt reinforcing safety constraints for broken glass non-recyclability, medical sharps, and pharmaceuticals.
* Automated Phase 6 test suite covering edge-case classification, input normalization, HTML/punctuation stripping, and boundary limits.

### Changed
* Updated input normalization to safely strip punctuation, control characters, and collapse irregular whitespace.
* Updated `ROADMAP.md` checking off Phase 6 deliverables.
* Updated `PROJECT_CONTEXT.md` recording Phase 6 completion and documenting readiness for Phase 7.

### Next Step
* Await approval to proceed to Phase 7: Verification & Final Polish.

---

## [0.5.0] - 2026-09-17

### Added
* Connected frontend in `src/app/page.tsx` to `POST /api/classify` using native browser `fetch`.
* Integrated live request lifecycle states: `isLoading`, `result`, and `error`.
* Wired `WasteInput` loading state to disable input and button, prevent duplicate submissions, and show the "Analyzing..." animated indicator during active API calls.
* Created `ResultCard.tsx` in `src/components/ResultCard.tsx`:
  * Renders normalized item name and dynamic color-coded category badges (Blue for Recyclable, Green for Organic, Amber for Hazardous/E-Waste, Slate for Landfill).
  * Displays step-by-step disposal instructions, material reasoning explanation, and a highlighted sustainability reduction tip.
  * Displays an uncertainty advisory callout when `uncertainty_note` is present.
  * Displays origin transparency badge (`AI Verified` vs `Standard Rule`).
* Created reusable `DisclaimerBanner.tsx` in `src/components/DisclaimerBanner.tsx` informing users of municipal recycling variations.
* Added friendly client error notifications for network failures, validation limits, or API errors without exposing internal stack traces.

### Changed
* Replaced Phase 3 mock submission handler with real asynchronous classification pipeline.
* Removed obsolete manual "Preview Loading Skeleton" section in `page.tsx` in favor of dynamic skeleton display during active requests.
* Updated `ROADMAP.md` checking off Phase 5 tasks.
* Updated `PROJECT_CONTEXT.md` recording Phase 5 completion and documenting readiness for Phase 6.

### Fixed
* Prevented duplicate form submissions during in-flight classification requests.

### Important Decisions
* **Native Fetch & Zero Extra Libraries**: Implemented client-side API dispatch using native browser `fetch` without adding Axios or external state management packages.
* **Component Modularity**: Isolated `ResultCard` and `DisclaimerBanner` into typed, self-contained components preserving existing typography, spacing, and Tailwind color conventions.

### Next Step
* Await approval to proceed to Phase 6: Error States, Edge Cases & Responsible AI Safeguards.

---

## [0.4.0] - 2026-09-16

### Added
* Backend route handler `POST /api/classify` in `src/app/api/classify/route.ts`:
  * Validates JSON request payload and item string presence.
  * Enforces length constraints (2 to 150 characters) and rejects whitespace-only queries with HTTP 400.
  * Sanitizes inputs and guarantees clean, mask-protected HTTP 500 responses without exposing stack traces or internals.
* Google Gemini AI integration in `src/lib/gemini.ts`:
  * Powered by `gemini-3.8-flash` via `@google/genai`.
  * Enforces structured JSON output matching `WasteClassificationResult` schema (`item`, `category`, `disposal_method`, `explanation`, `sustainability_tip`, `uncertainty_note`).
  * Built-in `AbortController` timeout (5000ms) to protect against hanging API requests.
* Deterministic local fallback classifier in `src/lib/fallbackClassifier.ts`:
  * Handles standard evaluation examples (*"Plastic water bottle"*, *"Used tissue"*, *"Pizza box with leftover food"*, *"Old mobile phone"*, *"Glass bottle"*), common organic/recyclable materials, and safe general waste defaults.
  * Provides seamless offline evaluation when `GEMINI_API_KEY` is not present or when API calls fail/time out.
* Source metadata field (`source: "gemini" | "fallback"`) added to `WasteClassificationResult` for clear origin transparency.
* Updated `.env.local.example` with `GEMINI_API_KEY=`.

### Changed
* Updated `ROADMAP.md` checking off all Phase 4 tasks.
* Updated `PROJECT_CONTEXT.md` recording Phase 4 completion and active phase status.

### Fixed
* Added `AbortController` timeout to prevent hanging on network delays or invalid API keys.

### Important Decisions
* **AI Model Selection**: Targeted `gemini-3.8-flash` as the current stable Flash model via official `@google/genai` SDK.
* **Strict Privacy & Responsible AI**: Stateless request handling (zero user data saved), transparent `source` identification, and disclaimers emphasizing that municipal recycling rules differ by location.

### Next Step
* Await approval to proceed to Phase 5: Result Card & Guidance Display (Connecting frontend to `/api/classify` and presenting real classification results).

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
