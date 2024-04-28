const express = require("express");
const replyController = require("../controllers/replyController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

const setCommentIdParam = (req, res, next) => {
  req.params.commentId = req.commentId;
  next();
};

router.post(
  "/",
  middlewareController.verifyToken,
  setCommentIdParam,
  replyController.createReply
);
router.get("/", setCommentIdParam, replyController.getRepliesByComment);
router.delete(
  "/:replyId",
  middlewareController.verifyToken,
  setCommentIdParam,
  replyController.deleteReply
);

module.exports = router;
