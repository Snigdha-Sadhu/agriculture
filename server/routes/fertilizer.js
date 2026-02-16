import express from "express";
import {fertilizerController} from "../controllers/fertilizerController.js";
const router=express.Router();
router.post("/advice",fertilizerController);
export default router;
