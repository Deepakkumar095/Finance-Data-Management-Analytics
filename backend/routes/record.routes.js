import express from "express";

import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
  getAllUsersRecords
} from "../controllers/record.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
  createRecordSchema,
  filterRecordSchema,
  updateRecordSchema
} from "../validation/record.validator.js";

const router = express.Router();


//  ADMIN ROUTES

// Create Record
router.post(
  "/add-record",
  protect,
  authorizeRoles("admin"),
  validate(createRecordSchema),
  createRecord
);

// Update Record
router.put(
  "/update/:id",
  protect,
  authorizeRoles("admin"),
  validate(updateRecordSchema),
  updateRecord
);

// Delete Record
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles("admin"),
  deleteRecord
);

// Get All Users Records
router.get(
  "/all-records",
  protect,
  authorizeRoles("admin"),
  getAllUsersRecords
);


//both admin +user can access

router.get(
  "/get-records",
  protect,
  validate(filterRecordSchema),
  getRecords
);


export default router;