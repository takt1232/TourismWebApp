import express from "express";
import {
  deleteService,
  getCategories,
  getService,
  getServices,
  updateService,
} from "../controllers/service.js";

const router = express.Router();

//Read All Spot
router.get("/", getServices);
router.get("/categories", getCategories);
router.get("/:id", getService);

router.delete("/delete/:id", deleteService);

export default router;
