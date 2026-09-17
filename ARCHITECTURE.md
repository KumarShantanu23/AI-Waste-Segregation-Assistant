# System Architecture Document

## Project: AI Waste Segregation Assistant
**Architectural Style:** Single-tier Monolithic Web Application (Server-Rendered + Client Interactive with API Routes)  
**Primary Principle:** Minimalistic, Zero-Unnecessary-Infrastructure, Secure-by-Default  

---

## 1. Architectural Overview

The **AI Waste Segregation Assistant** is designed as a focused, single-page application built on **Next.js (App Router)**. This provides both the interactive client-side user interface and a secure, serverless backend API route (`/api/classify`) within a unified repository and runtime.

This avoids the overhead of managing separate frontend and backend repositories, container orchestration, or dedicated server instances, while ensuring that the AI API credentials remain strictly server-side.

```
+-------------------------------------------------------------------------+
|                              USER BROWSER                               |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  | Single Page UI (React / Tailwind CSS)                             |  |
|  | - Item Input & Sample Chips                                       |  |
|  | - Loading State & Error Handling                                  |  |
|  | - Structured Result Card & Local Guidance Disclaimer             |  |
|  +---------------------------------+---------------------------------+  |
+------------------------------------|------------------------------------+
                                     |
                          POST /api/classify { item: string }
                                     |
                                     v
+------------------------------------+------------------------------------+
|                         NEXT.JS BACKEND ROUTE                           |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  | Route Handler: /api/classify                                      |  |
|  | 1. Input Sanitization & Validation (length, non-empty)            |  |
|  | 2. Fallback Evaluation Engine (if no GEMINI_API_KEY present)      |  |
|  | 3. System Prompt & Structured Output Formatting                   |  |
|  | 4. Error Handling & Timeout Control                              |  |
|  +---------------------------------+---------------------------------+  |
+------------------------------------|------------------------------------+
                                     |
                      HTTPS REST API (JSON Schema mode)
                                     |
                                     v
+------------------------------------+------------------------------------+
|                       GOOGLE GEMINI API ENGINE                          |
|                                                                         |
|  - Model: gemini-3.8-flash                                             |
|  - Output Schema: JSON Object                                           |
|  - Low Latency, High Reasoning Accuracy                                 |
+-------------------------------------------------------------------------+
```

---

## 2. Component Breakdown

### 2.1 Frontend Layer (Client UI)
* **Framework:** React 19 within Next.js 15 App Router (`src/app/page.tsx`).
* **Styling:** Tailwind CSS 3 / 4 for responsive, high-contrast, accessible styling.
* **Component Structure:**
  * `Header`: Displays project title, SDG 12 badge, and introductory mission summary.
  * `WasteInput`: Text area/input with placeholder, submit button, and quick-example pills.
  * `ResultCard`: Visual presentation of the AI output, including category color schemes:
    * `Recyclable`: Blue theme (`#2563eb` / `bg-blue-50`)
    * `Organic / Compostable`: Green theme (`#16a34a` / `bg-emerald-50`)
    * `Hazardous / E-Waste`: Amber/Red theme (`#ea580c` / `bg-amber-50`)
    * `Landfill / General`: Gray/Slate theme (`#64748b` / `bg-slate-50`)
  * `DisclaimerBanner`: Explains municipal variances and responsible recycling principles.
  * `LoadingState`: Animated skeleton / pulse indicator ensuring smooth feedback.
  * `ErrorAlert`: Friendly user-facing messaging for invalid inputs or service timeouts.

### 2.2 Backend Layer (Serverless API Route)
* **Route:** `POST /api/classify`
* **File:** `src/app/api/classify/route.ts`
* **Responsibilities:**
  * Validate request method and payload.
  * Sanitize user input (trim whitespace, verify length between 2 and 150 characters).
  * Check for presence of `GEMINI_API_KEY`.
  * If `GEMINI_API_KEY` is not present, route to the deterministic **Fallback Rule Engine** (providing predictable, high-quality responses for common items like the 5 sample prompts).
  * If `GEMINI_API_KEY` is present, construct a rigorous system prompt with instructions on SDG 12, material properties, and responsible uncertainty handling, enforcing JSON schema output.
  * Parse and validate the response before returning it to the client.

### 2.3 AI / LLM Integration
* **Provider:** Google Gemini API (`@google/genai` or official REST endpoint).
* **Recommended Model:** `gemini-3.8-flash`, prioritizing sub-second latency and high adherence to JSON schemas.
* **Prompt Strategy:**
  * System Instruction: *"You are an expert environmental sustainability and waste segregation specialist assisting users in identifying the proper waste disposal category under UN SDG 12."*
  * Material Reasoning: Explicit guidelines on food contamination (e.g., grease on cardboard), composite materials (tetra packs, blister packs), and electronic/battery fire hazards.
  * Uncertainty Protocol: If the item description is ambiguous (e.g., *"plastic bag"* vs. *"biodegradable bag"*), provide conditional advice rather than making unsupported assumptions.

---

## 3. Data Schema & API Contract

### Request Payload (`POST /api/classify`)
```json
{
  "item": "pizza box with leftover food"
}
```

### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "item": "Pizza box with leftover food",
    "category": "Organic / Compostable",
    "disposal_method": "Scrape leftover food into the organic/compost bin. Tear off greasy bottom into compost; if the top lid is clean, recycle it.",
    "explanation": "Food grease and oil contaminate the paper recycling process by preventing paper fibers from binding during pulping.",
    "sustainability_tip": "Next time, place a napkin or baking sheet under the pizza to keep the box clean and fully recyclable.",
    "uncertainty_note": null
  }
}
```

### Error Response (`400 Bad Request` / `500 Internal Server Error`)
```json
{
  "success": false,
  "error": "Please provide a valid waste item description (2 to 150 characters)."
}
```

---

## 4. State Management & Data Storage

* **Database / Persistent Storage:** **None**.
  * The application is strictly stateless. Each classification request is self-contained.
  * Eliminating database dependencies removes cold-start overhead, connection pool management, and privacy/GDPR concerns.
* **Client-side State:** Lightweight React `useState` / `useTransition` hooks manage the current item, loading status, active result, and error states.

---

## 5. Security & Privacy Architecture

* **Zero Secret Leakage:** The `GEMINI_API_KEY` is exclusively consumed within the Next.js server runtime (`process.env.GEMINI_API_KEY`) and is never prefixed with `NEXT_PUBLIC_`.
* **Zero PII (Personally Identifiable Information):** No user identifying information, cookies, IP trackers, or location permissions are collected.
* **Input Validation & Sanitization:** All incoming strings are length-bounded and stripped of non-printable control characters before processing.
* **Safe Error Handling:** Internal stack traces and raw provider error bodies are caught and masked with friendly, safe user messages.

---

## 6. Environment Variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `GEMINI_API_KEY` | Optional (Recommended) | `""` | Google Gemini API key for dynamic AI categorization. If omitted, fallback engine handles standard items. |
| `NODE_ENV` | Automatic | `development` | Node.js execution environment. |
| `PORT` | Optional | `3000` | Port for local Next.js server. |

---

## 7. Anti-Overengineering Decisions

1. **No Separate Microservices:** Next.js fulfills both UI rendering and API proxying in a single process.
2. **No External Database:** Avoids unnecessary database hosting, migration scripts, and maintenance.
3. **No Auth/User Management:** Waste segregation should have zero barrier to entry.
4. **No Heavy Vector DB or RAG Pipeline:** Gemini 3.8 Flash possesses comprehensive baseline knowledge of recycling guidelines and material science; a heavy vector database would add unnecessary latency, cost, and complexity.
