import express from "express";
import {
  createExeat,
  deleteExeat,
  getAllExeats,
  getSingleExeat,
  updateExeat,
} from "../controllers/exeat.controller.js";

const route = express.Router();

route
  .get("/", getAllExeats)
  .post("/", createExeat)
  .patch("/:id", updateExeat)
  .get("/:id", getSingleExeat)
  .delete("/:id", deleteExeat);

export default route;
