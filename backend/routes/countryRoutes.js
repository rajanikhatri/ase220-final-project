const express = require("express");
const countryController = require("../controllers/countryController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

router.post(
  "/",
  middlewareController.verifyToken,
  countryController.createCountry
);
router.get("/", countryController.getAllCountries);
// router.get("/:id", countryController.getCountryById);
router.put(
  "/:id",
  middlewareController.verifyToken,
  countryController.updateCountry
);
router.delete(
  "/:id",
  middlewareController.verifyToken,
  countryController.deleteCountry
);

module.exports = router;
