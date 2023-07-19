const authRoute = require("./authRoutes");
const personRoute = require("./personRoutes");
const postRoute = require("./PostRoutes");
const mountRoutes = (app) => {
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/person", personRoute);
  app.use("/api/v1/Post", postRoute);
};
module.exports = mountRoutes;
