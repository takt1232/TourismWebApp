import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Account from "../models/Accounts.js";

/* REGISTER USER */
export const registerAccount = async (req, res) => {
  try {
    const { firstName, lastName, email, password, image, role } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newAccount = new Account({
      firstName,
      lastName,
      email,
      password: passwordHash,
      image,
      role,
    });
    const savedUser = await newAccount.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Account.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "User does not exist. Please register" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Email or Password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
