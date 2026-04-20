import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:Number,
    email:String,
    type:Number,
    expiresAt:Date
},{
    timestamps:true
})

export const OTP = mongoose.models.OTP || mongoose.model("OTP",otpSchema);