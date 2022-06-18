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

// Follow a user
export const follow_user = async (req, res) => {
  const id = req.params.id;

  const { current_user_id } = req.body;

  if (current_user_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const follow_user = await UserModel.findById(id);
      const following_user = await UserModel.findById(current_user_id);

      // If not already following
      if (!follow_user.followers.includes(current_user_id)) {
        await follow_user.updateOne({ $push: { followers: current_user_id } });
        await following_user.updateOne({ $push: { followings: id } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("You're already following this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// Unfollow a user
export const unfollow_user = async (req, res) => {
  const id = req.params.id;

  const { current_user_id } = req.body;

  if (current_user_id === id) {
    res.status(403).json("Action forbidden");
  } else {
    try {
      const follow_user = await UserModel.findById(id);
      const following_user = await UserModel.findById(current_user_id);

      // If not already following
      if (follow_user.followers.includes(current_user_id)) {
        await follow_user.updateOne({ $pull: { followers: current_user_id } });
        await following_user.updateOne({ $pull: { followings: id } });
        res.status(200).json("User unfollowed");
      } else {
        res.status(403).json("You're not following this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

