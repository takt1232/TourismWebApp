import express from "express";
import { getTourist, getTouristPicturePath } from "../controllers/tourist.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getTourist);
router.get("/:id/picturePath", verifyToken, getTouristPicturePath);

export default router;
