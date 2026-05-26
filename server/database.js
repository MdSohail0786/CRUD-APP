const mongoose = require("mongoose");

const databaseConnection = async () => {
  mongoose
    .connect("mongodb://localhost:27017/booksCollection")
    .then(() => {
      console.log("database is connected Successfully");
    })
    .catch((err) => {
      console.log("Database Conection failed", err);
    });
};

module.exports = databaseConnection;
