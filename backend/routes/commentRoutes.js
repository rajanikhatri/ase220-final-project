const express = require("express");
const commentController = require("../controllers/commentController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

const setPlaceIdParam = (req, res, next) => {
  req.params.placeId = req.placeId;
  next();
};

router.post(
  "/",
  middlewareController.verifyToken,
  setPlaceIdParam,
  commentController.createComment
);
router.get("/", setPlaceIdParam, commentController.getCommentsByPlace);
router.delete(
  "/:commentId",
  middlewareController.verifyToken,
  setPlaceIdParam,
  commentController.deleteComment
);

module.exports = router;
