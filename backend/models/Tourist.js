import mongoose from "mongoose";

const TouristSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact_number: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      required: true,
      default: "",
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tourist = mongoose.model("User", TouristSchema);
export default Tourist;
