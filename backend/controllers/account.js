import Account from "../models/Accounts.js";

/* READ */
export const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findById(id);
    res.status(200).json(account);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllAccount = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const accounts = await Account.findByIdAndDelete(id);
    res.status(200).json(accounts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
