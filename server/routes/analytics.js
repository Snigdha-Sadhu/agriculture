import express from "express";
import { fertilizerTrendOverTime,cropTrendOverTime,soilSustainabilityTrend } from "../controllers/analyticsController.js";
const router=express.Router();
router.get("/farmer/fertilizertrend",fertilizerTrendOverTime);
router.get("/farmer/croptrend",cropTrendOverTime);
router.get("/farmer/soiltrend",soilSustainabilityTrend);
export default router;
