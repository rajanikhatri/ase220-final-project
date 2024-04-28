const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let refreshTokens = [];

const userController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30d" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  registerUser: async (req, res) => {
    try {
      const { name, email, password: reqPassword, pic } = req.body;
      const existUser = await User.findOne({ email });
      console.log(existUser);
      if (existUser) {
        return res.status(404).json("User already exist");
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(reqPassword, salt);
      const newUser = await User.create({
        name: name,
        email: email,
        password: hashed,
        pic: pic,
      });

      const accessToken = userController.generateAccessToken(newUser);
      const refreshToken = userController.generateRefreshToken(newUser);

      refreshTokens.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      const { password, ...others } = newUser._doc;
      res.status(200).json({ ...others, accessToken, refreshToken });
    } catch (err) {
      res.status(500).json("cannot register user");
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json("Incorrect email");
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json("Incorrect password");
      }

      if (user && validPassword) {
        const accessToken = userController.generateAccessToken(user);
        const refreshToken = userController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json("Refresh token is not valid");
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens.filter((token) => token != refreshToken);
      const newAccessToken = userController.generateAccessToken(user);
      const newRefreshToken = userController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  logout: async (req, res) => {
    refreshTokens.filter((token) => token != req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logout successfully!");
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}, "-password");
      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json("Error retrieving users");
    }
  },
};

module.exports = userController;
