import { WasteClassificationResult } from "@/types/waste";

/**
 * Normalizes input text for keyword matching
 */
function normalizeText(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s]/g, " ");
}

/**
 * Deterministic local fallback classification engine.
 * Provides accurate, safe, and educational waste disposal recommendations
 * when Google Gemini is unavailable, unconfigured, or returns an error.
 */
export function getFallbackClassification(rawItem: string): WasteClassificationResult {
  const normalized = normalizeText(rawItem);

  // 1. Plastic water bottle / bottles
  if (
    normalized.includes("water bottle") ||
    normalized.includes("plastic bottle") ||
    normalized.includes("pet bottle") ||
    (normalized.includes("plastic") && normalized.includes("bottle"))
  ) {
    return {
      item: "Plastic water bottle",
      category: "Recyclable",
      disposal_method:
        "Empty remaining liquid, rinse lightly, reattach the plastic cap, and place in the plastics/recycling bin.",
      explanation:
        "PET (#1) and HDPE (#2) plastic bottles are widely accepted in municipal recycling and can be remanufactured into new bottles and textiles.",
      sustainability_tip:
        "Switch to a reusable stainless steel or BPA-free water bottle to avoid single-use plastic waste.",
      uncertainty_note: null,
      source: "fallback",
    };
  }

  // 2. Used tissue / napkins / paper towels
  if (
    normalized.includes("tissue") ||
    normalized.includes("used napkin") ||
    normalized.includes("napkin") ||
    normalized.includes("paper towel") ||
    normalized.includes("facial tissue") ||
    normalized.includes("wet wipe")
  ) {
    return {
      item: "Used tissue",
      category: "Landfill / General Waste",
      disposal_method:
        "Place in the general waste / landfill bin. If your municipality explicitly accepts food-soiled unbleached paper in green compost bins, place it there.",
      explanation:
        "Used tissues carry hygiene residues and have short, broken wood fibers that cannot be effectively pulped during paper recycling.",
      sustainability_tip:
        "Use washable cloth towels or handkerchiefs for non-hygiene daily cleaning to reduce disposable paper usage.",
      uncertainty_note:
        "Check whether your local municipality accepts non-chemical soiled tissue in organic green bins.",
      source: "fallback",
    };
  }

  // 3. Pizza box with leftover food / greasy cardboard
  if (
    normalized.includes("pizza") ||
    (normalized.includes("greas") && normalized.includes("box")) ||
    (normalized.includes("food") && normalized.includes("box"))
  ) {
    return {
      item: "Pizza box with leftover food",
      category: "Organic / Compostable",
      disposal_method:
        "Scrape all leftover food and cheese into the compost/organics bin. Tear off the greasy bottom cardboard for compost or general waste; if the top lid is clean and dry, tear it off and recycle it.",
      explanation:
        "Grease and food oils cannot be washed out during paper recycling; they coat the pulp fibers and ruin entire paper recycling batches.",
      sustainability_tip:
        "Place a sheet of foil or parchment under your pizza next time to keep the box clean and fully recyclable.",
      uncertainty_note:
        "Soiled cardboard cannot be recycled with clean paper. If compost collection is unavailable in your area, dispose of greasy parts in general waste.",
      source: "fallback",
    };
  }

  // 4. Old mobile phone / electronics / battery
  if (
    normalized.includes("phone") ||
    normalized.includes("mobile") ||
    normalized.includes("smartphone") ||
    normalized.includes("cell") ||
    normalized.includes("laptop") ||
    normalized.includes("electronics") ||
    normalized.includes("battery") ||
    normalized.includes("e waste")
  ) {
    return {
      item: "Old mobile phone",
      category: "Hazardous / E-Waste",
      disposal_method:
        "Do NOT place in curbside trash or standard recycling bins. Back up and wipe personal data, then drop off at an authorized e-waste collection center, participating electronics retailer, or municipal collection event.",
      explanation:
        "Electronics and rechargeable batteries contain lithium, cobalt, and heavy metals that pose severe fire risks in waste facilities and leach toxins into soil if landfilled.",
      sustainability_tip:
        "Consider trade-in programs, donating functional devices to charities, or manufacturer refurbishment programs.",
      uncertainty_note:
        "Electronic waste regulations require designated drop-off sites. Check your city's e-waste program for drop-off locations.",
      source: "fallback",
    };
  }

  // 5. Glass bottle / jar
  if (
    normalized.includes("glass bottle") ||
    normalized.includes("glass jar") ||
    normalized.includes("wine bottle") ||
    normalized.includes("beer bottle") ||
    (normalized.includes("glass") && !normalized.includes("broken glass") && !normalized.includes("window"))
  ) {
    return {
      item: "Glass bottle",
      category: "Recyclable",
      disposal_method:
        "Empty contents, rinse cleanly, and place in the glass or commingled recycling bin. Remove non-glass corks or bottle caps if required locally.",
      explanation:
        "Container glass is 100% recyclable indefinitely without degradation in quality or purity, significantly reducing virgin sand extraction.",
      sustainability_tip:
        "Wash and repurpose sturdy glass jars at home for pantry food storage, crafting, or organization.",
      uncertainty_note:
        "Applies to container glass (bottles/jars). Window panes, mirrors, Pyrex, and ceramics melt at different temperatures and must not mix with bottle recycling.",
      source: "fallback",
    };
  }

  // Additional common materials for robust fallback
  if (
    normalized.includes("apple") ||
    normalized.includes("banana") ||
    normalized.includes("food scrap") ||
    normalized.includes("vegetable") ||
    normalized.includes("coffee ground") ||
    normalized.includes("egg shell")
  ) {
    return {
      item: rawItem.trim(),
      category: "Organic / Compostable",
      disposal_method:
        "Place into your organic waste bin, yard waste bin, or home compost pile.",
      explanation:
        "Pure organic matter decomposes naturally into nutrient-dense compost rather than producing methane in sealed landfills.",
      sustainability_tip:
        "Start a home compost bin or vermiculture box to convert kitchen scraps into organic fertilizer for houseplants.",
      uncertainty_note: null,
      source: "fallback",
    };
  }

  if (
    normalized.includes("cardboard") ||
    normalized.includes("paper") ||
    normalized.includes("can") ||
    normalized.includes("tin") ||
    normalized.includes("aluminum")
  ) {
    return {
      item: rawItem.trim(),
      category: "Recyclable",
      disposal_method:
        "Ensure the item is clean and dry, flatten if applicable, and place in your standard recycling bin.",
      explanation:
        "Clean dry paper, cardboard, aluminum, and tin are high-value commodities that are easily melted or pulped into new materials.",
      sustainability_tip:
        "Opt for products with minimal packaging or packaging made from high percentages of post-consumer recycled content.",
      uncertainty_note:
        "Ensure the item is free of grease, wax coatings, or heavy food contamination.",
      source: "fallback",
    };
  }

  // General safe fallback
  return {
    item: rawItem.trim(),
    category: "Landfill / General Waste",
    disposal_method:
      "When in doubt, place in the general waste / landfill bin to avoid contaminating clean recycling streams, or consult your local municipal waste directory.",
      explanation:
      "Recycling contamination (wishcycling) is a leading cause of entire truckloads of recyclables being diverted to landfills. Items made of mixed or uncertain materials belong in general waste unless verified.",
    sustainability_tip:
      "Investigate your local municipal sorting guidelines or contact local sanitation services for specific item acceptance rules.",
    uncertainty_note:
      "Item categorized via standard baseline rules. Municipal waste management facilities vary significantly across jurisdictions.",
    source: "fallback",
  };
}
