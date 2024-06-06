import mongoose from "mongoose";

const Hostel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    chiefPorter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chiefPorter",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Hostels = mongoose.model("Hostel", Hostel);
