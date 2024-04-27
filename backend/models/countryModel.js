const mongoose = require("mongoose");

const countrySchema = mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
    ],
  },
  {
    timestamp: true,
  }
);

const Country = mongoose.model("Country", countrySchema);
module.exports = Country;
