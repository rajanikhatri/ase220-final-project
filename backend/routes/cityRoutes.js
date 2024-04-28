const express = require("express");
const cityController = require("../controllers/cityController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

router.post(
  "/",
  middlewareController.verifyToken,
  (req, res, next) => {
    req.params.countryId = req.countryId;
    next();
  },
  cityController.createCity
);

router.get(
  "/",
  (req, res, next) => {
    req.params.countryId = req.countryId;
    next();
  },
  cityController.getCitiesByCountry
);

router.put(
  "/:cityId",
  middlewareController.verifyToken,
  (req, res, next) => {
    req.params.countryId = req.countryId;
    next();
  },
  cityController.updateCity
);

router.delete(
  "/:cityId",
  middlewareController.verifyToken,
  (req, res, next) => {
    req.params.countryId = req.countryId;
    next();
  },
  cityController.deleteCity
);

router.get(
  "/:cityId",
  (req, res, next) => {
    req.params.countryId = req.countryId;
    next();
  },
  cityController.getCityById
);

module.exports = router;
