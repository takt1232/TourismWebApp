import mongoose from "mongoose";

const ServicesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    service_category: {
      type: String,
      required: true,
    },
    description: String,
    details: String,
    price: Number,
    image: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

const Services = mongoose.model("Services", ServicesSchema);
export default Services;
