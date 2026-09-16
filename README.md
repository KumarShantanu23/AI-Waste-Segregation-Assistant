# AI Waste Segregation Assistant

> An intelligent, single-page web assistant helping individuals properly categorize and dispose of household and everyday waste, directly aligned with **United Nations Sustainable Development Goal 12: Responsible Consumption and Production**.

---

## 🌍 Why This Project Exists

Improper waste disposal and contamination in recycling streams are major contributors to landfill overflow, environmental degradation, and resource depletion. Many citizens want to recycle or compost responsibly but are confused by ambiguous packaging, composite materials (e.g., greasy pizza boxes), or electronic waste rules.

The **AI Waste Segregation Assistant** bridges this knowledge gap by providing instant, AI-guided classification, disposal instructions, actionable explanations, and practical sustainability tips for any everyday item.

---

## 🎯 SDG 12 Alignment

This project contributes directly to **UN SDG 12: Ensure sustainable consumption and production patterns**, specifically:
* **Target 12.5**: Substantially reduce waste generation through prevention, reduction, recycling, and reuse.
* **Target 12.8**: Ensure that people everywhere have the relevant information and awareness for sustainable development and lifestyles in harmony with nature.

---

## ✨ Key Features

* **Natural Language Item Input**: Enter or describe any waste item in plain words (e.g., *"plastic water bottle"*, *"pizza box with leftover food"*, *"old mobile phone"*, *"used tissue"*).
* **Quick-Example Chips**: Single-click prompts for common household waste items to quickly explore disposal classifications.
* **Structured AI Classification**:
  * **Waste Category**: Clear, color-coded categorization (*Recyclable*, *Organic / Compostable*, *Hazardous / E-Waste*, *Landfill / General Waste*).
  * **Recommended Disposal Method**: Direct, step-by-step handling instructions (e.g., empty contents, rinse clean, place in designated bin).
  * **Practical Explanation**: Plain-language breakdown explaining *why* the item belongs in that category.
  * **Sustainability Tip**: Actionable advice promoting reduction, reuse, or sustainable alternatives.
* **Responsible AI & Local Guidance**: Clear disclaimers indicating that regional municipal recycling facilities and rules may vary.
* **Resilient Experience**: Clean handling of empty inputs, edge cases, uncertain items, and network/API errors.

---

## 🔄 User Flow

```
+---------------------------+
|  User describes an item   |  --> e.g., "greasy pizza box"
+-------------+-------------+
              |
              v
+---------------------------+
|  Submit & Loading State   |  --> User sees instant visual feedback
+-------------+-------------+
              |
              v
+---------------------------+
|   AI Categorization API   |  --> Evaluates item against waste management rules
+-------------+-------------+
              |
              v
+---------------------------+
|  Structured Result Card   |  --> Category, Disposal Instructions, 
|                           |      Explanation, Sustainability Tip & Local Disclaimer
+---------------------------+
```

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 15 (React 19) with TypeScript
* **Styling**: Tailwind CSS (clean, responsive, modern card-based UI)
* **Backend**: Next.js Serverless API Route (`/api/classify`)
* **AI Engine**: Google Gemini API (`gemini-3.8-flash`) via official `@google/genai` with structured JSON schema output and timeout fallback
* **Offline / Fallback Support**: Built-in deterministic classification engine for common items when offline, unkeyed, or during API errors

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js**: v18.0.0 or later (v22+ recommended)
* **npm**: v9.0.0 or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KumarShantanu23/AI-Waste-Segregation-Assistant.git
   cd AI-Waste-Segregation-Assistant
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: If no API key is provided, the application runs gracefully in local fallback mode with preset rules for demonstration and evaluation).*

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📌 Project Status

* **Current Phase**: Phase 4 — Backend API & AI Integration Complete (Awaiting Phase 5 Approval)
* **Implementation Status**: Backend classification endpoint (`POST /api/classify`) active with Gemini 3.8 Flash and deterministic fallback engine.

