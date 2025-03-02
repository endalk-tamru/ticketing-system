import express from "express";

import {
  isUserAuthorizedOrSuperAdmin,
  isAuthenticated,
  isSuperAdmin,
} from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(isAuthenticated, getUsers);

router
  .route("/:id")
  .get(isAuthenticated, getUserById)
  .put(isAuthenticated, isUserAuthorizedOrSuperAdmin, updateUser)
  .delete(isAuthenticated, isUserAuthorizedOrSuperAdmin, deleteUser);

export default router;
