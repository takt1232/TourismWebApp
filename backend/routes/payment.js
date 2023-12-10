import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addPayment,
  deletePayment,
  getPayment,
  getPayments,
} from "../controllers/payment.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getPayment);
router.get("/", verifyToken, getPayments);

router.post("/addPayment", verifyToken, addPayment);

router.delete("/delete/:id", verifyToken, deletePayment);

export default router;
