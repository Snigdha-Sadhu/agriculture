import { fertilizerRules } from "./fertilizerRules.js";
import { translateText } from "../controllers/aiController.js";
export const getFertilizerAdvice = async(soilData, crops,language) => {
  console.log("here")
  const { n, p, k } = soilData;

  // 1️⃣ CASE: Soil is fully deficient → Organic recovery mode
  if (n === "low" && p === "low" && k === "low") {
    const message=
        "Soil is highly nutrient-deficient. Immediate organic soil recovery is recommended before chemical use."
    const organicOnly= [
        "Apply compost (5–10 tons/acre)",
        "Use vermicompost",
        "Grow green manure crops (sunhemp, dhaincha)",
        "Apply farmyard manure / cow dung",
        "Use bio-fertilizers (Azotobacter, PSB, Rhizobium)"
      ];
    return {
      mode: "ORGANIC_RECOVERY",
      message: await translateText(message, language),
      organicOnly: await Promise.all(
        organicOnly.map(item => translateText(item, language))
      ),
     
      organicUsed: true,
      chemicalUsed: false
    };
  }

  // 2️⃣ Check individual nutrient deficiencies
  const deficiencies = [];
  if (n === "low") deficiencies.push("nitrogen");
  if (p === "low") deficiencies.push("phosphorus");
  if (k === "low") deficiencies.push("potassium");

  // 3️⃣ CASE: No deficiency → Maintenance advice
  if (deficiencies.length === 0) {
    const message=
        "Soil nutrients are sufficient for the selected crop. Maintain soil health using organic practices."
    const  practices=[
        "Apply compost or FYM once per season",
        "Rotate crops to avoid nutrient depletion",
        "Avoid unnecessary chemical fertilizers"
      ];
    const advice = {
  mode: "MAINTENANCE",
  message,
  practices,
  organicUsed: true,
  chemicalUsed: false
};

return await translateText(advice, language);
  }

  // 4️⃣ CASE: Partial deficiencies → Targeted advice
 
 // 4️⃣ CASE: Partial deficiencies → Targeted advice
const advice = await Promise.all(
  deficiencies.map(async (def) => {
    const rule = fertilizerRules.find(r => r.deficiency === def);

    // Build batch-translation input
    const adviceObj = {
      message: rule?.organic || "Use organic manure",
      practices: rule?.chemical ? [rule.chemical] : []
    };

    // Single translation call
    const translated = await translateText(adviceObj, language);

    return {
      nutrient: def,
      organic: translated.message,
      chemical: translated.practices.length
        ? translated.practices[0]
        : null
    };
  })
);


  return {
    mode: "TARGETED_NUTRITION",
    crops,
    advice,
    organicUsed: true,
    chemicalUsed: advice.some(a => a.chemical !== null)
  };
};
