export const fertilizerRules = [
  // --------- NITROGEN ---------
  {
    deficiency: "nitrogen",
    suggestion:
      "Improve nitrogen naturally by adding green manure, farmyard manure, or vermicompost.",
    chemical:
      "Nitrogen-based fertilizers like urea may be used in limited quantity if organic sources are not sufficient."
  },

  // --------- PHOSPHORUS ---------
  {
    deficiency: "phosphorus",
    suggestion:
      "Use bone meal, composted poultry manure, or rock phosphate to improve phosphorus availability.",
    chemical:
      "Phosphorus fertilizers such as single super phosphate (SSP) may be applied based on soil condition."
  },

  // --------- POTASSIUM ---------
  {
    deficiency: "potassium",
    suggestion:
      "Incorporate wood ash, crop residue compost, or potash-rich organic matter into the soil.",
    chemical:
      "Potassium fertilizers like muriate of potash (MOP) can be considered if deficiency is observed."
  },

  // --------- LOW N + LOW P ---------
  {
    deficiency: "nitrogen_phosphorus",
    suggestion:
      "Apply organic compost along with legume-based green manure to improve overall soil fertility.",
    chemical:
      "Balanced fertilizers containing nitrogen and phosphorus may be used cautiously after soil testing."
  },

  // --------- LOW N + LOW K ---------
  {
    deficiency: "nitrogen_potassium",
    suggestion:
      "Use vermicompost and mulching to improve nutrient retention and soil structure.",
    chemical:
      "A combination of nitrogen and potassium fertilizers may be applied under expert guidance."
  },

  // --------- LOW P + LOW K ---------
  {
    deficiency: "phosphorus_potassium",
    suggestion:
      "Add organic matter such as compost mixed with wood ash to enrich the soil.",
    chemical:
      "Phosphorus and potassium fertilizers may be applied together if required."
  },

  // --------- GENERAL LOW FERTILITY ---------
  {
    deficiency: "general",
    suggestion:
      "Improve soil health through composting, crop rotation, and organic amendments.",
    chemical:
      "Balanced NPK fertilizers may be used carefully to restore overall nutrient levels."
  }
];
