const dboperations = require("./Opereation/authOperation");

const express = require("express");

var cors = require("cors");

const jwt = require("jsonwebtoken");

const mountRoutes = require("./Routes");

const dotenv = require("dotenv");

dotenv.config({ path: "../Config.env" });
// to Upload File(Image)
const multer = require("multer");

const upload = multer();

const fs = require("fs");

const userMiddleware = require("./middleware/users.js");
//for Increpted Passwords
const bcrypt = require("bcryptjs");

var app = express();

var router = express.Router();

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache");
  next();
});
app.use(cors());
app.options("*", cors());
const corsOptions = {
  origin: "http://localhost:4200",
  // origin: "http://10.0.0.36:4200",
};

app.use(cors(corsOptions));
mountRoutes(app);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});
