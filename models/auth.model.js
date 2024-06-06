import mongoose from "mongoose";

const auth = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 16,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      max: 16,
    },
    repeatPassword: {
      type: String,
    },
    role: {
      type: String,
      enum: {
        values: ["ChiefPorter", "Dean"],
        message: "{VALUE} is not supported",
      },
      default: "ChiefPorter",
    },
  },
  {
    timestamps: true,
  }
);

export const Auth = mongoose.model("Auth", auth);
