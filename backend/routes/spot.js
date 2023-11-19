import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getFeedSpots, getTouristSpots } from "../controllers/spot.js";

const router = express.Router();

//Read All Spot
router.get("/", verifyToken, getFeedSpots);
router.get("/:userId/posts", verifyToken, getTouristSpots);

export default router;
