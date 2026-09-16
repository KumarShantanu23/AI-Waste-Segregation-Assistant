import { GoogleGenAI, Type } from "@google/genai";
import { WasteCategory, WasteClassificationResult } from "@/types/waste";

const VALID_CATEGORIES: readonly WasteCategory[] = [
  "Recyclable",
  "Organic / Compostable",
  "Hazardous / E-Waste",
  "Landfill / General Waste",
] as const;

/**
 * Structured output schema for Gemini model
 */
const WASTE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    item: {
      type: Type.STRING,
      description: "The normalized, user-friendly name of the waste item.",
    },
    category: {
      type: Type.STRING,
      enum: [
        "Recyclable",
        "Organic / Compostable",
        "Hazardous / E-Waste",
        "Landfill / General Waste",
      ],
      description: "The primary waste segregation category.",
    },
    disposal_method: {
      type: Type.STRING,
      description: "Clear, practical, step-by-step disposal and bin allocation instructions.",
    },
    explanation: {
      type: Type.STRING,
      description: "Brief educational explanation of material properties and why it belongs to this category.",
    },
    sustainability_tip: {
      type: Type.STRING,
      description: "One concise, actionable sustainability tip promoting waste reduction, reuse, or alternatives.",
    },
    uncertainty_note: {
      type: Type.STRING,
      description: "Note regarding local municipal variations or material ambiguity if applicable, or null if certain.",
    },
  },
  required: [
    "item",
    "category",
    "disposal_method",
    "explanation",
    "sustainability_tip",
  ],
};

const SYSTEM_INSTRUCTION = `
You are an expert environmental sustainability and waste segregation assistant aligned with UN Sustainable Development Goal 12 (Responsible Consumption and Production).
Your role is to educate users on how to properly sort household and everyday waste items to eliminate recycling contamination, properly divert organic waste, and protect waste workers from hazardous materials.

GUIDELINES:
1. Classify the item into EXACTLY one of these four categories:
   - "Recyclable": Clean paper, clean cardboard, rigid plastics #1 (PET) & #2 (HDPE), clean intact glass bottles/jars, metal cans.
   - "Organic / Compostable": Raw/cooked food scraps, yard clippings, non-chemical food-soiled unbleached paper or cardboard.
   - "Hazardous / E-Waste": Batteries (especially lithium-ion), cell phones, electronics, chemicals, paints, medical sharps/waste, pharmaceuticals/expired medicines, fluorescent bulbs.
   - "Landfill / General Waste": Hygiene products (soiled tissues, wipes), composite non-recyclable multi-layer packaging, chip bags, contaminated plastics, broken glass/ceramic (must be safely wrapped to protect sanitation workers).
2. Safety & Contamination Awareness:
   - Broken glass and shattered items must NEVER be classified as Recyclable. They present severe laceration hazards to workers and contaminate sorting streams; classify as Landfill / General Waste with instructions to wrap securely in newspaper or cardboard.
   - Medical sharps (needles, syringes) and pharmaceuticals must NEVER be placed into curbside recycling or loose in household trash. Sharps belong in puncture-resistant containers for designated hazardous drop-off, and medications in pharmacy take-back kiosks.
   - Food grease ruins paper recycling (e.g., greasy pizza box bottom cannot be recycled with clean paper).
3. Responsible AI & Municipal Realism:
   - Do NOT invent specific local collection centers, phone numbers, or municipal contact details.
   - Clearly advise users that municipal recycling capabilities differ by jurisdiction.
   - If an item's composition is ambiguous, explain conditional handling (e.g., "if clean... if soiled...") and include an uncertainty note.
   - Present advice educationally, not as an authoritative municipal sanitation edict.
4. Output Format: Return strictly the requested JSON matching the schema. Do not output markdown fences or commentary outside the JSON object.
`;

const DEFAULT_TIMEOUT_MS = 5000;

/**
 * Classifies a waste item using the Google Gemini Flash model.
 * Enforces an abort signal timeout (default 5 seconds).
 * Returns null if the API key is not configured, if the API call fails or times out, or if validation fails.
 */
export async function classifyWithGemini(
  rawItem: string,
  timeoutMs: number = DEFAULT_TIMEOUT_MS
): Promise<WasteClassificationResult | null> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Classify this waste item: "${rawItem.trim()}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: WASTE_SCHEMA,
        temperature: 0.2,
        abortSignal: controller.signal,
      },
    });

    clearTimeout(timer);

    const responseText = response.text;
    if (!responseText) {
      return null;
    }

    const parsed = JSON.parse(responseText.trim());

    // Validate parsed structure
    if (
      !parsed ||
      typeof parsed !== "object" ||
      typeof parsed.item !== "string" ||
      !parsed.item.trim() ||
      typeof parsed.category !== "string" ||
      !VALID_CATEGORIES.includes(parsed.category as WasteCategory) ||
      typeof parsed.disposal_method !== "string" ||
      !parsed.disposal_method.trim() ||
      typeof parsed.explanation !== "string" ||
      !parsed.explanation.trim() ||
      typeof parsed.sustainability_tip !== "string" ||
      !parsed.sustainability_tip.trim()
    ) {
      return null;
    }

    return {
      item: parsed.item.trim(),
      category: parsed.category as WasteCategory,
      disposal_method: parsed.disposal_method.trim(),
      explanation: parsed.explanation.trim(),
      sustainability_tip: parsed.sustainability_tip.trim(),
      uncertainty_note:
        typeof parsed.uncertainty_note === "string" && parsed.uncertainty_note.trim()
          ? parsed.uncertainty_note.trim()
          : null,
      source: "gemini",
    };
  } catch (err) {
    clearTimeout(timer);
    // Log server diagnostic without logging the API key or raw secret tokens
    console.error(
      "Gemini classification failed; falling back to local engine:",
      (err as Error)?.message || "Unknown error"
    );
    return null;
  }
}
