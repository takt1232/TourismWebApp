import Account from "../models/Accounts.js";

/* READ */
export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    res.status(200).json(tourist);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
