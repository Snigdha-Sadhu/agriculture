import express from "express";
import { recommendCrop
    
 } from "../controllers/cropController.js";
 const router=express.Router();
 router.post("/recommend",recommendCrop);
 export default router;
