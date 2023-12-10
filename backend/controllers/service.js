import Services from "../models/Services.js";

export const uploadService = async (req, res) => {
  try {
    const {
      title,
      service_category,
      description,
      details,
      price,
      image,
      quantity,
    } = req.body;

    const newService = new Services({
      title,
      service_category,
      description,
      details,
      price,
      image,
      quantity,
    });
    const saveService = await newService.save();
    res.status(201).json(saveService);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* READ */
export const getServices = async (req, res) => {
  try {
    const service = await Services.find();
    res.status(200).json(service);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Services.findById(id);
    res.status(200).json(service);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const updatedService = await Services.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: "Spot not found" });
    }

    res.status(200).json(updatedService);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedServices = await Services.findByIdAndDelete(id);

    res.status(200).json(deletedServices);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const uniqueCategories = await Services.distinct("service_category");

    res.status(200).json({ categories: uniqueCategories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
