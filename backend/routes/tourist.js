import express from "express";
import { getTourist } from "../controllers/tourist.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getTourist);

export default router;
