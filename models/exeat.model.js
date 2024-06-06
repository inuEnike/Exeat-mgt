import mongoose from "mongoose";

const exeatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    matNo: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    hostel: {
      type: mongoose.Schema.ObjectId,
      ref: "Hostel",
      required: true,
    },
    level: {
      type: String,
      enum: {
        values: ["100", "200", "300", "400", "500", "600"],
        message: "{VALUE} is not supported",
      },
    },
    studentContact: {
      type: String,
    },
    exeatId: {
      type: String,
    },
    reasonForLeave: {
      type: String,
      required: true,
    },
    dateOfLeave: {
      type: Date,
      default: Date.now(),
    },
    dateOfReturn: {
      type: Date,
    },
    parentContact: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    deanTickedApproved: {
      type: Boolean,
      default: false,
    },
    chiefPorterTickedApproved: {
      type: Boolean,
      default: false,
    },
    Dean: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    ChiefPorter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
    },
    securityConfirmation: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Exeat = mongoose.model("Exeat", exeatSchema);
