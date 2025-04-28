import express, { Request, Response, Router } from "express";
import { healthCheck } from "../services/public.service.js";
import BookRouter from "../controller/book.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router: Router = express.Router();
router.get("/health", healthCheck);
router.get("/", healthCheck);
router.use("/books", authenticateToken,BookRouter)

export default router;
