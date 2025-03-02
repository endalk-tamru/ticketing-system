import asyncHandler from "express-async-handler";

import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

// @desc   Register a new user & get token
// @route  POST /api/auth/signup
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, isSuperAdmin } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide all required fields.");
  }

  // Check if user already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    password,
    isSuperAdmin,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      isSuperAdmin: user.isSuperAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Authenticate user & get token
// @route  POST /api/auth/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      isSuperAdmin: user.isSuperAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

export { registerUser, authUser };
