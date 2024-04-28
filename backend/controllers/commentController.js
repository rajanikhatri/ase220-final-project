const Comment = require("../models/commentModel");
const Place = require("../models/placeModel");

const commentController = {
  createComment: async (req, res) => {
    try {
      const { comment } = req.body;
      const { placeId } = req.params;

      const newComment = new Comment({
        comment,
        createdBy: req.user.id,
        place: placeId,
      });

      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (err) {
      console.log(err);
      res.status(500).json("error creating comment");
    }
  },

  getCommentsByPlace: async (req, res) => {
    try {
      const { placeId } = req.params;
      const comments = await Comment.find({ place: placeId }).populate(
        "createdBy",
        "name email"
      );

      if (!comments || comments.length === 0) {
        return res.status(404).json("no comments found for this place");
      }
      res.status(200).json(comments);
    } catch (err) {
      console.log(err);
      res.status(500).json("error fetching comments");
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { commentId } = req.params;
      const deletedComment = await Comment.findOneAndDelete({
        _id: commentId,
        createdBy: req.user.id,
      });

      if (!deletedComment) {
        return res.status(403).json("not authorized to delete this comment");
      }
      res.status(200).json("comment deleted");
    } catch (err) {
      console.log(err);
      res.status(500).json("error deleting comment");
    }
  },
};

module.exports = commentController;
