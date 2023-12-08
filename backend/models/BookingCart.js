import mongoose from "mongoose";

const BookingCartSchema = new mongoose.Schema(
  {
    id_services: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the services model or its ID
      ref: "Services", // Replace 'Services' with the name of the referenced model
      required: true,
    },
    id_account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account", // Reference to the Account model
      required: true,
    },
    count: String,
    amount: String,
    reservation: Date,
    reservationcompletion: Date,
  },
  { timestamps: true }
);

const BookingCart = mongoose.model("BookingCart", BookingCartSchema);
export default BookingCart;
