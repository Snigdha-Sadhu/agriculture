import { getCropRecommendation } from "../services/cropEngine.js";
import { getFertilizerAdvice } from "../services/fertilizerEngine.js";
import FertilizerUsage from "../models/FertilizerUsage.js";
import { aiAdvisory } from "./aiController.js";
import { recommendCrop } from "./cropController.js";
export const fertilizerController = async (req, res) => {
  console.log(req.body);
  try {
    const farmerId = req.farmer?.id || "demo";

    const { soil, season, water, n, p, k, language,state,district } = req.body;

    // 1️⃣ Crop recommendation
    const crops = getCropRecommendation({ soil, season, water, n, p, k });

    if (!crops || crops.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No crops recommended based on input"
      });
    }

    // 2️⃣ Fertilizer advice (use FIRST crop for advisory)
    const fertilizerAdvice =await getFertilizerAdvice(
      { n, p, k },
      crops[0],language
    );

    // 3️⃣ Save fertilizer usage (analytics)
    for (const crop of crops) {
      await FertilizerUsage.create({
        farmerId,
        soil,
        crop,
        state,
        district,
        n,
        p,
        k,
        organicUsed: fertilizerAdvice.organicUsed,
        chemicalUsed: fertilizerAdvice.chemicalUsed,
        
      });
    }

    // 4️⃣ AI Advisory (SERVICE, not controller)
    const aiAdvisoryResponse = await aiAdvisory({
      farmerData: { soil, season, water, n, p, k },
      recommendedCrop: crops[0],
      fertilizerMode: fertilizerAdvice.mode,
      language: language || "English"
    });
console.log("response is",fertilizerAdvice)
    // 5️⃣ Response
    res.json({
      success: true,
      recommendedCrops: crops,
      fertilizerAdvice,
      aiAdvisory: aiAdvisoryResponse
    });

  } catch (error) {
    console.error("Fertilizer Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
