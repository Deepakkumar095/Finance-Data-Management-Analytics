import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";

dotenv.config(); // 👈 env variables load karega

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
]);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); 
        console.log("MongoDB connected successfully");
    } 
    catch (error) {
        console.log("MongoDB connection failed", error);
    }
};

export default connectDB;