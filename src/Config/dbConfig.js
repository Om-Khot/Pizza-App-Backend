import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";
async function connectDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to database');
    }
     catch (error) {
        console.error(error);
        console.log('Failed to connect to database');
    }
}

export default connectDB;