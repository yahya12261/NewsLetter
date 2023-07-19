const dboperations = require("../Opereation/authOperation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ImageOperation = require("../Opereation/ImageOperation");
const emailSender = require("./EmailService");
const authOperation = require("../Opereation/authOperation");
console.log("Its work");
const dotenv = require("dotenv");
dotenv.config({ path: "../Config.env" });
exports.signUp = async (req, res, next) => {
  let formData = req.body;
  let Email = formData.Email;
  dboperations.checkEmailName(Email).then((result) => {
    if (result > 0 && result) {
      return res.status(409).send({
        msg: "This username is already in use!",
      });
    } else {
      bcrypt.hash(formData.Pass, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({
            msg: err,
          });
        } else {
          let ImgId = 0;
          ImageOperation.InsertNewProfileImg().then((imgId) => {
            // ImgId = imgId[0].id;
            formData.imgId = imgId;

            dboperations
              .createAccount(formData, hash)
              .then(() => {
                return dboperations.getLastAccountId(Email);
              })
              .then((accountId) => {
                var token = jwt.sign(
                  {
                    userId: accountId + 1,
                  },
                  process.env.Secretkey,
                  {
                    expiresIn: "7d",
                  }
                );

                // Create activation link using JWT token
                const Link =
                  process.env.ServerName +
                  process.env.PORT +
                  "/api/v1/auth/ActiveMyEmail/" +
                  token;

                // Send email to user with activation link
                emailSender.async(Email, "Your Activation Link is : " + Link);

                return res.status(201).send({
                  msg: "Registered!",
                });
              })
              .catch((err) => {
                return res.status(400).send({
                  msg: err,
                });
              });
          });
        }
      });
    }
  });
};
exports.signIn = (req, res) => {
  let formData = req.body;
  let Email = formData.Email;
  let Pass = formData.Pass;
  try {
    dboperations.LoginCheckEmail(Email).then((result) => {
      if (!result) {
        return res.status(401).send({
          msg: "The username is incorrect!",
        });
      } else {
        bcrypt.compare(Pass, result["Pass"], (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "The password is incorrect!",
            });
          }
          if (bResult) {
            if (result["isActive"] == 1) {
              const token = jwt.sign(
                {
                  Email: result["Email"],
                  userId: result["accountId"],
                },

                process.env.Secretkey,
                {
                  expiresIn: "7d",
                }
              );
              dboperations
                .updateLastLogin(result["accountId"])
                .then((result) => {});

              return res.status(200).send({
                msg: "Logged in!",
                token,
              });
            } else {
              return res.status(401).send({
                msg: "Please Activte Your Account",
              });
            }
          }
          return res.status(401).send({
            msg: "The password is incorrect!",
          });
        });

        {
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.activeAccount = (req, res) => {
  let Token = req.params.Token;

  const decoded = jwt.verify(Token, process.env.Secretkey);

  dboperations.activateAccount(decoded.userId).then((result) => {
    res.send("User Active");
  });
};
exports.ChangePassword = (req, res, next) => {
  let formData = req.body;
  let accountId = req.userData.userId;
  console.log("accountId", accountId);

  authOperation.getHashPassworde(accountId).then((hash) => {
    console.log("hash", hash);
    console.log("hash", hash["Pass"]);
    console.log("pass", formData.oldPass);
    bcrypt.compare(formData.oldPass, hash["Pass"], (bErr, bResult) => {
      // wrong password

      if (bErr) {
        console.log(bErr);
        return res.status(400).send({
          msg: "The password is incorrect!",
        });
      }
      if (bResult) {
        console.log("Succ", bResult);
        console.log("newPass", formData.newPass);
        bcrypt.hash(formData.newPass, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            console.log(hash);
            formData.hash = hash;
            formData.accountId = accountId;
            authOperation.ChangePassword(formData).then((updatePassResult) => {
              return res.status(200).send({
                msg: "Password has Change successfully",
              });
            });
          }
        });
      }
    });
  });
};
