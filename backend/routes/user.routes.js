import express from "express";

import {
  getAllUsers,
  updateUser,
  deleteUser
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


// ADMIN ONLY ROUTES

// Get all users
router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

// Update user
router.patch(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateUser
);

// Delete user
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);


export default router;