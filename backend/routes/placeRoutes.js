const express = require("express");
const placeController = require("../controllers/placeController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

const setCityIdParam = (req, res, next) => {
  req.params.cityId = req.cityId;
  next();
};

router.get("/", setCityIdParam, placeController.getPlacesByCity);
router.post(
  "/",
  middlewareController.verifyToken,
  setCityIdParam,
  placeController.createPlace
);
router.put(
  "/:placeId",
  middlewareController.verifyToken,
  setCityIdParam,
  placeController.updatePlace
);
router.delete(
  "/:placeId",
  middlewareController.verifyToken,
  setCityIdParam,
  placeController.deletePlace
);
router.get("/:placeId", setCityIdParam, placeController.getPlaceById);

module.exports = router;
