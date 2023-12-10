import express from "express";
import {
  addBook,
  deleteBook,
  getBook,
  getTotalEntries,
  retrieveBook,
  updateBook,
} from "../controllers/booking.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getBook/:id", verifyToken, getBook);
router.get("/retrieveBook/:id", verifyToken, retrieveBook);
router.get("/count/:id", verifyToken, getTotalEntries);

router.patch("/update/:id", verifyToken, updateBook);

router.post("/addBook", verifyToken, addBook);

router.delete("/delete/:id", verifyToken, deleteBook);

export default router;
