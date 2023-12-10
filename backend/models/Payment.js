import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    id_services: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
      required: true,
    },
    id_account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    method: {
      type: String,
      default: "Card",
    },
    quantity: Number,
    amount: Number,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
