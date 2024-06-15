import express from "express";
import {
  createHostel,
  getAllHostels,
  updateHostel,
  deleteHostel,
} from "../controllers/hostel.controller.js";

const router = express.Router();

// Routes for handling hostel CRUD operations
router.get("/", getAllHostels);
router.post("/", createHostel);
router.patch("/:id", updateHostel);
router.delete("/:id", deleteHostel);

export default router;
