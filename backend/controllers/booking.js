import BookingCart from "../models/BookingCart.js";
import Account from "../models/Accounts.js";
import Services from "../models/Services.js";

export const addBook = async (req, res) => {
  try {
    const { id_services, id_account, count, amount } = req.body;

    // Check if the service and account IDs exist before creating a new booking
    const serviceExists = await Services.findById(id_services);
    const accountExists = await Account.findById(id_account);

    if (!serviceExists) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (!accountExists) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Check if the service has enough quantity available for booking
    if (serviceExists.quantity < count) {
      return res
        .status(400)
        .json({ message: "Not enough quantity available for booking" });
    }

    // Subtract the quantity from the service
    serviceExists.quantity -= count;
    await serviceExists.save();

    // Check if a booking with the same id_services and id_account already exists in BookingCart
    let existingBooking = await BookingCart.findOne({
      id_services,
      id_account,
    });

    if (existingBooking) {
      // If booking exists, increment the count and update the reservation details
      existingBooking.count =
        parseInt(existingBooking.count, 10) + parseInt(count, 10);

      const updatedBooking = await existingBooking.save();
      res.status(200).json(updatedBooking);
    } else {
      // If booking does not exist, create a new BookingCart instance
      const newBook = new BookingCart({
        id_services,
        id_account,
        count: 1,
        amount,
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

export const retrieveBook = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await BookingCart.findById(id);
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

export const getTotalEntries = async (req, res) => {
  try {
    const { id } = req.params;

    const totalEntries = await BookingCart.countDocuments({ id_account: id });
    res.status(200).json({ totalEntries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const booking = await BookingCart.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const previousCount = booking.count;

    if (updatedFields.count !== undefined) {
      const service = await Services.findById(booking.id_services);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      const countDifference = updatedFields.count - previousCount;

      console.log("difference: ", countDifference);

      // Check if the service quantity is sufficient for the change in count
      if (service.quantity + countDifference < 0) {
        return res
          .status(400)
          .json({ message: "Not enough quantity available for booking" });
      } else {
        // Update the service quantity based on the count change
        service.quantity -= countDifference;

        // Check if the updated quantity is less than 0 after subtracting
        if (service.quantity < 0) {
          // Revert the quantity change
          service.quantity += countDifference;
          await service.save();

          return res
            .status(400)
            .json({ message: "Not enough quantity available for booking" });
        }

        // Save the updated service quantity
        await service.save();

        // Update the booking count in the database
        const updatedBook = await BookingCart.findByIdAndUpdate(
          id,
          { $set: updatedFields },
          { new: true }
        );

        if (!updatedBook) {
          return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json(updatedBook);
      }
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await BookingCart.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      const count = deletedBooking.count;
      const service = await Services.findById(deletedBooking.id_services);

      service.quantity += count;
      await service.save();
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
