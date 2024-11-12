import { User } from "../models/User.js";
import { Leave } from "../models/Leave.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// TODO: handle file uploads

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all fields", success: false });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({ token: token, user: user, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const { name, email, rollNumber, password } = req.body;

  if (!name || !email || !rollNumber || !password) {
    return res
      .status(400)
      .json({ message: "Please enter all fields", success: false });
  }

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { rollNumber: rollNumber }],
    });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const newUser = new User({
      name,
      email,
      rollNumber,
      password,
    });

    await newUser.save();
    // !! TODO : Send email to user

    return res
      .status(201)
      .json({ message: "User registered successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getLeaves = async (req, res) => {
  const user = req.user;
  if (user.type !== "Student") {
    return res.status(403).json({ message: "Forbidden", success: false });
  }
  try {
    const leaves = await Leave.find({ studentId: user._id });
    return res.status(200).json({ leaves: leaves, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const requestLeave = async (req, res) => {
  const user = req.user;
  const file = req.file;

  const { eventName, startDate, endDate } = req.body;
  if (!eventName || !startDate || !endDate) {
    return res
      .status(400)
      .json({ message: "Please enter all fields", success: false });
  }

  try {
    const newLeave = new Leave({
      eventName,
      startDate,
      endDate,
      studentId: user._id,
      certificate: file.path,
    });

    await newLeave.save();
    // !! TODO : Send email to user

    return res
      .status(201)
      .json({ message: "Leave requested successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllLeves = async (req, res) => {
  const user = req.user;
  if (user.type !== "Faculty") {
    return res.status(403).json({ message: "Forbidden", success: false });
  }
  try {
    const leaves = await Leave.find({});
    return res.status(200).json({ leaves: leaves, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const approveLeave = async (req, res) => {
  const user = req.user;
  const { leaveId, status } = req.body;

  if (!leaveId || !status) {
    return res
      .status(400)
      .json({ message: "Please enter all fields", success: false });
  }

  if (user.type !== "Faculty") {
    return res.status(403).json({ message: "Forbidden", success: false });
  }
  try {
    const leave = await Leave.findOne({ _id: leaveId });
    if (!leave) {
      return res
        .status(404)
        .json({ message: "Leave not found", success: false });
    }
    leave.status = status;
    await leave.save();

    // !! TODO : Send email to user

    return res.status(200).json({ message: "Leave approved", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { login, register, getLeaves, requestLeave, getAllLeves, approveLeave };
