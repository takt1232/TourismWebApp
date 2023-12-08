import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    id_cart: Number,
    method: String,
    amount: Number,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
