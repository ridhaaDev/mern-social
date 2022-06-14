import UserModel from "../models/user_model.js";
import bcrypt from "bcrypt";

// Registering a new User
export const register_user = async (req, res) => {
  const { username, password, first_name, last_name } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);

  const new_user = new UserModel({
    username,
    password: hashed_password,
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

// login user
export const login_user = async (req, res) => {

  const { username, password } = req.body

  try {
    const user = await UserModel.findOne({ username: username })

    if (user) {
      const is_valid = await bcrypt.compare(password, user.password)

      if (is_valid) {
        res.status(200).json(user)
      } else {
        res.status(400).json('Wrong password')
      }
    } else {
      res.status(404).json('User does not exist')
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
