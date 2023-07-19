const personOperation = require("../Opereation/personOperation");
const imgOperation = require("../Opereation/ImageOperation");
exports.getPersonFromAccountId = async (req, res, next) => {
  personOperation.getPersonFromAccountId(req.userData.userId).then((result) => {
    try {
      imgOperation.getImageFromId(result[0].imgId).then((imgResult) => {
        return res.status(201).send({
          person: result,
          ProfileImg: imgResult,
        });
      });
    } catch (err) {}
  });
};
