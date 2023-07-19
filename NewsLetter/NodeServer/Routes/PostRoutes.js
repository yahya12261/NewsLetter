const exprees = require("express");
const router = exprees.Router();
const { isLoggedIn } = require("../middleware/users");
const postUpload = require("../Services/PostImageService");
const profileUpdate = require("../Services/ChangeProfileImageServices");
const {
  insertNewPostWithImage,
  insertNewPostWithoutImage,
  getPosts,
  getPostImages,
  getAllCommentFromPostId,
  setComment,
  setDislike,
  setLike,
  UpdateProfilePhoto,
  getProfileImages,
} = require("../Services/postServices");
const upload = require("../Services/PostImageService");
router.post(
  "/addPostwithImage",
  postUpload.single("file"),
  isLoggedIn,
  insertNewPostWithImage
);
router.post(
  "/ProfileUpdate",
  profileUpdate.single("file"),
  isLoggedIn,
  UpdateProfilePhoto
);

router.post(
  "/addPostwithoutImage",
  upload.none(),
  isLoggedIn,
  insertNewPostWithoutImage
);

router.get("/getPosts", isLoggedIn, getPosts);
router.get("/getPostsImg/:img", getPostImages);
router.get("/getProfileImg/:img", getProfileImages);
router.post("/makeLike", upload.none(), isLoggedIn, setLike);
router.post("/makeDisLike", upload.none(), isLoggedIn, setDislike);
router.post("/setComment", upload.none(), isLoggedIn, setComment);
router.get(
  "/getAllCommentFromPostId/:postId",
  isLoggedIn,
  getAllCommentFromPostId
);
module.exports = router;
