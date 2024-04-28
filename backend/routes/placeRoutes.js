const express = require("express");
const placeController = require("../controllers/placeController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

const setCityIdContext = (req, res, next) => {
  req.params.cityId = req.cityId;
  next();
};

router.get("/", setCityIdContext, placeController.getPlacesByCity);
router.post(
  "/",
  middlewareController.verifyToken,
  setCityIdContext,
  placeController.createPlace
);
router.put(
  "/:placeId",
  middlewareController.verifyToken,
  setCityIdContext,
  placeController.updatePlace
);
router.delete(
  "/:placeId",
  middlewareController.verifyToken,
  setCityIdContext,
  placeController.deletePlace
);
router.get("/:placeId", setCityIdContext, placeController.getPlaceById);

module.exports = router;
