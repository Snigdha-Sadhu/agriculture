import express from "express";
import { aiAdvisory } from "../controllers/aiController.js";
const router=express.Router();
router.post("/advisory",aiAdvisory);
export default router;