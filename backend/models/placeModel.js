const mongoose = require("mongoose");

const placeSchema = mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
    },
    destinations: {
      type: Number,
    },
    best_time_to_visit: {
      type: String,
    },
    ratings: {
      type: Number,
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
