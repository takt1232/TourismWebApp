import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Tourist from "../models/Tourist.js";

/* REGISTER USER */
export const registerTourist = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact_number,
      password,
      picturePath,
      role,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Tourist({
      firstName,
      lastName,
      email,
      contact_number,
      password: passwordHash,
      picturePath,
      role,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Tourist.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
