import User from "../models/user.model.js";

// GET ALL USERS
export const getAllUsersService = async () => {
  const users = await User.find().select("_id name email");
  return users;
};


//UPDATE USER
export const updateUserService = async (id, data) => {
  // Find user
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  // Update fields
  if (req.user.role !== "admin") {
    throw new Error("Only admin can update users");
  }

  if (typeof data.isActive === "boolean") {
    user.isActive = data.isActive;
  }

  // Save changes
  await user.save();

  return user;
};


// DELETE USER
export const deleteUserService = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return true;
};