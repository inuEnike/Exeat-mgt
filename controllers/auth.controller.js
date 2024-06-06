import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Auth } from "../models/auth.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const dean = await Auth.find({});
    if (!dean) {
      return res.json({ message: "No dean found" });
    }
    res.json({ dean });
  } catch (error) {
    next(error);
  }
};

export const Signup = async (req, res, next) => {
  const { name, email, password, repeatPassword, role } = req.body;
  try {
    if (!name || !email || !password || !repeatPassword) {
      return res.json({ message: "The fields are required " });
    } else if (password !== repeatPassword) {
      return res.json({ message: "Password should match!!" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const data = {
      name: name,
      email: email,
      password: hashedPassword,
      role,
    };
    const dean = await Auth.create(data);
    res.json(dean);
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "The fields are required " });
    }

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Compare the password
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid Credential Provided" });
    }

    // const data = {
    //   name: user.name,
    //   email: user.email,
    //   roles: user.role,
    // };

    const payload = { user };
    const token = jwt.sign(payload, "1211889978", {
      expiresIn: "5d",
    });

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};
