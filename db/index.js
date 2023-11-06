require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const createDbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {})
    .then(() => {
      console.log("App is connected to database");
    })
    .catch((error) => {
      //   console.log(error);
      console.log("App is NOT Connected To database");
    });
};

const getDbConnection = () => {
  return mongoose.connection;
};

module.exports = {
  createDbConnection,
  getDbConnection,
};
