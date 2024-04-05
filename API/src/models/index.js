const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const db = {};

let sequelize;
db.sequelize = sequelize;

db.sequelize
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;