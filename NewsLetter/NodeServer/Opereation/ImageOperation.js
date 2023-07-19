const config = require("../Config/dbconfig.js");
var mysql = require("mysql");

var con = mysql.createConnection(config.databaseOptions);

async function getImageFromId(ImageId) {
  var sqlGetImg =
    "SELECT imgId , imgLink as Link , imgExt as Ext from image where imgId = ? ";
  return new Promise((resolve, reject) => {
    con.query(sqlGetImg, [ImageId], function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}

async function setImage(Image) {
  var sqlInsertimage =
    "INSERT INTO image (imgId, imgLink, imgsize, imgExt) VALUES (NULL, ?, ?, ?);";
  var getLastimgId = "SELECT LAST_INSERT_ID() As Id;";

  return new Promise((resolve, reject) => {
    con.query(
      sqlInsertimage,
      [Image.path, null, Image.Ext],
      function (err, result) {
        if (err) {
          reject(err);
        } else {
          con.query(getLastimgId, function (e, Sresult) {
            if (e) {
              reject(e);
            } else {
              if (Sresult[0].Id) {
                resolve(Sresult[0].Id);
              } else {
                reject("Unable to retrieve last insert ID");
              }
            }
          });
        }
      }
    );
  });
}
async function InsertNewProfileImg() {
  var sqlInsertimage =
    "INSERT INTO image (imgId, imgLink, imgsize, imgExt) VALUES(NULL, 'upload/Images/Profile/11-Profile-20236118211357.png', '0', 'null');";
  var getLastimgId = "SELECT LAST_INSERT_ID() As Id;";

  return new Promise((resolve, reject) => {
    con.query(
      sqlInsertimage,

      function (err, result) {
        if (err) {
          reject(err);
        } else {
          con.query(getLastimgId, function (e, Sresult) {
            if (e) {
              reject(e);
            } else {
              if (Sresult[0].Id) {
                resolve(Sresult[0].Id);
              } else {
                reject("Unable to retrieve last insert ID");
              }
            }
          });
        }
      }
    );
  });
}
async function UpdateProfileImage(accountId, Image) {
  var UpdateImageFromAccountId = `UPDATE person AS p
  JOIN account AS a ON a.personId = p.personId
  JOIN image AS i ON p.imgId = i.imgId
  SET i.imgLink = ?, i.imgExt = ?
  WHERE a.accountId = ? AND p.personId = a.personId;`;
  con.query(
    UpdateImageFromAccountId,
    [Image.path, Image.Ext, accountId],
    function (err, result) {
      if (err) throw err;
      else {
      }
    }
  );
}

module.exports = {
  getImageFromId: getImageFromId,
  setImage: setImage,
  UpdateProfileImage: UpdateProfileImage,
  InsertNewProfileImg: InsertNewProfileImg,
};
