import asyncHandler from "express-async-handler";

import User from "../models/User.js";

// @desc   Update user profile
// @route  PUT /api/users/:id
// @access Private - Authorized user
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.username = req?.body?.username || user.username;
  user.password = req?.body?.password || user.password;
  user.isSuperAdmin = req.user.isSuperAdmin
    ? req?.body?.isSuperAdmin
    : user.isSuperAdmin;

  const updatedUser = await user.save();

  if (updatedUser) {
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      isSuperAdmin: updatedUser.isSuperAdmin,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } else {
    res.status(500);
    throw new Error("Server Error: User profile is not updated.");
  }
};

// @desc   Get all users profile
// @route  GET /api/users
// @access Private - LoggedIn users
const getUsers = asyncHandler(async (req, res) => {
  const query = req.user.isSuperAdmin ? {} : { _id: req.user._id };

  const users = await User.find(query)
    .select("-password")
    .sort({ createdAt: -1 });

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Users not found.");
  }
});

// @desc   Get single user profile
// @route  GET /api/users/:id
// @access Private - LoggedIn users
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
};

// @desc   Delete user
// @route  DELETE /api/users/:id
// @access Private - Authorized user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const deletedUser = await User.deleteOne(user);

  if (deletedUser) {
    res.status(200).json({ message: "User Deleted." });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

export { getUsers, getUserById, updateUser, deleteUser };
