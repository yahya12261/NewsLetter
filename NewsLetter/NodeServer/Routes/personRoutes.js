const exprees = require("express");
const router = exprees.Router();
const multer = require("multer");
const upload = multer();
const { getPersonFromAccountId } = require("../Services/personServices");
const { isLoggedIn } = require("../middleware/users");
router.get("/getPerson", isLoggedIn, getPersonFromAccountId);

module.exports = router;
