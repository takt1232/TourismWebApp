import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    id_cart: {
      type: Number,
      required: true,
    },
    count: Number,
    amount: Number,
    reservation: Date,
    status: String,
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", ReservationSchema);
export default Reservation;
