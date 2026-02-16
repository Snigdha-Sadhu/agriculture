import mongoose from "mongoose";
const fertilizerSchema=new mongoose.Schema({
    farmerId:String,
    soil:String,
    crop:String,
    state:String,
    district:String,
    n:String,
    p:String,
    k:String,
    organicUsed:Boolean,
    chemicalUsed:Boolean,
    date:{type:Date,default:Date.now}
},{ timestamps: true })
export default mongoose.model("FertilizerUsage",fertilizerSchema);