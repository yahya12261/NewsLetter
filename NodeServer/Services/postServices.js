const fs = require("fs");
const path = require("path");
const postOperation = require("../Opereation/postOperation");
const ImageOperation = require("../Opereation/ImageOperation");
const personOperation = require("../Opereation/personOperation");
const iconv = require("iconv-lite");
const { async } = require("./EmailService");
const exp = require("constants");
exports.insertNewPostWithImage = async (req, res, next) => {
  file = req.file;
  file.originalname = iconv.decode(
    Buffer.from(file.originalname, "latin1"),
    "utf8"
  );
  let date = new Date();
  let formData = req.body;
  OrignalFileName = file.originalname.split(".");
  NameLength = file.originalname.length;
  Name = OrignalFileName[0];
  Ext = OrignalFileName[OrignalFileName.length - 1];
  file.Ext = Ext;
  file.fileName =
    NameLength +
    "-Post-" +
    date.getFullYear() +
    date.getMonth() +
    date.getDay() +
    date.getHours() +
    date.getMinutes() +
    Name.split(" ").join("-").split("'").join("")[1] +
    Name.split(" ").join("-").split("'").join("")[2] +
    Name.split(" ").join("-").split("'").join("")[3] +
    Name.split(" ").join("-").split("'").join("")[4] +
    "." +
    Ext;
  file.path = "upload/Images/Post/" + file.fileName;
  imgId = 0;
  ImageOperation.setImage(file)
    .then((result) => {
      imgId = result;
      formData.imgId = imgId;
      formData.accountId = req.userData.userId;
      postOperation.CreateNewPost(formData).then((Presult) => {
        res.send("PostInserted ");
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occured during image upload.");
      // res.send();
    });
};
exports.UpdateProfilePhoto = async (req, res, next) => {
  file = req.file;
  let date = new Date();
  accountId = req.userData.userId;
  OrignalFileName = file.originalname.split(".");
  NameLength = file.originalname.length;
  Name = OrignalFileName[0];
  Ext = OrignalFileName[OrignalFileName.length - 1];
  file.Ext = Ext;
  file.fileName =
    NameLength +
    "-Profile-" +
    date.getFullYear() +
    date.getMonth() +
    date.getDay() +
    date.getHours() +
    date.getMinutes() +
    Name.split(" ").join("-").split("'").join("")[1] +
    Name.split(" ").join("-").split("'").join("")[2] +
    Name.split(" ").join("-").split("'").join("")[3] +
    Name.split(" ").join("-").split("'").join("")[4] +
    "." +
    Ext;
  file.path = "upload/Images/Profile/" + file.fileName;
  ImageOperation.UpdateProfileImage(accountId, file).then((result) => {
    res.send("Profile Updated");
  });
};
exports.insertNewPostWithoutImage = async (req, res, next) => {
  let formData = req.body;
  formData.imgId = null;
  formData.accountId = req.userData.userId;
  postOperation.CreateNewPost(formData).then((Presult) => {
    res.send("PostInserted ");
  });
};
exports.getPosts = async (req, res, next) => {
  postOperation.GetPosts().then((result) => {
    for (let x = 0; x <= result.length - 1; x++) {
      result[x].addComment = false;
      postOperation
        .getLastCommentByPostId(result[x].postId)
        .then((lastComment) => {
          try {
            if (lastComment[0]) {
              personOperation
                .getPersonFromId(lastComment[0].personId)
                .then((lastCommentPerson) => {
                  ImageOperation.getImageFromId(
                    lastCommentPerson[0].imgId
                  ).then((lastCoummentProfileImage) => {
                    lastCommentPerson[0].ProfileImage =
                      lastCoummentProfileImage[0];
                    lastComment[0].personInfo = lastCommentPerson[0];
                    result[x].lastComment = lastComment[0];
                  });
                });
            }
          } catch (err) {
            console.log(err);
          }
        });
      postOperation
        .getPostCommentCount(result[x].postId)
        .then((commentCount) => {
          result[x].coummentCount = commentCount[0].count;
        });
      postOperation.getPostLikesCount(result[x].postId).then((likeCount) => {
        result[x].likesCount = likeCount[0].count;
      });
      personOperation
        .getPersonFromAccountId(result[x].accountId)
        .then((PersResult) => {
          ImageOperation.getImageFromId(PersResult[0].imgId).then(
            (Pimgresult) => {
              PersResult[0].ProfileImage = Pimgresult[0];
              result[x].personInfo = PersResult[0];
              result[x].IsLike = 0;

              personOperation
                .getPersonFromAccountId(req.userData.userId)
                .then((MyPersonId) => {
                  postOperation
                    .isLikePost(MyPersonId[0].id)
                    .then((Likeresult) => {
                      {
                        for (let y = 0; y <= Likeresult.length; y++) {
                          try {
                            // console.log(Likeresult[y].postId);

                            if (result[x].postId == Likeresult[y].postId) {
                              result[x].IsLike = 1;
                              break;
                            } else {
                              result[x].IsLike = 0;
                            }
                          } catch (err) {
                            // console.log(err);
                          }
                        }
                        if (x == result.length - 1) {
                          return res.status(200).send({
                            result: result,
                          });
                        }
                      }
                    });
                });
            }
          );
        });
    }
  });
};
exports.getPostImages = async (req, res, next) => {
  const imgName = req.params.img;
  if (!imgName) {
    return res.status(400).send("Image name is required");
  }
  const imagePath = path.join(
    __dirname,
    "..",
    "uploads",
    "Images",
    "Post",
    imgName
  );
  const options = {
    root: "/",
  };
  res.sendFile(imagePath.substring(3), options, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    }
  });
};
exports.getProfileImages = async (req, res, next) => {
  const imgName = req.params.img;
  if (!imgName) {
    return res.status(400).send("Image name is required");
  }
  const imagePath = path.join(
    __dirname,
    "..",
    "uploads",
    "Images",
    "Profile",
    imgName
  );
  const options = {
    root: "/",
  };
  res.sendFile(imagePath.substring(3), options, (err) => {
    if (err) {
      console.error(err);
      res.status(err.status).end();
    }
  });
};
exports.setLike = async (req, res, next) => {
  let accountId = req.userData.userId;
  let postId = req.body.postId;
  personOperation.getPersonFromAccountId(accountId).then((Person) => {
    // MyPersonId[0].id
    postOperation.makeLike(Person[0].id, postId).then((result) => {});
    // Person[0];
  });
};

