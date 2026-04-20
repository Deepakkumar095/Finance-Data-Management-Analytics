import Record from "../models/record.model.js";
import User from "../models/user.model.js";


// CREATE
export const createRecordService = async (data, loggedInUser) => {
  const { userId, amount, type, category, note, date } = data;

  // ✅ role check
  if (loggedInUser.role !== "admin") {
    throw new Error("Only admin can create records");
  }

  // ✅ user check
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  // validation
  if (!amount || !type || !category) {
    throw new Error("Required fields missing");
  }

  // create
  const record = await Record.create({
    user: userId,
    amount,
    type,
    category,
    note,
    date
  });

  return record;
};


// GET (FILTERING)
export const getRecordsService = async (user, query) => {
  const { type, category, startDate, endDate } = query;

  let filter = {};

  // ✅ role based filter
  if (user.role !== "admin") {
    filter.user = user._id;
  }

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};

    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  return await Record.find(filter).sort({ date: -1 });
};


// UPDATE
export const updateRecordService = async (id, data, userId) => {
  // Find record
  const record = await Record.findById(id);

  if (!record) {
    throw new Error("Record not found");
  }

  // check ownership
  if (record.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }

  // Update record
  const updatedRecord = await Record.findByIdAndUpdate(id, data, {
    new: true
  });

  return updatedRecord;
};


// DELETE
export const deleteRecordService = async (id, userId) => {
  // Find record
  const record = await Record.findById(id);

  if (!record) {
    throw new Error("Record not found");
  }

  // check ownership
  if (record.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }

  // Delete record
  await Record.findByIdAndDelete(id);

  return true;
};


//ADMIN ALL RECORDS
export const getAllRecordsAdminService = async () => {
  const records = await Record.find()
    .populate("user", "email userName role")
    .sort({ createdAt: -1 });

  return records;
};