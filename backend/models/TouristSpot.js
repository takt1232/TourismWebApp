import mongoose from "mongoose";

const TouristSpotSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    picturePath: {
      type: String,
      required: true,
    },
    description: String,
    pricingStructure: String,
  },
  { timestamps: true }
);

const TouristSpot = mongoose.model("TouristSpot", TouristSpotSchema);
export default TouristSpot;
