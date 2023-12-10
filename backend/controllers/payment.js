import Payment from "../models/Payment.js";
import BookingCart from "../models/BookingCart.js";

export const addPayment = async (req, res) => {
  try {
    const { id_cart, id_services, amount, id_account, quantity } = req.body;

    const newPayment = new Payment({
      id_services,
      id_account,
      amount,
      quantity,
    });

    const savedPayment = await newPayment.save();

    const deletionResult = await deleteBook(id_cart);

    if (!deletionResult.success) {
      throw new Error(deletionResult.message || "Failed to delete booking");
    }

    res.status(201).json(savedPayment);
  } catch (err) {
    res.status(500).json({ message: err.message || "Error adding payment" });
  }
};

export const deleteBook = async (bookId) => {
  try {
    const deletedBooking = await BookingCart.findByIdAndDelete(bookId);

    if (!deletedBooking) {
      return { success: false, message: "Booking not found" };
    }

    return { success: true, message: "Booking deleted successfully" };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

/* READ */
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findById(id);
    res.status(200).json(payment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayment = await Payment.findByIdAndDelete(id);

    res.status(200).json(deletedPayment);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
