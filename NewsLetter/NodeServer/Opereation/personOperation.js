const config = require("../Config/dbconfig.js");
var mysql = require("mysql");
var con = mysql.createConnection(config.databaseOptions);

async function getPersonFromAccountId(accountId) {
  var sqlGetPersonFromAccountId =
    "SELECT p.personId as id, p.firstName as first , p.middleName as middle,p.lastName as last , p.Dob as Dob ,p.DateOfCreated,p.imgId From person as p , account as a WHERE p.personId = a.personId AND a.accountId= ?";
  return new Promise((resolve, reject) => {
    con.query(sqlGetPersonFromAccountId, [accountId], function (err, result) {
      if (err) throw err;
      resolve(result);
    });
  });
}

async function getPersonFromId(personId) {
  var sqlGetPersonFromId =
    "select p.personId as id, p.firstName as first , p.middleName as middle,p.lastName as last , p.Dob as Dob ,p.DateOfCreated,p.imgId from person as p where personId = ? ";
  return new Promise((resolve, reject) => {
    con.query(sqlGetPersonFromId, [personId], function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
module.exports = {
  getPersonFromAccountId: getPersonFromAccountId,
  getPersonFromId: getPersonFromId,
};
