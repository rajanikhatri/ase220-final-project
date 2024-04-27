const express = require("express");
const cityController = require("../controllers/cityController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

router.post(
  "/:countryId/cities",
  middlewareController.verifyToken,
  cityController.createCity
);
router.get("/:countryId/cities", cityController.getCitiesByCountry);
router.put(
  "/:countryId/cities/:cityId",
  middlewareController.verifyToken,
  cityController.updateCity
);
router.delete(
  "/:countryId/cities/:cityId",
  middlewareController.verifyToken,
  cityController.deleteCity
);
router.get("/:cityId", cityController.getCityById);

module.exports = router;
