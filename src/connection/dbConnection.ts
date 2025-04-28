import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/bookstore";
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}; 