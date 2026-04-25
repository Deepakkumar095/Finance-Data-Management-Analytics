import Record from "../models/record.model.js";
import User from "../models/user.model.js";


// CREATE
export const createRecordService = async (data, loggedInUser) => {
  const { userId, amount, type, category, note, date } = data;

  if (loggedInUser.role !== "admin") {
    throw new Error("Only admin can create records");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (!amount || !type || !category) {
    throw new Error("Required fields missing");
  }

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


// GET
export const getRecordsService = async (user, query) => {
  const { type, category, startDate, endDate } = query;

  let filter = {};

  if (user.role === "user") {
    filter.user = user._id;
  }

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  return await Record.find(filter)
    .sort({ date: -1 })
    .populate("user", "email"); 
};



export const updateRecordService = async (id, data, loggedInUserId, userRole) => {
  const { userId, ...rest } = data;

  const record = await Record.findById(id);

  if (!record) {
    throw new Error("Record not found");
  }

  if (
    record.user.toString() !== loggedInUserId.toString()
  ) {
    throw new Error("Unauthorized");
  }

  const updatedRecord = await Record.findByIdAndUpdate(
    id,
    {
      ...rest,
      user: data.userId || record.user 
    },
    { new: true }
  ).populate("user", "email"); 

  return updatedRecord;
};


// DELETE
export const deleteRecordService = async (id, userId, userRole) => {
  const record = await Record.findById(id);

  if (!record) {
    throw new Error("Record not found");
  }

  
  if (
    record.user.toString() !== userId.toString() &&
    userRole !== "admin"
  ) {
    throw new Error("Unauthorized");
  }

  await Record.findByIdAndDelete(id);

  return true;
};


// ADMIN ALL RECORDS
export const getAllRecordsAdminService = async () => {
  return await Record.find()
    .populate("user", "email")
    .sort({ createdAt: -1 });
};