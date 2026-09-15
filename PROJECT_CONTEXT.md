# Project Context

**File Version:** 1.1.0  
**Last Updated:** 2026-09-15  
**Active Phase:** Phase 2 — Application Scaffolding & Setup (Complete, Awaiting Phase 3 Approval)  

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

* **Development Phase:** Phase 2 Complete (Application Scaffolding & Setup)
* **Completed Features:**
  * Git repository initialized with author configuration.
  * Comprehensive documentation suite established (`README.md`, `PRD.md`, `ARCHITECTURE.md`, `PROJECT_CONTEXT.md`, `ROADMAP.md`, `CHANGELOG.md`, `.gitignore`).
  * Project principles, responsible AI safeguards, and anti-overengineering rules locked.
  * Next.js 15, React 19, TypeScript, and Tailwind CSS configured.
  * Dependency footprint established including official `@google/genai` SDK.
  * Project layout scaffolded (`src/app`, `src/components`, `src/lib`, `src/types`).
  * Core TypeScript domain models created in `src/types/waste.ts`.
  * Production build and local dev server verified (HTTP 200).
* **Current Feature:** Application scaffolding verified.
* **Next Task:** Phase 3 — Core UI Implementation (Header with SDG 12 badge, Waste Item Input, Quick-Example interactive chips, Loading Skeleton).

---

## 3. Current Architecture Summary
* **Monolithic Full-Stack:** Next.js 15 (App Router) handling both frontend UI and server-side API routes.
* **Frontend:** Single-Page Application (SPA) with responsive Tailwind CSS, dynamic loading states, category-themed visual badges, and quick-example chips.
* **Backend:** Server-side route handler (`POST /api/classify`) acting as a secure proxy to Google Gemini API.
* **AI Engine:** Google Gemini API (`gemini-1.5-flash` / `gemini-2.0-flash`) returning structured JSON output.
* **Fallback Rule Engine:** In-memory deterministic classifier for standard items if `GEMINI_API_KEY` is not provided (ensures immediate evaluator testability).
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
