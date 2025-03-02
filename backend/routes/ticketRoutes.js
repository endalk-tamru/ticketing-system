import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

import {
  isTicketAuthorizedOrSuperAdmin,
  isAuthenticated,
  isSuperAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, createTicket)
  .get(isAuthenticated, getTickets);

router
  .route("/:id")
  .get(isAuthenticated, isTicketAuthorizedOrSuperAdmin, getTicketById)
  .put(isAuthenticated, isTicketAuthorizedOrSuperAdmin, updateTicket)
  .delete(isAuthenticated, isTicketAuthorizedOrSuperAdmin, deleteTicket);

export default router;
