const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("../backend/routes/userRoutes");
const countryRoutes = require("../backend/routes/countryRoutes");
const cityRoutes = require("../backend/routes/cityRoutes");
const placeRoutes = require("../backend/routes/placeRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/v1/user", userRoutes);
app.use("/v1/countries", countryRoutes);
app.use(
  "/v1/countries/:countryId/cities",
  (req, res, next) => {
    req.countryId = req.params.countryId;
    next();
  },
  cityRoutes
);

app.use(
  "/v1/cities/:cityId/places",
  (req, res, next) => {
    req.cityId = req.params.cityId;
    next();
  },
  placeRoutes
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
