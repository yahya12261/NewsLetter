const multer = require("multer");
const iconv = require("iconv-lite");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/Images/Post");
  },
  filename: function (req, file, cb) {
    let date = new Date();
    file.originalname = iconv.decode(
      Buffer.from(file.originalname, "latin1"),
      "utf8"
    );
    OrignalFileName = file.originalname.split(".");
    Ext = OrignalFileName[OrignalFileName.length - 1];
    Name = OrignalFileName[1].split(" ");
    Name = OrignalFileName[0];
    NameLength = file.originalname.length;
    fileName =
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
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
