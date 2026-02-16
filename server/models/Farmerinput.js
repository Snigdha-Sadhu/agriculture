import mongoose from "mongoose";
const farmerInputSchema=new mongoose.Schema({
    farmerId:String,
    soil:String,
    crop:String,
    state:String,
    district:String,
    n:String,
    p:String,
    k:String,
    date:{type:Date,default:Date.now}
},{ timestamps: true })
export default mongoose.model("FarmerInput",farmerInputSchema);