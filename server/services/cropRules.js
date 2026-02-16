export const cropRules = [
  // ---------------- ALLUVIAL ----------------
  {
    soil: "alluvial",
    season: "rabi",
    water: "medium",
    npk: { n: "medium", p: "high", k: "medium" },
    crops: ["Wheat", "Mustard", "Potato"]
  },
  {
    soil: "alluvial",
    season: "kharif",
    water: "high",
    npk: { n: "high", p: "medium", k: "medium" },
    crops: ["Rice", "Jute"]
  },
  {
    soil: "alluvial",
    season: "zaid",
    water: "medium",
    npk: { n: "medium", p: "medium", k: "low" },
    crops: ["Cucumber", "Watermelon"]
  },

  // ---------------- BLACK ----------------
  {
    soil: "black",
    season: "kharif",
    water: "low",
    npk: { n: "medium", p: "medium", k: "high" },
    crops: ["Cotton", "Soybean"]
  },
  {
    soil: "black",
    season: "rabi",
    water: "low",
    npk: { n: "medium", p: "low", k: "high" },
    crops: ["Chickpea", "Sorghum"]
  },

  // ---------------- RED ----------------
  {
    soil: "red",
    season: "rabi",
    water: "low",
    npk: { n: "low", p: "medium", k: "medium" },
    crops: ["Millets", "Groundnut"]
  },
  {
    soil: "red",
    season: "kharif",
    water: "medium",
    npk: { n: "medium", p: "medium", k: "low" },
    crops: ["Maize", "Pulses"]
  },

  // ---------------- LATERITE ----------------
  {
    soil: "laterite",
    season: "kharif",
    water: "high",
    npk: { n: "low", p: "low", k: "medium" },
    crops: ["Rice", "Cashew"]
  },
  {
    soil: "laterite",
    season: "rabi",
    water: "medium",
    npk: { n: "medium", p: "low", k: "medium" },
    crops: ["Sweet Potato", "Pineapple"]
  },

  // ---------------- SANDY ----------------
  {
    soil: "sandy",
    season: "zaid",
    water: "low",
    npk: { n: "low", p: "low", k: "low" },
    crops: ["Watermelon", "Muskmelon"]
  },
  {
    soil: "sandy",
    season: "rabi",
    water: "low",
    npk: { n: "medium", p: "low", k: "low" },
    crops: ["Barley", "Cumin"]
  },

  // ---------------- LOAMY ----------------
  {
    soil: "loamy",
    season: "rabi",
    water: "medium",
    npk: { n: "high", p: "medium", k: "medium" },
    crops: ["Wheat", "Vegetables"]
  },
  {
    soil: "loamy",
    season: "kharif",
    water: "medium",
    npk: { n: "medium", p: "medium", k: "medium" },
    crops: ["Sugarcane", "Maize"]
  },
  {
    soil: "loamy",
    season: "zaid",
    water: "high",
    npk: { n: "high", p: "medium", k: "low" },
    crops: ["Tomato", "Okra"]
  }
];
