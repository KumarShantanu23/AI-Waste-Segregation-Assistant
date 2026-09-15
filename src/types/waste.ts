/**
 * Core Waste Categories supported by the Assistant
 */
export type WasteCategory =
  | "Recyclable"
  | "Organic / Compostable"
  | "Hazardous / E-Waste"
  | "Landfill / General Waste";

/**
 * Structured Waste Classification Result returned by the AI/Classification engine
 */
export interface WasteClassificationResult {
  item: string;
  category: WasteCategory;
  disposal_method: string;
  explanation: string;
  sustainability_tip: string;
  uncertainty_note?: string | null;
}

/**
 * Request payload for POST /api/classify
 */
export interface ClassifyRequest {
  item: string;
}

/**
 * Response payload for POST /api/classify
 */
export type ClassifyResponse =
  | {
      success: true;
      data: WasteClassificationResult;
    }
  | {
      success: false;
      error: string;
    };
