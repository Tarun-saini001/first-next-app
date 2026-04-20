import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    age:Number,
    gender:String,
    company:String,
    profile:String,
    address:String,
    password:String,
    email:String,
    isVerified:{ type: Boolean, default: false },
},{
    timestamps:true
})

export const User = mongoose.models.User || mongoose.model("User",userSchema);