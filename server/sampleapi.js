import dotenv from "dotenv";
dotenv.config();
import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// 1. Corrected URL (Based on FarmSuite Dev Portal)
const UJUZI_API_URL = "https://api.ujuzikilimo.com/v1/crop-recommendations";

// 2. Corrected Key handling (Ensure this is in your .env file)
const UJUZI_API_KEY = process.env.UJUZI_API_KEY;

app.post("/api/crop-advice", async (req, res) => {
  const { season, soilType, n, p, k, state, district } = req.body;

  // 3. Proper Validation
  if (!soilType || !n || !p || !k || !state || !district) {
    return res.status(400).json({ success: false, message: "Please provide all fields: soilType, n, p, k, state, district, season" });
  }

  try {
    const payload = {
      location: { state, district, country: "India" },
      soil_properties: {
        nitrogen: Number(n),
        phosphorus: Number(p),
        potassium: Number(k),
        ph: 6.5,
        type: soilType 
      },
      season: season
    };

    const response = await axios.post(UJUZI_API_URL, payload, {
      headers: {
        "Authorization": `Bearer ${UJUZI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    res.json({ success: true, data: response.data });

  } catch (error) {
    // This will now tell you if it's a DNS error or an API rejection
    console.log(error);
    console.error("Error Detail:", error.code === 'ENOTFOUND' ? "Domain not found" : error.message);
    res.status(500).json({ success: false, error: "Could not reach Crop API" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));