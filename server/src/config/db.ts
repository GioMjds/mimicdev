import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};