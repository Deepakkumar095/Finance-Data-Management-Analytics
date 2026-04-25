import {
  getAllUsersService,
  updateUserService,
  deleteUserService
} from "../services/user.service.js";


// GET ALL USERS
export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      count: users.length,
      data: users
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users"
    });
  }
};


// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const user = await updateUserService(req.params.id, req.body, req.user);

    return res.status(200).json({
      success: true,
      message: "User updated",
      data: user
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update user"
    });
  }
};


// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.user._id.toString() === req.params.id) {
      throw new Error("You cannot delete yourself");
    }

    await deleteUserService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete user"
    });
  }
};