# Project Context

**File Version:** 1.5.0  
**Last Updated:** 2026-09-17  
**Active Phase:** Phase 6 — Error States, Edge Cases & Responsible AI (Complete, Awaiting Phase 7 Approval)  

---

## 1. Project Identity & Purpose
* **Name:** AI Waste Segregation Assistant
* **Repository:** `KumarShantanu23/AI-Waste-Segregation-Assistant`
* **Local Workspace:** `C:\Users\KIIT\Desktop\My Projects\AI-Waste-Segregation-Assistant`
* **Purpose:** A clean, accessible web application that guides everyday users on proper waste sorting and disposal to eliminate recycling contamination, properly divert organic waste, and safely handle hazardous e-waste.
* **UN SDG Alignment:** **SDG 12 — Responsible Consumption and Production** (Targets 12.5 & 12.8).
* **Project Nature:** Internship project with rigorous focus on high polish, clear real-world utility, responsible AI practices, and anti-overengineering.

---

## 2. Current Implementation Status

* **Development Phase:** Phase 6 Complete (Error States, Edge Cases & Responsible AI)
* **Completed Features:**
  * Git repository initialized with documentation suite.
  * Next.js 15, React 19, TypeScript, and Tailwind CSS configured.
  * UI components built in Phase 3 (`Header`, `WasteInput`, `QuickExamples`, `ResultSkeleton`, `Footer`).
  * Backend route handler implemented at `POST /api/classify` with Gemini 3.8 Flash, structured JSON schema, and local fallback engine.
  * Frontend connected to `POST /api/classify` via native `fetch` in `src/app/page.tsx`.
  * Loading state (`isLoading`) wired to `WasteInput` (disabling input/button, displaying spinner) and rendering `ResultSkeleton`.
  * `ResultCard` component created in `src/components/ResultCard.tsx` with dynamic category styling (Blue, Green, Amber, Slate), disposal method, material explanation, sustainability tip, conditional uncertainty advisory, and source transparency.
  * `DisclaimerBanner` component created in `src/components/DisclaimerBanner.tsx` reminding users of municipal recycling rule differences.
  * Robust client/server validation enforcing trimmed string length between 2 and 150 characters with accessible alert notifications.
  * Hardened deterministic fallback classifier (`src/lib/fallbackClassifier.ts`):
    * Dedicated rule for medical sharps and syringes (`Hazardous / E-Waste`, puncture-proof container guidance).
    * Dedicated rule for pharmaceuticals and expired medicines (`Hazardous / E-Waste`, drug take-back guidance).
    * Dedicated rule for hazardous chemicals, paints, and lithium batteries (`Hazardous / E-Waste`, HHW depot guidance).
    * Dedicated safety rule for broken glass (`Landfill / General Waste`, strictly non-recyclable, protective wrapping instructions).
    * Improved transparent generic fallback for unknown items explicitly communicating offline classification uncertainty and advising municipal reference rather than confident landfill advice.
  * Updated Gemini system instructions in `src/lib/gemini.ts` reinforcing critical safety constraints (broken glass non-recyclability, sharps/pharmaceutical containment).
  * 32 local unit tests and 63 HTTP/API automated tests passing with 100% success.
  * Production build (`npm run build`) passing with zero warnings or errors.
* **Current Feature:** Hardened edge cases, safety rules, and transparent error handling complete.
* **Next Task:** Phase 7 — Verification & Final Polish (Responsive tests, accessibility, final documentation).

---

## 3. Current Architecture Summary
* **Monolithic Full-Stack:** Next.js 15 (App Router) handling both frontend UI and server-side API routes.
* **Frontend:** Single-Page Application (SPA) with responsive Tailwind CSS (ready for Phase 5 integration).
* **Backend:** Server-side route handler (`POST /api/classify`) accepting `{ item: string }` and returning structured `WasteClassificationResult`.
* **AI Engine:** Google Gemini API (`gemini-3.8-flash`) using `@google/genai` with structured JSON output schema and 5-second abort timeout.
* **Fallback Rule Engine:** In-memory deterministic classifier in `src/lib/fallbackClassifier.ts` ensuring graceful handling when `GEMINI_API_KEY` is omitted, invalid, or experiencing rate limits/network failures.
* **Environment Variable:** `GEMINI_API_KEY` kept strictly server-side (never prefixed with `NEXT_PUBLIC_`).
* **Storage / Database:** None (stateless design).

---

## 4. Key Technical Decisions
1. **Next.js Single-Tier Stack:** Chosen over separate backend/frontend services to eliminate CORS issues, process management overhead, and reduce deployment footprint to a single command.
2. **Structured JSON Output:** AI responses are strictly parsed into `{ item, category, disposal_method, explanation, sustainability_tip, uncertainty_note }` to prevent unstructured markdown blobs in the UI.
3. **Graceful Fallback Mode:** Built-in offline/mock support for standard evaluation prompts ("plastic water bottle", "used tissue", "pizza box with leftover food", "old mobile phone", "glass bottle") so the app runs even without external API credentials.
4. **No Auth / No Database:** Purely stateless tool; user friction is minimized and privacy is guaranteed.

---

## 5. Known Issues & Blockers
* None currently. Initial documentation baseline established.

---

## 6. Important Constraints
* **Anti-Overengineering:** Do NOT add user authentication, databases, Redis, Docker, Kubernetes, microservices, or complex dashboards.
* **Responsible AI:** Must always display disclaimers that local municipal waste laws supersede AI recommendations. Must gracefully handle ambiguity.
* **Security:** Never expose the Gemini API key to client-side code (`NEXT_PUBLIC_`).
* **Clean Git History:** Meaningful atomic commits for each logical milestone. Never create a single giant commit.

---

## 7. Things That Should NOT Be Changed Without a Reason
* The 5 core test items must always be supported and highlighted as quick-example chips:
  1. *"plastic water bottle"*
  2. *"used tissue"*
  3. *"pizza box with leftover food"*
  4. *"old mobile phone"*
  5. *"glass bottle"*
* The 4 primary category labels: `Recyclable`, `Organic / Compostable`, `Hazardous / E-Waste`, `Landfill / General Waste`.
* The structured response schema keys: `item`, `category`, `disposal_method`, `explanation`, `sustainability_tip`.

---

## 8. Instructions for Future AI Agents
1. Before taking any action, read this file (`PROJECT_CONTEXT.md`), `ROADMAP.md`, and the latest entries in `CHANGELOG.md`.
2. Inspect the current working directory files before making assumptions.
3. Implement only the current assigned task from `ROADMAP.md`.
4. Update `PROJECT_CONTEXT.md`, `ROADMAP.md`, and `CHANGELOG.md` after completing a task.
5. Create a descriptive Git commit for each completed milestone.
