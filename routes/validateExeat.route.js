import express from "express";
import {
  getValidatedExeat,
  validateExeatId,
} from "../controllers/validteExeat.controller.js";
import validateToken from "../middleware/auth.middleware.js";

const route = express.Router();

route.post("/", validateExeatId).get("/", validateToken, getValidatedExeat);

export default route;
