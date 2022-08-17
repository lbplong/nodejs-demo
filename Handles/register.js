const express = require("express");
const bodyParser = require("body-parser");
const User = require("../module/User");
const Users = require("../share_data/users");
const UnitApp = require("../Config/UnitApp");

const RegisterHandler = express();

RegisterHandler.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
RegisterHandler.use(express.json());

RegisterHandler.post("/", (req, res, next) => {
  const { email, username, password } = req.body;

  const exitsUser = Users.filter(
    (i) => i.username === username || i.email === email
  )[0];

  if (exitsUser) {
    res.status(403).json({
      message: "User already exits",
    });
  } else {
    const id = Users.length + 1;
    const newUser = new User(id, email, username, password);
    Users.push(newUser);
    const data = { id, username, email };
    const { accessToken, refreshToken } = UnitApp.generateJwt(data);

    res.status(200).json({ accessToken, refreshToken });
  }
});

module.exports = RegisterHandler;
