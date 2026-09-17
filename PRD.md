# Product Requirements Document (PRD)

## Project: AI Waste Segregation Assistant
**SDG Focus:** Goal 12 — Responsible Consumption and Production  
**Document Status:** Approved Baseline  
**Target Audience:** General Public, Students, Eco-conscious Citizens, Recycling Program Participants  

---

## 1. Problem Statement

Improper waste segregation is a critical global challenge. Everyday consumers frequently face dilemmas when categorizing waste:
* Contamination of recyclable streams (e.g., placing soiled cardboard or mixed plastics into paper recycling bins).
* Improper disposal of hazardous materials and e-waste (e.g., throwing lithium-ion batteries or broken electronics into general trash).
* Confusion surrounding biodegradable vs. non-biodegradable packaging.

When people are unsure, they either guess (leading to contaminated batches that end up in landfills) or throw everything into general waste. There is a strong need for an accessible, friction-free tool that delivers immediate, authoritative, yet nuanced waste classification and disposal recommendations.

---

## 2. Target Users

* **Everyday Householders**: Individuals sorting kitchen, bathroom, and packaging waste daily.
* **Students & Young Adults**: Learning independent living habits and environmental stewardship.
* **Office & Workplace Workers**: Seeking clarity on office waste, takeout containers, and packaging.
* **Internship Evaluators / Reviewers**: Assessing the practical, responsible application of AI to real-world sustainability goals.

---

## 3. Product Goals

* Provide a single, intuitive screen where any user can query a waste item in under 5 seconds.
* Deliver structured, actionable disposal guidance:
  1. Primary Waste Category
  2. Concrete Disposal Action / Bin Allocation
  3. Clear, educational explanation of the reasoning
  4. Practical sustainability tip for waste reduction / reuse
* Communicate responsible AI principles: clearly indicate that municipal recycling capabilities differ by jurisdiction and handle uncertainty transparently.
* Ensure zero over-engineering: no accounts, no complex onboarding, instant value.

---

## 4. User Journey & Core Flow

1. **Discovery & Orientation**: User lands on the clean interface, greeted by an SDG 12 banner, a succinct value proposition, and an input box with suggested sample chips (*"plastic water bottle"*, *"used tissue"*, *"pizza box with leftover food"*, *"old mobile phone"*, *"glass bottle"*).
2. **Input Entry**: User either clicks an example chip or types a description of their waste item.
3. **Trigger**: User clicks "Analyze Waste" or presses `Enter`.
4. **Immediate Feedback**: The interface disables duplicate submissions and shows a smooth loading state.
5. **Result Display**: A card displays:
   * Item Name (normalized)
   * Category Badge (Color-coded: Recyclable [Blue], Organic/Compost [Green], E-Waste/Hazardous [Amber/Red], Landfill/Trash [Gray])
   * Recommended Disposal Method (Step-by-step)
   * Why this category (Explanation)
   * Sustainability / Reduction Tip (Lightbulb icon)
   * Local Regulation Disclaimer
6. **Next Query**: User can seamlessly type another item or pick another sample without refreshing.

---

## 5. Core Features

### 5.1 Input Interface
* Single text input field with placeholder prompting descriptive waste entries.
* Quick-access chips for the 5 standard evaluation examples.
* Keyboard submission support (`Enter` key).
* Input validation (character limits: 2–150 characters, trimming empty whitespace).

### 5.2 Classification & Guidance Output
* **Category**: One of four standard waste categories:
  * `Recyclable` (Paper, clean cardboard, rigid plastics #1 & #2, clean glass, metal cans)
  * `Organic / Compostable` (Food scraps, yard trimmings, uncoated soiled paper)
  * `Hazardous / E-Waste` (Batteries, electronics, paints, chemicals, medical waste)
  * `Landfill / General Waste` (Non-recyclable composites, contaminated plastics, hygiene products)
* **Disposal Method**: Concise, actionable guidance (e.g., *"Empty and rinse bottle, reattach plastic cap, and place in blue recycling bin"*).
* **Explanation**: Context on material composition and recycling stream realities (e.g., *"Grease and oil soak into paper fibers of pizza boxes, preventing paper pulping during recycling"*).
* **Sustainability Tip**: Reduction/reuse alternative (e.g., *"Tear off clean top lid for recycling, compost the greasy bottom"*).

### 5.3 Responsible AI Safeguards
* **Uncertainty Handling**: If an item is vague (e.g., *"a box"* or *"bottle"* without material), the AI asks clarifying details or specifies conditional handling (e.g., *"If cardboard... If plastic..."*).
* **Local Regulation Notice**: Permanent advisory note clarifying that municipal guidelines vary by location.
* **Safety / Hazardous Alert**: Explicit hazard flags for dangerous items (e.g., lithium batteries, corrosive cleaners).
* **No PII Collection**: Purely stateless queries; no personal data requested or recorded.

### 5.4 Error & Fallback Handling
* Handling empty or whitespace-only inputs with an inline helper prompt.
* Handling gibberish or non-item inputs (e.g., *"asdfghjk"*, *"who is the president"*) with friendly error guidance explaining the tool is strictly for waste classification.
* API rate limit / network error states with retry prompts.
* Graceful offline / zero-API-key fallback mode for predictable evaluator testing.

---

## 6. Functional Requirements

| ID | Requirement | Acceptance Criteria |
|---|---|---|
| **FR-1** | Text Input Entry | User can input any text string up to 150 characters. |
| **FR-2** | Sample Prompts | Clicking any sample chip populates the input field, allowing the user to review or edit before submitting for classification. |
| **FR-3** | Server-side AI Proxy | Client requests `/api/classify`; API key is never exposed to client-side code. |
| **FR-4** | Structured Schema Output | Backend validates LLM response against strict JSON schema (`item`, `category`, `disposal_method`, `explanation`, `sustainability_tip`). |
| **FR-5** | Visual Classification States | Distinct visual styling and badge colors for each waste category. |
| **FR-6** | Error Presentation | Network/AI failures render a clear, non-intrusive alert with a retry button. |
| **FR-7** | Responsive Layout | Layout adapts flawlessly across mobile phones, tablets, and desktop displays. |

---

## 7. Non-Functional Requirements

* **Performance**: Classification response rendered within < 2.5 seconds under normal network conditions.
* **Accessibility**: Accessibility checks performed for semantic structure, focus states, color independence, ARIA messaging, and reduced-motion support.
* **Simplicity & Maintainability**: Clean component architecture, minimal dependencies, straightforward setup.
* **Reliability**: Deterministic fallback responses if AI service is unreachable or unconfigured.

---

## 8. Out of Scope (Anti-Overengineering)

The following are strictly out of scope for this internship project:
* User registration, authentication, or profile storage.
* Persistent database (PostgreSQL, MongoDB, etc.).
* Camera / computer-vision image scanning (adds significant mobile camera API complexity and latency).
* Geolocation-based automated municipal lookup (adds external commercial API dependencies).
* Social sharing / gamification leaderboards.
* Administrative management dashboard.
