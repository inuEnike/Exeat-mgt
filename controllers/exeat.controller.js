import { Auth } from "../models/auth.model.js";
import { Exeat } from "../models/exeat.model.js";
import { transporter } from "../utils/mail.js";

export const getAllExeats = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const skip = (page - 1) * limit;
    // Fetch the total count of exeat documents for pagination info
    const totalExeats = await Exeat.countDocuments({});
    let exeatQuery = Exeat.find({}).populate("ChiefPorter Dean hostel");
    if (!page || page < 0) {
      const exeat = await exeatQuery;
      res.json({ exeats: exeat });
    } else {
      const exeat = await exeatQuery.skip(skip).limit(limit);

      res.json({
        exeats: exeat,
        totalExeats: exeat.length,
        totalPages: Math.ceil(totalExeats / limit),
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createExeat = async (req, res, next) => {
  const characters = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let generatedExeatId = "";

  for (let i = 0; i < 10; i++) {
    generatedExeatId +=
      characters[Math.floor(Math.random() * characters.length)];
  }
  const {
    reasonForLeave,
    dateOfLeave,
    dateOfReturn,
    parentContact,
    destination,
    name,
    email,
    matNo,
    department,
    hostel,
    level,
    studentContact,
    ChiefPorter,
    Dean,
  } = req.body;

  try {
    if (
      !reasonForLeave ||
      !dateOfLeave ||
      !parentContact ||
      !destination ||
      !name ||
      !email ||
      !matNo ||
      !department ||
      !hostel ||
      !level ||
      !studentContact
    ) {
      return res.json({ message: "All fields are required" });
    }
    const populateDean = await Auth.findOne({ Dean });
    console.log(populateDean);
    const newExeat = new Exeat({
      name,
      email,
      matNo,
      department,
      hostel,
      level,
      studentContact,
      exeatId: generatedExeatId,
      reasonForLeave,
      dateOfLeave,
      dateOfReturn,
      parentContact,
      destination,
      ChiefPorter,
      Dean: populateDean,
    });

    await newExeat.save();

    const SinglechiefPorter = await Exeat.findOne({
      ChiefPorter,
    }).populate("ChiefPorter");

    if (!SinglechiefPorter) {
      return res.json({ message: "Not a valid chief Porter" });
    }

    let ChiefPorterEmail = SinglechiefPorter.ChiefPorter.email;
    let ChiefPorterName = SinglechiefPorter.ChiefPorter.name;

    await transporter.sendMail({
      from: "ochinyabostella@gmail.com", // sender address
      to: ChiefPorterEmail,
      subject: "New Exeat Request", // Email subject
      text: `A new exeat request has been submitted. Please review it.`, // Plain text body
      html: `
        <p>Hello ${ChiefPorterName},</p>
        <p>A new exeat request has been submitted:</p>
        <ul>
          <li>Student's Name: ${name}</li>
          <li>Student's Email: ${email}</li>
          <li>Student's Matriculation Number: ${matNo}</li>
          <li>Student's Department: ${department}</li>
          <li>Student's Hostel: ${hostel}</li>
          <li>Reason for Leave: ${reasonForLeave}</li>
          <li>Date of Leave: ${dateOfLeave}</li>
          <li>Date of Return: ${dateOfReturn}</li>
          <li>Parent Contact: ${parentContact}</li>
          <li>Destination: ${destination}</li>
        </ul>
        <p>Please review it and take necessary actions.</p>
      `, // HTML body
    });

    await transporter.sendMail({
      from: "ochinyabostella@gmail.com", // sender address
      to: email,
      subject: "New Exeat Request", // Email subject
      text: `Your New Exeat Request`, // Plain text body
      html: `
          <li>Exeat id: ${newExeat.exeatId}</li>
          <li>Student's Matriculation Number: ${matNo}</li>
          <li>Student's Department: ${department}</li>
          <li>Student's Hostel: ${hostel}</li>
        </ul>
        <p>for more information use your exeat id to track your exeat</p>
      `, // HTML body
    });

    res.status(201).json({
      successMessage: "Exeat request created successfully",
      exeat: newExeat,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExeat = async (req, res, next) => {
  const { id } = req.params;
  const {
    reasonForLeave,
    dateOfLeave,
    dateOfReturn,
    parentContact,
    destination,
    deanTickedApproved,
    chiefPorterTickedApproved,
    Dean,
    ChiefPorter,
    name,
    email,
    matNo,
    department,
    hostel,
    level,
    studentContact,
    securityConfirmation,
  } = req.body;

  try {
    // Update exeat
    await Exeat.findByIdAndUpdate(id, {
      reasonForLeave,
      dateOfLeave,
      dateOfReturn,
      parentContact,
      destination,
      deanTickedApproved,
      chiefPorterTickedApproved,
      Dean,
      ChiefPorter,
      name,
      email,
      matNo,
      department,
      hostel,
      level,
      studentContact,
      securityConfirmation,
    });

    // Fetch exeat from the database
    const FindExeat = await Exeat.findById(id).populate("Dean ChiefPorter");
    console.log(FindExeat);
    // Check if exeat exists
    if (!FindExeat) {
      return res.json({ message: `Exeat with ID ${id} not found` });
    }

    // Send email notification if chief porter ticked approved
    if (FindExeat.chiefPorterTickedApproved) {
      await transporter.sendMail({
        from: "ochinyabostella@gmail.com",
        to: FindExeat.Dean.email,
        subject: "New Exeat Request",
        text: `A new exeat request has been submitted. Please review it.`,
        html: `<p>Hello ${FindExeat.Dean.name},</p>
               <p>A new exeat request has been submitted:</p>
               <ul>
               <li>Student's Name: ${name}</li>
               <li>Student's Email: ${email}</li>
               <li>Student's Matriculation Number: ${matNo}</li>
               <li>Student's Department: ${department}</li>
               <li>Student's Hostel: ${hostel}</li>
                 <li>Reason for Leave: ${reasonForLeave}</li>
                 <li>Date of Leave: ${dateOfLeave}</li>
                 <li>Date of Return: ${dateOfReturn}</li>
                 <li>Parent Contact: ${parentContact}</li>
                 <li>Destination: ${destination}</li>
               </ul>
               <p>Please review it and take necessary actions.</p>`,
      });
    }

    // Send email notification if dean ticked approved
    if (FindExeat.deanTickedApproved) {
      await transporter.sendMail({
        from: FindExeat.Dean.email,
        to: email,
        subject: "Exeat Request Update",
        text: `Your exeat request has been updated. Please check the portal for details.`,
        html: `<p>Hello ${FindExeat.name},</p>
               <p>Your exeat request has been updated:</p>
               <ul>
                 <li>Reason for Leave: ${reasonForLeave}</li>
                 <li>Date of Leave: ${dateOfLeave}</li>
                 <li>Date of Return: ${dateOfReturn}</li>
                 <li>Parent Contact: ${parentContact}</li>
                 <li>Destination: ${destination}</li>
                 <li>Approved by Dean: ${String(
                   deanTickedApproved
                 ).toUpperCase()}</li>
                 <li>Approved By Chief Porter: ${String(
                   chiefPorterTickedApproved
                 ).toUpperCase()}</li>
                 <li>Approved By: ${FindExeat.ChiefPorter.name}</li>
               </ul>
               <p>Please check the portal for more details.</p>`,
      });
    }

    res.json({
      successMessage: `Exeat request with the id of ${id} has been updated successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleExeat = async (req, res, next) => {
  const { id } = req.params;
  try {
    const exeat = await Exeat.findById(id).populate("ChiefPorter Dean");
    res.json({ exeat });
  } catch (error) {
    next(error);
  }
};

export const deleteExeat = async (req, res, next) => {
  const { id } = req.params;
  try {
    const exeat = await Exeat.findByIdAndDelete(id);
    res.json({ exeat });
  } catch (error) {
    next(error);
  }
};

export const getExeatByChiefPorter = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Ensure req.admin and req.admin.role are properly defined
    if (!req.admin || req.admin.role !== "ChiefPorter") {
      return res
        .status(403)
        .json({ message: "Access denied. Not a ChiefPorter." });
    }

    // Retrieve the authenticated user's ID
    const chiefPorterId = req.admin._id;

    // Find exeat documents where chiefPorter matches the authenticated user's ID
    const exeatQuery = Exeat.find({ ChiefPorter: chiefPorterId })
      .skip(skip)
      .limit(limit)
      .populate("ChiefPorter Dean hostel");

    // Fetch the total count of exeat documents for pagination info
    const totalExeats = await Exeat.countDocuments({
      ChiefPorter: chiefPorterId,
    });

    // Execute the query
    const exeats = await exeatQuery;

    // Respond with the found exeat documents and pagination info
    res.json({
      exeats,
      totalExeats,
      page,
      totalPages: Math.ceil(totalExeats / limit),
    });
  } catch (error) {
    next(error);
  }
};
