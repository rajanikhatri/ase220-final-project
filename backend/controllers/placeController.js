const Place = require("../models/placeModel");
const City = require("../models/cityModel");

const placeController = {
  createPlace: async (req, res) => {
    try {
      const { cityId } = req.params;
      const {
        place,
        destinations,
        best_time_to_visit,
        ratings,
        high,
        low,
        description,
        avatar,
      } = req.body;

      const city = await City.findById(cityId);
      if (!city) {
        return res.status(404).json("city not found");
      }

      const newPlace = new Place({
        place,
        destinations,
        best_time_to_visit,
        ratings,
        high,
        low,
        description,
        avatar,
        createdBy: req.user.id,
        city: cityId,
      });

      const savedPlace = await newPlace.save();
      res.status(201).json(savedPlace);
    } catch (err) {
      console.log(err);
      res.status(500).json("error creating place");
    }
  },

  getPlacesByCity: async (req, res) => {
    try {
      const { cityId } = req.params;
      const places = await Place.find({ city: cityId });
      if (!places || places.length === 0) {
        return res.status(404).json("no places found for this city");
      }
      res.status(200).json(places);
    } catch (err) {
      console.log(err);
      res.status(500).json("error fetching places");
    }
  },

  getPlaceById: async (req, res) => {
    try {
      const { placeId } = req.params;
      const place = await Place.findById(placeId);
      if (!place) {
        return res.status(404).json("place not found");
      }
      res.status(200).json(place);
    } catch (err) {
      console.log(err);
      res.status(500).json("error retrieving place");
    }
  },

  updatePlace: async (req, res) => {
    try {
      const { placeId } = req.params;
      const {
        place,
        destinations,
        best_time_to_visit,
        ratings,
        high,
        low,
        description,
        avatar,
      } = req.body;

      const updateFields = {};
      if (place) updateFields.place = place;
      if (destinations) updateFields.destinations = destinations;
      if (best_time_to_visit)
        updateFields.best_time_to_visit = best_time_to_visit;
      if (ratings) updateFields.ratings = ratings;
      if (high) updateFields.high = high;
      if (low) updateFields.low = low;
      if (description) updateFields.description = description;
      if (avatar) updateFields.avatar = avatar;

      const updatedPlace = await Place.findOneAndUpdate(
        { _id: placeId, createdBy: req.user.id },
        updateFields,
        { new: true }
      );

      if (!updatedPlace) {
        return res.status(403).json("not authorized to update this place");
      }
      res.status(200).json(updatedPlace);
    } catch (err) {
      console.log(err);
      res.status(500).json("error updating place");
    }
  },

  deletePlace: async (req, res) => {
    try {
      const { placeId } = req.params;
      const placeToDelete = await Place.findOneAndDelete({
        _id: placeId,
        createdBy: req.user.id,
      });

      if (!placeToDelete) {
        return res.status(403).json("not authorized to delete this place");
      }
      res.status(200).json("place deleted successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json("error deleting place");
    }
  },
};

module.exports = placeController;
