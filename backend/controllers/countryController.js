const Country = require("../models/countryModel");

const countryController = {
  createCountry: async (req, res) => {
    try {
      const { country, message, avatar, ratings } = req.body;
      const createdBy = req.user.id;

      const newCountry = new Country({
        country,
        message,
        avatar,
        ratings,
        createdBy,
      });

      const savedCountry = await newCountry.save();
      res.status(201).json(savedCountry);
    } catch (err) {
      console.log(err);
      res.status(500).json("error creating country");
    }
  },

  getAllCountries: async (req, res) => {
    try {
      const countries = await Country.find({});
      res.status(200).json(countries);
    } catch (err) {
      res.status(500).json("error fetching countries");
    }
  },

  getCountryById: async (req, res) => {
    try {
      const country = await Country.findById(req.params.id);

      if (!country) {
        return res.status(404).json("Country not found");
      }
      res.status(200).json(country);
    } catch (err) {
      res.status(500).json("error fetching country");
    }
  },

  updateCountry: async (req, res) => {
    try {
      const existingCountry = await Country.findById(req.params.id);

      if (!existingCountry) {
        return res.status(404).json("country not found");
      }

      if (existingCountry.createdBy.toString() !== req.user.id.toString()) {
        return res.status(403).json("not authorized to update this country");
      }

      const updatedData = {
        country: req.body.country || existingCountry.country,
        message: req.body.message || existingCountry.message,
        avatar: req.body.avatar || existingCountry.avatar,
        ratings: req.body.ratings || existingCountry.ratings,
      };

      const updatedCountry = await Country.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      res.status(200).json(updatedCountry);
    } catch (err) {
      res.status(500).json("error updating country");
    }
  },

  deleteCountry: async (req, res) => {
    try {
      const deletedCountry = await Country.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user.id,
      });

      if (!deletedCountry) {
        return res.status(403).json("not authorized to deleted this country");
      }

      res.status(200).json("country deleted successfully");
    } catch (err) {
      res.status(500).json("error deleting country");
    }
  },
};

module.exports = countryController;
