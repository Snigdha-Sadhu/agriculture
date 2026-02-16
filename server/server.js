import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import cropRoutes from "./routes/crop.js";
import  fertilizerRoutes from "./routes/fertilizer.js";
import aiRoutes from"./routes/ai.js";
import analyticsRoutes from "./routes/analytics.js";
const app=express();
app.use(express.json());
app.use(cors({origin:process.env.CLIENT_URL,credentials:true,
   allowedHeaders: ['Content-Type', 'Authorization'], 
}));
 app.use("/api/crop",cropRoutes);
app.use("/api/fertilizer",fertilizerRoutes);
app.use("/api/ai",aiRoutes);
app.use("/api/analytics",analyticsRoutes);
 const PORT=5000;
 mongoose.connect(process.env.MONGO_URL) .then(()=>{
  console.log('mongodb connected');
  app.listen(PORT,()=>console.log(`server running ${PORT}`))
})
