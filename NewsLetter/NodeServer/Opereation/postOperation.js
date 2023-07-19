const config = require("../Config/dbconfig.js");
var mysql = require("mysql");
const fs = require("fs");
var con = mysql.createConnection(config.databaseOptions);
async function CreateNewPost(formData) {
  var sqlCreateNewPost =
    "INSERT INTO post (postId, accountId, Paragraph, DateOfCreated, imgId) VALUES (null, ?, ?, now(),?)";
  con.query(
    sqlCreateNewPost,
    [formData.accountId, formData.Paragraph, formData.imgId],
    function (err, result) {
      if (err) throw err;
    }
  );
}
async function GetPosts() {
  sqlGetPosts = `SELECT p.postId, p.accountId, p.Paragraph, p.DateOfCreated, IFNULL(i.imgLink, NULL) AS imgLink, p.imgId
  FROM post AS p
  LEFT JOIN image AS i ON i.imgId = p.imgId
  ORDER BY p.DateOfCreated desc`;
  return new Promise((resolve, reject) => {
    con.query(sqlGetPosts, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
}

async function getLastCommentByPostId(postId) {
  var sqlgetlastComment = ` SELECT commentContent ,  personId ,CommentDate  from comments where postId = ? order by CommentDate limit 1 `;
  return new Promise((resolve, reject) => {
    con.query(sqlgetlastComment, [postId], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
async function getPostLikesCount(postId) {
  var sqlgetPersonLikes = `select count(personId) as count from likes where postId = ?`;
  return new Promise((resolve, reject) => {
    con.query(sqlgetPersonLikes, [postId], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
async function getPostCommentCount(postId) {
  var sqlGetCommentCount =
    "select count(postId) as count from comments where postId = ? ";
  return new Promise((resolve, reject) => {
    con.query(sqlGetCommentCount, [postId], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
async function isLikePost(personId) {
  var CheckPersonIsLike = "select postId from likes where personId = ? ";
  return new Promise((resolve, reject) => {
    con.query(CheckPersonIsLike, [personId], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
async function makeLike(personId, postId) {
  var sqlMakeLike = "insert into likes (personId,postId) Values (?,?)";
  con.query(sqlMakeLike, [personId, postId], function (err, result) {});
}
async function makeDisLike(personId, postId) {
  var sqlMakeLike = "delete FROM  likes where personId = ? and postId = ?";
  con.query(sqlMakeLike, [personId, postId], function (err, result) {});
}
async function setComment(formData) {
  var sqlAddComment =
    "INSERT INTO `comments` (`personId`, `commentContent`, `postId`, `CommentDate`) VALUES (?, ?, ?, now());";
  con.query(
    sqlAddComment,
    [formData.personId, formData.commentContent, formData.postId],
    function (err, result) {}
  );
}
async function getAllPostComments(postId) {
  var sqlGetAllPostComment =
    "select personId ,commentContent,CommentDate from comments where postId = ?";

  return new Promise((resolve, reject) => {
    con.query(sqlGetAllPostComment, [postId], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
module.exports = {
  CreateNewPost: CreateNewPost,
  GetPosts: GetPosts,
  getLastCommentByPostId: getLastCommentByPostId,
  getPostLikesCount: getPostLikesCount,
  isLikePost: isLikePost,
  getPostCommentCount: getPostCommentCount,
  getAllPostComments: getAllPostComments,
  makeLike: makeLike,
  makeDisLike: makeDisLike,
  setComment: setComment,
};
