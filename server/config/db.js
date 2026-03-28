import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        const mongoUri = process.env.MONGODB_URI?.replace(/\/+$/, '');

        if (!mongoUri) {
            throw new Error("MONGODB_URI is not configured");
        }

        mongoose.connection.on('connected', ()=> console.log("database connected"))
        await mongoose.connect(`${mongoUri}/postcraft`)
        
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

export default connectDB;
