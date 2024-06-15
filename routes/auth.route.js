import express from "express";

import validateToken, { getDean } from "../middleware/auth.middleware.js";
import {
  Login,
  Signup,
  getAllUsers,
  getChiefPorters,
} from "../controllers/auth.controller.js";

const router = express.Router();

router
  .get("/", validateToken, getDean, getAllUsers)
  .post("/signup", Signup)
  .post("/login", Login)
  .get("/getChiefPorters", getChiefPorters);

export default router;
