import Router from "express-promise-router";
import { healthCheck } from "../services/public.service";

const router = Router();
router.get("/health", healthCheck);
router.get("/", healthCheck);

export default router;
