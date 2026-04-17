import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGO_URL;


export default async function connectDB(){
    if(!MONGODB_URI){
        throw new Error("MONGODB_URI Not Found")
    }
    if(mongoose.connection.readyState===1)return;
    await mongoose.connect(MONGODB_URI);

}