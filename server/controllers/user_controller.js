import UserModel from "../models/user_model.js";
import bcrypt from "bcrypt";

// get a user
export const get_user = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      // extract password
      const { password, ...other_details } = user._doc;

      res.status(200).json(other_details);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user
export const update_user = async (req, res) => {
  const id = req.params.id;
  const { current_user_id, current_user_admin_status, password } = req.body;

  if (id === current_user_id || current_user_admin_status) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied. You can only update your own profile");
  }
};

// delete user
export const delete_user = async (req, res) => {
  const id = req.params.id;
  const { current_user_id, current_user_admin_status } = req.body;

  if (current_user_id === id || current_user_admin_status) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User succesfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied. You can only delete your own profile");
  }
};
