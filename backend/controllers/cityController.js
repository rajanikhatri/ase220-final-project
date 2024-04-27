const City = require("../models/cityModel");
const Country = require("../models/countryModel");

const cityController = {
  createCity: async (req, res) => {
    try {
      const { countryId } = req.params;
      const {
        city,
        destination,
        best_time_to_visit,
        ratings,
        high,
        low,
        description,
        avatar,
      } = req.body;

      const country = await Country.findById(countryId);
      if (!country) {
        return res.status(404).json("country not found");
      }

      const newCity = new City({
        city,
        destination,
        best_time_to_visit,
        ratings,
        high,
        low,
        description,
        avatar,
        createdBy: req.user.id,
        country: countryId,
      });

      const savedCity = await newCity.save();
      res.status(201).json(savedCity);
    } catch (err) {
      console.log(err);
      res.status(500).json("error creating city");
    }
  },

  getCitiesByCountry: async (req, res) => {
    try {
      const { countryId } = req.params;
      const cities = await City.find({ country: countryId });
      res.status(200).json(cities);
    } catch (err) {
      console.log(err);
      res.status(500).json("error retrieving cities");
    }
  },

  updateCity: async (req, res) => {
    try {
      const { cityId } = req.params;
      const {
        city,
        avatar,
        destination,
        best_time_to_visit,
        ratings,
        high,
        low,
        description,
      } = req.body;

      const updateFields = {};
      if (city) updateFields.city = city;
      if (avatar) updateFields.avatar = avatar;
      if (destination) updateFields.destination = destination;
      if (best_time_to_visit)
        updateFields.best_time_to_visit = best_time_to_visit;
      if (ratings) updateFields.ratings = ratings;
      if (high) updateFields.high = high;
      if (low) updateFields.low = low;
      if (description) updateFields.description = description;

      const updatedCity = await City.findOneAndUpdate(
        { _id: cityId, createdBy: req.user.id },
        updateFields,
        { new: true }
      );

      if (!updatedCity) {
        return res.status(403).json("not authorized to update this city");
      }

      res.status(200).json(updatedCity);
    } catch (err) {
      console.error(err);
      res.status(500).json("error updating city");
    }
  },

  deleteCity: async (req, res) => {
    try {
      const { cityId } = req.params;
      const cityToDelete = await City.findOneAndDelete({
        _id: cityId,
        createdBy: req.user.id,
      });

      if (!cityToDelete) {
        return res.status(403).json("not authorized to delete this city");
      }

      res.status(200).json("city deleted successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json("error deleting city");
    }
  },

  getCityById: async (req, res) => {
    try {
      const { cityId } = req.params;
      const city = await City.findById(cityId);

      if (!city) {
        return res.status(404).json("city not found");
      }

      res.status(200).json(city);
    } catch (err) {
      console.err(err);
      res.status(500).json("error retrieving city");
    }
  },
};

module.exports = cityController;
