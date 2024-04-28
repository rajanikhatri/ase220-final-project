const express = require("express");
const userController = require("../controllers/userController");
const middlewareController = require("../controllers/middlewareController");

const router = express.Router();

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/refresh", userController.requestRefreshToken);
router.post("/logout", middlewareController.verifyToken, userController.logout);
router.get("/all", userController.getAllUsers);

module.exports = router;
