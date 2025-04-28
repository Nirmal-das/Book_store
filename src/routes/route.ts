import express, { Request, Response, Router } from "express";
import { healthCheck } from "../services/public.service.js";

const router: Router = express.Router();
router.get("/health", healthCheck);
router.get("/", healthCheck);

export default router;
