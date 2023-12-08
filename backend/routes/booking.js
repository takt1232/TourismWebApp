import express from "express";
import { addBook, getBook } from "../controllers/booking.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getBook/:id", verifyToken, getBook);
router.post("/addBook", verifyToken, addBook);

export default router;
