const Reply = require("../models/replyModel");
const Comment = require("../models/commentModel");

const replyController = {
  createReply: async (req, res) => {
    try {
      const { reply } = req.body;
      const { commentId } = req.params;
      console.log(reply);
      console.log(commentId);

      const comment = await Comment.findById(commentId);
      if (!comment) {
        console.log("hi");
        return res.status(404).json("comment not found");
      }

      const newReply = new Reply({
        reply,
        createdBy: req.user.id,
        comment: commentId,
      });
      console.log(newReply);
      const savedReply = await newReply.save();
      res.status(201).json(savedReply);
    } catch (err) {
      console.log(err);
      res.status(500).json("error creating reply");
    }
  },

  getRepliesByComment: async (req, res) => {
    try {
      const { commentId } = req.params;
      const replies = await Reply.find({ comment: commentId })
        .populate("createdBy", "name email")
        .exec();

      res.status(200).json(replies);
    } catch (err) {
      console.log(err);
      res.status(500).json("error fetching replies");
    }
  },

  deleteReply: async (req, res) => {
    try {
      const { replyId } = req.params;
      const deletedReply = await Reply.findOneAndDelete({
        _id: replyId,
        createdBy: req.user.id,
      });

      if (!deletedReply) {
        return res.status(403).json("not authorized to delete this reply");
      }

      res.status(200).json("reply deleted successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json("error deleting reply");
    }
  },
};

module.exports = replyController;
