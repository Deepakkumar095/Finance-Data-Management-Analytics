import Joi from "joi";

// reusable fields
const amount = Joi.number().positive();
const type = Joi.string().valid("income", "expense");
const category = Joi.string();
const note = Joi.string().allow("");
const date = Joi.date();

// Create Record Schema
export const createRecordSchema = Joi.object({
  userId: Joi.string().required(),
  amount: amount.required(),
  type: type.required(),
  category: category.required(),
  note,
  date
});

// Filter Record Schema
export const filterRecordSchema = Joi.object({
  type,
  category,
  startDate: Joi.date(),
  endDate: Joi.date()
});

// Update Record Schema
export const updateRecordSchema = Joi.object({
  amount,
  type,
  category,
  note,
  date,
  userId: Joi.string().optional()
}).min(1);