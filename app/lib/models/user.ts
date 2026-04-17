import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    age:Number,
    gender:String,
    company:String,
    Profile:String,
    address:String
},{
    timestamps:true
})

export const User = mongoose.models.User || mongoose.model("User",userSchema);