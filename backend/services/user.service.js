import User from "../models/user.model.js";

// GET ALL USERS
export const getAllUsersService = async () => {
  const users = await User.find().select("_id firstName lastName userName email role isActive");
  return users;
};


//UPDATE USER
export const updateUserService = async (id, data, currentUser) => {
  // Find user
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  // Only admin can update users
  if (!currentUser || currentUser.role !== "admin") {
    throw new Error("Only admin can update users");
  }

  if (typeof data.isActive === "boolean") {
    user.isActive = data.isActive;
  }

  if (data.role && ["user", "analyst", "admin"].includes(data.role)) {
    user.role = data.role;
  }

  // Save changes
  await user.save();

  return user;
};


// DELETE USER
export const deleteUserService = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  // delete all records of that user
  await Record.deleteMany({ user: id });

  //  delete user
  await User.findByIdAndDelete(id);

  return true;
};