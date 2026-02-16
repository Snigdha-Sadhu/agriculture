import mongoose from "mongoose";

const advisorySchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  soil: String,
  season: String,
  water: String,
  recommendedCrop: String,

  advisory: {
    cropSuitabilityExplanation: String,
    recommendedFertilizers: [String],
    organicFertilizerTips: String,
    ecoFriendlyPractices: String,
    warnings: String,
    alternateCrops: [String]
  }
}, { timestamps: true });

export default mongoose.model("AdvisoryHistory", advisorySchema);
