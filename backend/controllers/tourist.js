import Tourist from "../models/Tourist.js";

/* READ */
export const getTourist = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = await Tourist.findById(id);
    const tourist_name = firstName + " " + lastName;
    res.status(200).json(tourist_name);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTouristPicturePath = async (req, res) => {
  try {
    const { id } = req.params;
    const { picturePath } = await Tourist.findById(id);
    res.status(200).json(picturePath);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
