import UserModel from "../models/user_model.js";

// Registering a new User
export const register_user = async (req, res) => {
  const { username, password, first_name, last_name } = req.body;

  const new_user = new UserModel({
    username,
    password,
    first_name,
    last_name,
  });

  try {
    await new_user.save();
    res.status(200).json(new_user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
