
import { SchemaType } from "@google/generative-ai";

export const agriAdvisorySchema = {
  type: SchemaType.OBJECT,
  properties: {
    cropSuitabilityExplanation: { type: SchemaType.STRING },
    recommendedFertilizers: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    organicFertilizerTips: { type: SchemaType.STRING },
    ecoFriendlyPractices: { type: SchemaType.STRING },
    warnings: { type: SchemaType.STRING },
    alternateCrops: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
  },
  required: [
    "cropSuitabilityExplanation",
    "recommendedFertilizers",
    "organicFertilizerTips",
    "ecoFriendlyPractices",
    "warnings",
    "alternateCrops"
  ]
};
