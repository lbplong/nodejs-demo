const bodyParser = require("body-parser");
const express = require("express");
const { authorizedVerify } = require("../Config/Jwt");

const CheckIn = express();

CheckIn.use(bodyParser.urlencoded({ extended: true }));
CheckIn.use(express.json());

CheckIn.get("/", authorizedVerify, (req, res, next) => {
  res.sendStatus(200);
});

module.exports = CheckIn;
