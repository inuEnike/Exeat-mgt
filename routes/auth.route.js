import express from "express";

import validateToken, { getDean } from "../middleware/auth.middleware.js";
import { Login, Signup, getAllUsers } from "../controllers/auth.controller.js";

const router = express.Router();

router
  .get("/", validateToken, getDean, getAllUsers)
  .post("/signup", Signup)
  .post("/login", Login);

export default router;