exports.setDislike = async (req, res, next) => {
  let accountId = req.userData.userId;
  let postId = req.body.postId;
  personOperation.getPersonFromAccountId(accountId).then((Person) => {
    // MyPersonId[0].id
    postOperation.makeDisLike(Person[0].id, postId).then((result) => {});
    // Person[0];
  });
};

exports.setComment = async (req, res, next) => {
  let formData = req.body;
  let accountId = req.userData.userId;
  personOperation.getPersonFromAccountId(accountId).then((Person) => {
    formData.personId = Person[0].id;
    postOperation.setComment(formData).then((result) => {});
  });
};

exports.getAllCommentFromPostId = async (req, res, next) => {
  let postId = req.params.postId;
  postOperation.getAllPostComments(postId).then((result) => {
    for (let x = 0; x <= result.length - 1; x++) {
      personOperation.getPersonFromId(result[x].personId).then((Person) => {
        try {
          if (Person[0]) {
            ImageOperation.getImageFromId(Person[0].imgId).then(
              (imageResult) => {
                try {
                  if (imageResult[0]) {
                    Person[0].ProfileImage = imageResult[0];
                    result[x].personInfo = Person[0];
                    if (x == result.length - 1) {
                      return res.status(200).send({
                        comments: result,
                      });
                    }
                  }
                } catch (err) {
                  console.log(err);
                }
              }
            );
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  });
};
