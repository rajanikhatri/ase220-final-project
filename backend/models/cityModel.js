const mongoose = require("mongoose");

const citySchema = mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    destination: {
      type: Number,
      required: true,
    },
    best_time_to_visit: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    high: {
      type: String,
    },
    low: {
      type: String,
    },
    description: {
      type: String,
    },
    avatar: [
      {
        type: String,
        required: true,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
      },
    ],
  },
  {
    timestamp: true,
  }
);

const City = mongoose.model("City", citySchema);
module.exports = City;
