import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});

const isSuperAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isSuperAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
});

// check ownership for user profiles
const isUserAuthorizedOrSuperAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // The ID of the user being accessed
  if (!req.user.isSuperAdmin && id !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to access this resource");
  }
  next();
});

// check ownership for tickets
const isTicketAuthorizedOrSuperAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.params; // The ID of the ticket being accessed
  const ticket = await Ticket.findById(id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (!req.user.isSuperAdmin && ticket.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Not authorized to access this resource");
  }

  // Attach the ticket to the request object for further processing
  req.ticket = ticket;
  next();
});

export {
  isAuthenticated,
  isSuperAdmin,
  isUserAuthorizedOrSuperAdmin,
  isTicketAuthorizedOrSuperAdmin,
};
