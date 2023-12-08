export const uploadImage = async (req, res) => {
  return res.status(200).json({ imageUrl: req.body.image });
};
