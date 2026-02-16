import { getCropRecommendation } from "../services/cropEngine.js";

export const recommendCrop=(req,res)=>{
    try{
        const crops=getCropRecommendation(req.body);
        res.json({
            success:true,
            recommendedCrops:crops
        })
    }catch(err){
        res.status(500).json({success:false,message:"Crop engine error"})
    }
}