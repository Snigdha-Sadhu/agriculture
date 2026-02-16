

import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import FertilizerUsage from "./models/FertilizerUsage.js"; // adjust path



const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    const data = [

  /* ===== More data for Feb 2025 (Potato trend) ===== */
  {
    farmerId: "farmer6",
    state: "West Bengal",
    district: "Bardhaman",
    soil: "alluvial",
    crop: "Potato",
    n: "medium",
    p: "low",
    k: "medium",
    organicUsed: true,
    chemicalUsed: false,
    createdAt: new Date("2025-02-08")
  },
  {
    farmerId: "farmer7",
    state: "West Bengal",
    district: "Hooghly",
    soil: "alluvial",
    crop: "Potato",
    n: "medium",
    p: "medium",
    k: "medium",
    organicUsed: true,
    chemicalUsed: true,
    createdAt: new Date("2025-02-15")
  },
  {
    farmerId: "farmer8",
    state: "West Bengal",
    district: "Nadia",
    soil: "alluvial",
    crop: "Potato",
    n: "low",
    p: "medium",
    k: "medium",
    organicUsed: false,
    chemicalUsed: true,
    createdAt: new Date("2025-02-20")
  },

  /* ===== More data for Jan 2025 (Wheat trend) ===== */
  {
    farmerId: "farmer9",
    state: "West Bengal",
    district: "Hooghly",
    soil: "alluvial",
    crop: "Wheat",
    n: "medium",
    p: "medium",
    k: "low",
    organicUsed: true,
    chemicalUsed: false,
    createdAt: new Date("2025-01-10")
  },
  {
    farmerId: "farmer10",
    state: "Punjab",
    district: "Ludhiana",
    soil: "black",
    crop: "Wheat",
    n: "low",
    p: "medium",
    k: "medium",
    organicUsed: true,
    chemicalUsed: true,
    createdAt: new Date("2025-01-22")
  },

  /* ===== More data for Mar 2026 (Cotton trend) ===== */
  {
    farmerId: "farmer11",
    state: "Maharashtra",
    district: "Nagpur",
    soil: "black",
    crop: "Cotton",
    n: "medium",
    p: "medium",
    k: "medium",
    organicUsed: true,
    chemicalUsed: false,
    createdAt: new Date("2026-03-05")
  },
  {
    farmerId: "farmer12",
    state: "Maharashtra",
    district: "Amravati",
    soil: "black",
    crop: "Cotton",
    n: "low",
    p: "medium",
    k: "medium",
    organicUsed: false,
    chemicalUsed: true,
    createdAt: new Date("2026-03-18")
  }
];




    await FertilizerUsage.insertMany(data);
    console.log("Seed data inserted successfully");

    mongoose.disconnect();
  } catch (error) {
    console.error(error);
    mongoose.disconnect();
  }
};

seedData();
