/*import {agriAdvisorySchema} from"../services/aiService.js"
import {GoogleGenerativeAI} from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const aiAdvisory=async(req,res)=>{
    try{
        console.log(req.body);
        console.log("API KEY:", process.env.GEMINI_API_KEY.trim());
        const{farmerData,recommendedCrop,language}=req.body;
        const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: agriAdvisorySchema,
      },
    });
//Construct prompt dynamically for multilingual explanation
const prompt=` You are an expert agricultural advisor speaking in ${language}.
      Explain why the crop "${recommendedCrop}" is suitable for soil type "${farmerData.soil}", 
      season "${farmerData.season}", and water availability "${farmerData.water}".
      Provide a list of recommended fertilizers, organic fertilizer tips, eco-friendly farming practices,
      warnings for farmers, and suggest alternate crops suitable in this context.
      Respond strictly in JSON format following the given schema.
    `
    const result=await model.generateContent(prompt);
console.log(result)
const responseText = result.response.text();
    const advisory = JSON.parse(responseText);

    res.status(200).json({
      success: true,
      advisory
    });
    }catch(err){
        console.error("FULL AI ERROR 👉", err);
   res.status(500).json({
     success: false,
     message: err.message,
     stack: err.stack
   });
    }
}*/
import dotenv from "dotenv";
dotenv.config();
import { agriAdvisorySchema } from "../services/aiService.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import AdvisoryHistory from "../models/Advisory.js";
import FertilizerUsage from "../models/FertilizerUsage.js";

// 1. Sanitize key to prevent Windows-specific 400 errors
const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : null;

if (!apiKey) {
    console.error(" ERROR: GEMINI_API_KEY is missing from .env file!");
}
const genAI = new GoogleGenerativeAI(apiKey || "");
export const aiAdvisory = async (data) => {
  console.log(data);
  try {
    const { farmerData, recommendedCrop, language } = data;

    // 2. Initialize the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: agriAdvisorySchema,
      },
    });

    // 3. Dynamic Prompt (Specific instruction for language values)
    const prompt = `
      You are an expert agricultural advisor. 
      Analyze the suitability of "${recommendedCrop}" for soil "${farmerData.soil}", 
      season "${farmerData.season}", and water "${farmerData.water}".
      
      Instructions:
      - All text values in the JSON must be in ${language}.
      - Keep JSON keys exactly as defined in the schema.
      - Provide eco-friendly and practical advice.
    `;

    const result = await model.generateContent(prompt);
    
    // 4. Safe direct parsing
    const responseText = result.response.text();
    const advisory = JSON.parse(responseText);

await AdvisoryHistory.create({
  farmerId:farmerData.farmerId|| "demo_farmer",
  soil: farmerData.soil,
  season:farmerData.season,
  water:farmerData.water,
  recommendedCrop:recommendedCrop,
  advisory
});

    return({
      success: true,
      advisory
    });

  } catch (err) {
    console.error("AI ADVISORY ERROR:", err);
    return({
      success: false,
      message: "Could not generate agricultural advisory.",
      error: err.message
    });
  }
};


const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
function buildBatchPrompt(message, practices, language) {
  const langMap = { bn: "Bengali", hi: "Hindi" };

  return `
You are a translation engine.

Translate the following content into ${langMap[language]}.

STRICT RULES:
- Translate ONLY
- No explanations
- No English words
- Keep order exactly
- Output in VALID JSON only

Output format:
{
  "message": "<translated message>",
  "practices": [
    "<practice 1>",
    "<practice 2>",
    "<practice 3>"
  ]
}

Content:
Message:
${message}

Practices:
${practices.map((p, i) => `${i + 1}. ${p}`).join("\n")}
`;
}

export async function translateText(advice, language) {
  if (!advice || language === "en") return advice;

   const prompt = buildBatchPrompt(
    advice.message,
    advice.practices,
    language
  );

  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text();
const jsonText = raw
  .match(/\{[\s\S]*\}/)?.[0]
  ?.replace(/[“”]/g, '"')  // smart quotes → normal
  ?.replace(/,\s*}/g, '}') // trailing commas
  ?.replace(/,\s*]/g, ']');

if (!jsonText) throw new Error("No JSON found");

const json = JSON.parse(jsonText);


    return {
      ...advice,
      message: json.message,
      practices: json.practices
    };
  } catch (err) {
    console.error("Batch translation failed:", err);
    return advice;
  }
}
