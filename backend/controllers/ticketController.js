import asyncHandler from "express-async-handler";

import Ticket from "../models/Ticket.js";

// @desc   Create a new ticket
// @route  POST /api/ticket
// @access Private - Logged In User
const createTicket = asyncHandler(async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !status) {
    res.status(400);
    throw new Error("Please provide all required fields.");
  }

  const ticket = await Ticket.create({
    user: req.user._id,
    title,
    description,
    status,
  });

  if (ticket) {
    res.status(201).json(ticket);
  } else {
    res.status(400);
    throw new Error("Invalid ticket data");
  }
});

// @desc   Update ticket
// @route  PUT /api/ticket/:id
// @access Private - Authorized user & Super Admin
const updateTicket = asyncHandler(async (req, res) => {
  const ticket = req.ticket;

  ticket.title = req.body.title || ticket.title;
  ticket.description = req.body.description || ticket.description;
  ticket.status = req.user.isSuperAdmin ? req.body.status : ticket.status; // Only Super Admin can change status

  const updatedTicket = await ticket.save();

  if (updatedTicket) {
    res.status(200).json(updatedTicket);
  } else {
    res.status(500);
    throw new Error("Server Error: Ticket is not updated.");
  }
});

// @desc   Get all tickets
// @route  GET /api/tickets
// @access Private - Logged In User
const getTickets = asyncHandler(async (req, res) => {
  const query = req.user.isSuperAdmin ? {} : { user: req.user._id };

  const tickets = await Ticket.find(query)
    .sort({ createdAt: -1 })
    .populate("user", "username");

  if (tickets) {
    res.status(200).json(tickets);
  } else {
    res.status(404);
    throw new Error("Tickets not found.");
  }
});

// @desc   Get single ticket
// @route  GET /api/ticket/:id
// @access Private - LoggedIn users
const getTicketById = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate(
    "user",
    "username"
  );

  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(404);
    throw new Error("Ticket not found.");
  }
});

// @desc   Delete ticket
// @route  DELETE /api/ticket/:id
// @access Private - Authorized user
const deleteTicket = asyncHandler(async (req, res) => {
  const deletedTicket = await Ticket.deleteOne(req.ticket);

  if (deletedTicket) {
    res.status(200).json({ message: "Ticket Deleted." });
  } else {
    res.status(404);
    throw new Error("Ticket not found.");
  }
});

export { createTicket, getTickets, getTicketById, updateTicket, deleteTicket };
