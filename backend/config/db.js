import mongoose from "mongoose"

export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Succesfully");
    } catch (error) {
        console.log("err",error);
    }
}