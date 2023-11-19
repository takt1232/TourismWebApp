import TouristSpot from "../models/TouristSpot.js";

export const uploadSpot = async (req, res) => {
  try {
    const {
      userId,
      name,
      location,
      picturePath,
      description,
      pricingStructure,
    } = req.body;

    const newSpot = new TouristSpot({
      userId,
      name,
      location,
      picturePath,
      description,
      pricingStructure,
    });
    const savedSpot = await newSpot.save();
    res.status(201).json(savedSpot);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */
export const getFeedSpots = async (req, res) => {
  try {
    const post = await TouristSpot.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getTouristSpots = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await TouristSpot.find({ userId });
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
