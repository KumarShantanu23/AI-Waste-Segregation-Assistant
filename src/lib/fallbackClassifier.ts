import { WasteClassificationResult } from "@/types/waste";

/**
 * Normalizes input text for keyword matching
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ");
}

/**
 * Deterministic local fallback classification engine.
 * Provides accurate, safe, and educational waste disposal recommendations
 * when Google Gemini is unavailable, unconfigured, rate-limited, or returns an error.
 */
export function getFallbackClassification(rawItem: string): WasteClassificationResult {
  const normalized = normalizeText(rawItem);

  // 1. Broken glass / shattered glass / mirror / window shards
  // High-priority safety rule: MUST NEVER be classified as recyclable!
  if (
    normalized.includes("broken glass") ||
    normalized.includes("shattered glass") ||
    normalized.includes("broken bottle") ||
    normalized.includes("broken mirror") ||
    normalized.includes("broken window") ||
    normalized.includes("shattered") ||
    (normalized.includes("glass") && normalized.includes("broken")) ||
    (normalized.includes("glass") && normalized.includes("shard"))
  ) {
    return {
      item: rawItem.trim(),
      category: "Landfill / General Waste",
      disposal_method:
        "Do NOT place in curbside recycling bins. Carefully wrap broken glass in several layers of thick newspaper or cardboard, place inside a rigid puncture-resistant box, seal securely with heavy tape, and label clearly as 'CAUTION: BROKEN GLASS' before placing into general landfill waste.",
      explanation:
        "Broken glass is a severe puncture and laceration hazard for sanitation workers and manual sorting staff. Furthermore, shattered fragments embed into paper and plastic streams, contaminating entire batches at recycling recovery facilities.",
      sustainability_tip:
        "Handle intact glassware with care to allow reuse or 100% circular bottle-to-bottle recycling. Avoid exposing glass to rapid temperature shocks to prevent breakage.",
      uncertainty_note:
        "Broken glass is strictly prohibited in curbside recycling bins across virtually all municipalities. Rigid wrapping is required to protect sanitation personnel.",
      source: "fallback",
    };
  }

  // 2. Medical sharps, needles, syringes & biohazard waste
  // High-priority safety rule: Severe biological and needle-stick hazard
  if (
    normalized.includes("syringe") ||
    normalized.includes("needle") ||
    normalized.includes("sharps") ||
    normalized.includes("lancet") ||
    normalized.includes("scalpel") ||
    normalized.includes("medical waste") ||
    normalized.includes("biohazard") ||
    normalized.includes("iv bag") ||
    normalized.includes("iv tube")
  ) {
    return {
      item: rawItem.trim(),
      category: "Hazardous / E-Waste",
      disposal_method:
        "Do NOT place loose in household trash or recycling bins. Immediately place into an FDA-cleared sharps container or a heavy-duty, puncture-resistant plastic container (such as a laundry detergent bottle) with a screw-on lid sealed with heavy tape and labeled 'BIOHAZARD / SHARPS'. Deliver to an authorized hospital, pharmacy take-back drop-box, or municipal hazardous waste facility.",
      explanation:
        "Used needles, syringes, and medical sharps carry severe laceration, puncture, and bloodborne pathogen infection risks for waste collection workers and sorting facility staff.",
      sustainability_tip:
        "Inquire with your healthcare provider or local pharmacy about pre-paid mail-back sharps container programs or approved community drop-box kiosks.",
      uncertainty_note:
        "Medical sharps disposal is strictly regulated by state and local public health authorities. Never dispose of medical sharps in curbside recycling or loose household trash.",
      source: "fallback",
    };
  }

  // 3. Pharmaceuticals, expired medications & prescription drugs
  if (
    normalized.includes("expired medicine") ||
    normalized.includes("medicine") ||
    normalized.includes("medication") ||
    normalized.includes("pharmaceutical") ||
    normalized.includes("pill") ||
    normalized.includes("capsule") ||
    normalized.includes("antibiotic") ||
    normalized.includes("painkiller") ||
    normalized.includes("aspirin") ||
    normalized.includes("cough syrup") ||
    normalized.includes("prescription") ||
    normalized.includes("drug")
  ) {
    return {
      item: rawItem.trim(),
      category: "Hazardous / E-Waste",
      disposal_method:
        "Do NOT flush down the toilet, pour down the sink drain, or throw loose into household trash. Take unused or expired medicines to an authorized community pharmacy drug take-back kiosk, hospital collection receptacle, or DEA National Prescription Drug Take Back day.",
      explanation:
        "Flushed or landfilled pharmaceuticals bypass municipal wastewater filtration, leaching active pharmaceutical ingredients into rivers, lakes, and drinking water reservoirs where they harm aquatic organisms and accelerate antimicrobial resistance.",
      sustainability_tip:
        "Purchase over-the-counter medications only in quantities you reasonably expect to use before the expiration date to minimize medical waste.",
      uncertainty_note:
        "If no drug take-back program is available locally, FDA guidance advises mixing medicines with unpalatable substances (such as used coffee grounds or cat litter) in a sealed bag before placing in general trash (unless on the FDA flush list).",
      source: "fallback",
    };
  }

  // 4. Hazardous household chemicals, paint, solvents & batteries
  if (
    normalized.includes("battery") ||
    normalized.includes("batteries") ||
    normalized.includes("lithium") ||
    normalized.includes("chemical") ||
    normalized.includes("paint") ||
    normalized.includes("solvent") ||
    normalized.includes("motor oil") ||
    normalized.includes("engine oil") ||
    normalized.includes("pesticide") ||
    normalized.includes("insecticide") ||
    normalized.includes("fertilizer") ||
    normalized.includes("fluorescent") ||
    normalized.includes("mercury") ||
    normalized.includes("bleach") ||
    normalized.includes("ammonia") ||
    normalized.includes("thinner") ||
    normalized.includes("varnish") ||
    normalized.includes("turpentine")
  ) {
    return {
      item: rawItem.trim(),
      category: "Hazardous / E-Waste",
      disposal_method:
        "Do NOT pour down household drains, into storm sewers, or toss into standard household trash or recycling. Keep in original sealed containers with labels intact and take to a municipal Household Hazardous Waste (HHW) drop-off depot or designated collection event.",
      explanation:
        "Batteries (especially lithium-ion) cause explosive thermal runaway fires when compressed in collection trucks. Household chemicals and paints contain heavy metals, VOCs, and toxic solvents that contaminate soil and municipal water tables.",
      sustainability_tip:
        "Buy only the precise quantity of paint or chemical required for home tasks, and share usable leftover supplies with community organizations or neighbors.",
      uncertainty_note:
        "Many local hardware and home improvement retailers offer free drop-off bins specifically for rechargeable batteries and fluorescent tubes.",
      source: "fallback",
    };
  }

  // 5. Electronics, mobile phones, laptops & computer hardware
  if (
    normalized.includes("phone") ||
    normalized.includes("mobile") ||
    normalized.includes("smartphone") ||
    normalized.includes("cell") ||
    normalized.includes("laptop") ||
    normalized.includes("computer") ||
    normalized.includes("electronics") ||
    normalized.includes("e waste") ||
    normalized.includes("charger") ||
    normalized.includes("cable") ||
    normalized.includes("cord") ||
    normalized.includes("circuit") ||
    normalized.includes("monitor") ||
    normalized.includes("printer")
  ) {
    return {
      item: rawItem.trim(),
      category: "Hazardous / E-Waste",
      disposal_method:
        "Do NOT place in curbside trash or standard recycling bins. Back up and factory-reset your device to wipe personal data, then drop off at an authorized e-waste collection center, participating electronics retailer, or municipal collection event.",
      explanation:
        "Consumer electronics contain precious metals (gold, copper, silver) as well as hazardous lead and brominated flame retardants that pose environmental toxicity if landfilled.",
      sustainability_tip:
        "Consider manufacturer trade-in programs, repair options, or donating functional electronics to charities and educational non-profits.",
      uncertainty_note:
        "Electronic waste regulations require designated drop-off sites in most jurisdictions. Check your municipality's e-waste program for drop-off locations.",
      source: "fallback",
    };
  }

  // 6. Plastic water bottle & clean rigid beverage bottles
  if (
    normalized.includes("water bottle") ||
    normalized.includes("plastic bottle") ||
    normalized.includes("pet bottle") ||
    (normalized.includes("plastic") && normalized.includes("bottle"))
  ) {
    return {
      item: rawItem.trim(),
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

  // 7. Used tissue, napkins, paper towels & sanitary hygiene items
  if (
    normalized.includes("tissue") ||
    normalized.includes("used napkin") ||
    normalized.includes("napkin") ||
    normalized.includes("paper towel") ||
    normalized.includes("facial tissue") ||
    normalized.includes("wet wipe")
  ) {
    return {
      item: rawItem.trim(),
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

  // 8. Pizza box with leftover food / greasy cardboard
  if (
    normalized.includes("pizza") ||
    (normalized.includes("greas") && normalized.includes("box")) ||
    (normalized.includes("food") && normalized.includes("box"))
  ) {
    return {
      item: rawItem.trim(),
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

  // 9. Intact container glass (bottles & jars)
  if (
    normalized.includes("glass bottle") ||
    normalized.includes("glass jar") ||
    normalized.includes("wine bottle") ||
    normalized.includes("beer bottle") ||
    (normalized.includes("glass") &&
      !normalized.includes("broken") &&
      !normalized.includes("shatter") &&
      !normalized.includes("window") &&
      !normalized.includes("mirror"))
  ) {
    return {
      item: rawItem.trim(),
      category: "Recyclable",
      disposal_method:
        "Empty contents, rinse cleanly, and place in the glass or commingled recycling bin. Remove non-glass corks or bottle caps if required locally.",
      explanation:
        "Container glass is 100% recyclable indefinitely without degradation in quality or purity, significantly reducing virgin sand extraction.",
      sustainability_tip:
        "Wash and repurpose sturdy glass jars at home for pantry food storage, crafting, or organization.",
      uncertainty_note:
        "Applies to intact container glass (bottles/jars). Window panes, mirrors, Pyrex, ceramics, and broken glass melt at different temperatures or pose safety hazards and must not mix with bottle recycling.",
      source: "fallback",
    };
  }

  // 10. Organic food scraps & compostables
  if (
    normalized.includes("apple") ||
    normalized.includes("banana") ||
    normalized.includes("food scrap") ||
    normalized.includes("vegetable") ||
    normalized.includes("coffee ground") ||
    normalized.includes("egg shell") ||
    normalized.includes("bread") ||
    normalized.includes("fruit")
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

  // 11. Clean paper, clean cardboard & metal cans
  if (
    normalized.includes("cardboard") ||
    normalized.includes("paper") ||
    normalized.includes("can") ||
    normalized.includes("tin") ||
    normalized.includes("aluminum") ||
    normalized.includes("newspaper") ||
    normalized.includes("magazine")
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

  // 12. General safe fallback for unknown items
  // Communicates uncertainty honestly without confident "place in landfill" messaging
  return {
    item: rawItem.trim(),
    category: "Landfill / General Waste",
    disposal_method:
      "Do not place in recycling if the material composition is unknown or unverifiable. Check your local municipal waste directory or sanitation department website for specific item acceptance rules.",
    explanation:
      "This item could not be confidently classified by the offline rule engine. Composite, mixed-material, or specialized items require verified material identification to prevent recycling stream contamination or safety hazards.",
    sustainability_tip:
      "Check product packaging for standardized recycling symbols (such as How2Recycle labels) or manufacturer take-back programs before disposal.",
    uncertainty_note:
      "Uncertain classification: The offline fallback engine could not identify this specific material. Consult your local municipal waste management guidelines before disposal.",
    source: "fallback",
  };
}
