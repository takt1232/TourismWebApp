import BookingCart from "../models/BookingCart.js";
import Account from "../models/Accounts.js";
import Services from "../models/Services.js";

export const addBook = async (req, res) => {
  try {
    const {
      id_services,
      id_account,
      count,
      reservation,
      reservationcompletion,
    } = req.body;

    // Check if the service and account IDs exist before creating a new booking
    const serviceExists = await Services.findById(id_services);
    const accountExists = await Account.findById(id_account);

    if (!serviceExists) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (!accountExists) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check if a booking with the same id_services and id_account already exists in BookingCart
    let existingBooking = await BookingCart.findOne({
      id_services,
      id_account,
    });

    if (existingBooking) {
      // If booking exists, increment the count and update the reservation details
      existingBooking.count += count;
      existingBooking.reservation = reservation;
      existingBooking.reservationcompletion = reservationcompletion;

      const updatedBooking = await existingBooking.save();
      res.status(200).json(updatedBooking);
    } else {
      // If booking does not exist, create a new BookingCart instance
      const newBook = new BookingCart({
        id_services,
        id_account,
        count: 1,
        amount,
        reservation,
        reservationcompletion,
      });

      const saveBook = await newBook.save();
      res.status(201).json(saveBook);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await BookingCart.find({ id_account: id });
    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found for this account ID" });
    }
    res.status(200).json(books);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
