import express from "express";
import {
  deleteAccount,
  getAccount,
  getAllAccount,
} from "../controllers/account.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getAccount);
router.get("/", verifyToken, getAllAccount);

router.delete("/delete/:id", verifyToken, deleteAccount);

export default router;
