import { connect } from 'mongoose';

export const dbConnection = async () => {
    try {
        const DB_CONNECTION: string = process.env.DB_CONNECTION || "";
        await connect(DB_CONNECTION, { dbName: 'workspace' });
        console.log("[INFO] DB connected successfully!!");

    } catch (error) {
        console.error("[ERROR] in DB Connection:", error);
    }
}