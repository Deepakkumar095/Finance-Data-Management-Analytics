import {
  createRecordService,
  getRecordsService,
  updateRecordService,
  deleteRecordService,
  getAllRecordsAdminService
} from "../services/record.service.js";


// CREATE
export const createRecord = async (req, res) => {
  try {
    
    const record = await createRecordService(req.body, req.user);

    return res.status(201).json({
      success: true,
      message: "Record created",
      data: record
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create record"
    });
  }
};


//  GET
export const getRecords = async (req, res) => {
  try {

    const records = await getRecordsService(req.user, req.query);

    return res.status(200).json({
      success: true,
      message: "Records fetched successfully",
      count: records.length,
      data: records
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch records"
    });
  }
};

// UPDATE
export const updateRecord = async (req, res) => {
  try {
    const record = await updateRecordService(
      req.params.id,
      req.body,
      req.user._id,
      req.user.role
    );

    return res.status(200).json({
      success: true,
      message: "Record updated",
      data: record
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update record"
    });
  }
};

// DELETE
export const deleteRecord = async (req, res) => {
  try {
    await deleteRecordService(req.params.id, req.user._id, req.user.role);

    return res.status(200).json({
      success: true,
      message: "Record deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete record"
    });
  }
};

// ADMIN
export const getAllUsersRecords = async (req, res) => {
  try {
    const records = await getAllRecordsAdminService();

    return res.status(200).json({
      success: true,
      message: "All records fetched successfully",
      count: records.length,
      data: records
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch records"
    });
  }
};