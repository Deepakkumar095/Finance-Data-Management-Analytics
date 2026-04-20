import express from "express";

import { signUp, login, logout } from "../controllers/auth.controllers.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import { signupSchema, loginSchema } from "../validation/auth.validator.js";

const authRouter = express.Router();


//AUTH ROUTES
authRouter.post("/signup", validate(signupSchema), signUp);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);


//PROTECTED ROUTE
authRouter.get("/profile", protect, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Access granted",
    data: req.user
  });
});


//ADMIN ONLY
authRouter.get(
  "/admin-only",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Welcome Admin!"
    });
  }
);


//ANALYTICS (ADMIN + ANALYST)
authRouter.get(
  "/analytics",
  protect,
  authorizeRoles("admin", "analyst"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Analytics access granted"
    });
  }
);


// DASHBOARD ACCESS
authRouter.get(
  "/test-dashboard",
  protect,
  authorizeRoles("viewer", "analyst", "admin"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Dashboard data"
    });
  }
);


export default authRouter;