const exprees = require("express");
const router = exprees.Router();
const bodyParser = require("body-parser");
body = bodyParser.urlencoded({ extended: true });
const multer = require("multer");
const upload = multer();
const {
  signUp,
  signIn,
  activeAccount,
  ChangePassword,
} = require("../Services/authServices");
const { isLoggedIn } = require("../middleware/users");
router.post("/SignUp", upload.none(), signUp);
router.post("/SignIn", upload.none(), signIn);
router.get("/ActiveMyEmail/:Token", activeAccount);
router.post("/ChangePassword", upload.none(), isLoggedIn, ChangePassword);
module.exports = router;
