import { Exeat } from "../models/exeat.model.js";
import jwt from "jsonwebtoken";

export const validateExeatId = async (req, res, next) => {
  const { exeatId } = req.body;
  try {
    if (!exeatId) {
      return res.json({ msg: "The filelds are important" });
    }
    const exeat = await Exeat.findOne({ exeatId });

    if (!exeat) {
      return res.json({ message: "Exeat ID not found" });
    }

    const payload = { exeat };

    const token = jwt.sign(payload, "1211889978", {
      expiresIn: "10d",
    });
    return res.json({
      exeatId,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getValidatedExeat = (req, res, next) => {
  try {
    const exeat = req.exeat;
    res.json({ exeat });
  } catch (error) {
    next(error);
  }
};
