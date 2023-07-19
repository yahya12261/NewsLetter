const config = require("../Config/dbconfig.js");
var mysql = require("mysql");
const { async } = require("../Services/EmailService.js");
const { getHashes } = require("crypto");
console.log("dbOp Its work");
var con = mysql.createConnection(config.databaseOptions);

async function checkEmailName(Email) {
  var sql = "select accountId from account where Email = ? ";
  return new Promise((resolve, reject) => {
    con.query(sql, [Email], function (err, result) {
      if (err) {
        reject(err);
      } else if (result.length > 0) {
        resolve(result[0].accountId);
      } else {
        resolve(null);
      }
    });
  });
}
async function getLastAccountId() {
  var sql = "select accountId from account ORDER BY accountId DESC LIMIT 1 ";
  return new Promise((resolve, reject) => {
    con.query(sql, function (err, result) {
      if (err) {
        reject(err);
      } else if (result.length > 0) {
        resolve(result[0].accountId);
      } else {
        resolve(null);
      }
    });
  });
}

function createPerson(Person) {
  // dd/mm/yy

  var sqlInsertPerson =
    " INSERT INTO `person` (`personId`, `firstName`, `middleName`, `lastName`, `Dob`, `DateOfCreated`, `imgId`) VALUES (NULL,?,?,?,?,now(),?)";
  con.query(
    sqlInsertPerson,
    [Person.First, Person.Middle, Person.Last, Person.Dob, Person.imgId],
    function (err, result) {
      if (err) throw err;
    }
  );
  var sqlSelectId =
    "Select personId from person where firstName = ? AND middleName = ? AND lastName = ? AND Dob = ? AND DateOfCreated =now() ";
  return new Promise((resolve, reject) => {
    con.query(
      sqlSelectId,
      [Person.First, Person.Middle, Person.Last, Person.Dob],
      function (err, result) {
        if (err) throw err;
        resolve(result[0].personId);
      }
    );
  });
}
async function createAccount(Account, hash) {
  createPerson(Account).then((PersonId) => {
    const date = new Date();
    var insertAccount =
      "INSERT INTO `account` (`accountId`, `personId`, `Pass`, `lastLogin`, `Email`, `DateOfCreated`) VALUES (NULL,?,?,null,?,now())";
    con.query(
      insertAccount,
      [PersonId, hash, Account.Email, date],
      function (err, result) {
        result;
        if (err) throw err;
      }
    );
  });
}

async function LoginCheckEmail(Email) {
  var sql =
    "select accountId , Email, Pass, isActive from account where Email = ? ";
  return new Promise((resolve, reject) => {
    con.query(sql, [Email], function (err, result) {
      if (err) {
        reject(err);
      } else if (result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
}

async function updateLastLogin(personId) {
  var sqlUpdateLastLogin =
    "UPDATE account SET lastLogin = now() WHERE accountId = ?";
  con.query(sqlUpdateLastLogin, [personId], function (err, result) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}

async function activateAccount(accountId) {
  var sqlActvate = "UPDATE account SET isActive = 1 WHERE accountId = ?";
  con.query(sqlActvate, [accountId], function (err, result) {
    if (err) {
      console.log(err);
    } else {
    }
  });
}
async function getHashPassworde(accountId) {
  var sql = "select Pass from account where accountId = ? ";
  return new Promise((resolve, reject) => {
    con.query(sql, [accountId], function (err, result) {
      if (err) {
        reject(err);
      } else if (result.length > 0) {
        resolve(result[0]);
      } else {
        resolve(null);
      }
    });
  });
}

async function ChangePassword(formData) {
  var sqlChangePassword = "UPDATE account SET Pass  = ? where accountId = ?";
  con.query(
    sqlChangePassword,
    [formData.hash, formData.accountId],
    function (err, result) {
      if (err) throw err;
      else {
      }
    }
  );
}

module.exports = {
  checkEmailName: checkEmailName,
  getLastAccountId: getLastAccountId,
  createAccount: createAccount,
  LoginCheckEmail: LoginCheckEmail,
  updateLastLogin: updateLastLogin,
  activateAccount: activateAccount,
  getHashPassworde: getHashPassworde,
  ChangePassword: ChangePassword,
};
