import express from "express";
import {
  createExeat,
  deleteExeat,
  getAllExeats,
  getExeatByChiefPorter,
  getSingleExeat,
  updateExeat,
} from "../controllers/exeat.controller.js";
import validateToken from "../middleware/auth.middleware.js";

const route = express.Router();

route
  .get("/", getAllExeats)
  .post("/", createExeat)
  .get("/getCExeats", validateToken, getExeatByChiefPorter)
  .patch("/:id", updateExeat)
  .get("/:id", getSingleExeat)
  .delete("/:id", deleteExeat);

export default route;
