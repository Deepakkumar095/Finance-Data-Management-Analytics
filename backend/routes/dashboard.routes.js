import express from "express";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  getDashboard,
  getCategorySummary,
  getMonthlyTrends,
  getTopSpending,
  getRecentActivity
} from "../controllers/dashboard.controller.js";

const router = express.Router();

//  DASHBOARD (ALL AUTHENTICATED USERS)
router.get("/", protect, getDashboard);


// ANALYTICS (ADMIN + ANALYST)
router.get(
  "/category-summary",
  protect,
  authorizeRoles("admin", "analyst"),
  getCategorySummary
);

router.get(
  "/monthly-trends",
  protect,
  authorizeRoles("admin", "analyst"),
  getMonthlyTrends
);

router.get(
  "/top-spending",
  protect,
  authorizeRoles("admin", "analyst"),
  getTopSpending
);

// RECENT ACTIVITY
router.get("/recent", protect, getRecentActivity);


export default router;