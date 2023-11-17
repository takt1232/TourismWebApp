import Tourist from "../models/Tourist.js";

/* READ */
export const getTourist = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Tourist.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
