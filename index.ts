import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./src/connection/dbConnention";
import router from "./src/routes/route";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(port, async () => {
    console.log(`Express server started at Port - ${port}`);
    await dbConnection();
});

