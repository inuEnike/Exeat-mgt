import { Hostels } from "../models/hostel.model.js";
import mongoose from "mongoose";

/*
    This controller is for getting all the hostels available in the db collection
    METHOD: GET REQUEST

*/
export const getAllHostels = async (req, res, next) => {
  try {
    // Find and return all hostels in the database
    const hostels = await Hostels.find({});
    res.json({ hostels });
  } catch (error) {
    next(error);
  }
};

/*
    This controller is for creating a hostel
    METHOD: POST REQUEST

*/
export const createHostel = async (req, res, next) => {
  const { chiefPorter, name } = req.body;

  // Check if required fields are empty
  if (!chiefPorter || !name) {
    return res
      .status(400)
      .json({ errorMessage: "Chief porter and name are required" });
  }

  try {
    // Create a new hostel instance and save it in the database
    const hostel = await Hostels.create({
      chiefPorter,
      name,
    });

    // Return the created hostel
    return res.status(201).json({ hostel });
  } catch (error) {
    next(error);
  }
};

/*
    This controller is for updating a hostel
    METHOD: PUT REQUEST

*/
export const updateHostel = async (req, res, next) => {
  const { id } = req.params;
  const { chiefPorter, name } = req.body;

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ errorMessage: "Invalid hostel ID" });
  }

  try {
    // Find hostel by id and update its details
    const updatedHostel = await Hostels.findByIdAndUpdate(
      id,
      { chiefPorter, name },
      { new: true }
    );

    // If hostel with the given id is not found
    if (!updatedHostel) {
      return res.status(404).json({ errorMessage: "Hostel not found" });
    }

    // Return the updated hostel
    return res.json({ updatedHostel });
  } catch (error) {
    next(error);
  }
};

/*
    This controller is for deleting a hostel
    METHOD: DELETE REQUEST

*/
export const deleteHostel = async (req, res, next) => {
  const { id } = req.params;

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ errorMessage: "Invalid hostel ID" });
  }

  try {
    // Find hostel by id and delete it
    const deletedHostel = await Hostels.findByIdAndDelete(id);

    // If hostel with the given id is not found
    if (!deletedHostel) {
      return res.status(404).json({ errorMessage: "Hostel not found" });
    }

    // Return the deleted hostel
    return res.json({ deletedHostel });
  } catch (error) {
    next(error);
  }
};
