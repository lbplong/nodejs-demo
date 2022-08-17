const express = require("express");
const bodyParser = require("body-parser");
const UnitApp = require("../Config/UnitApp");
const Users = require("../share_data/users");

const LoginHandler = express();

LoginHandler.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

LoginHandler.use(express.json());

LoginHandler.post("/", (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  const accountLogin = Users.filter(
    (i) => i.username === username || i.email === username
  )[0];
  if (!accountLogin) {
    res.status(404).json({
      message: "User is not exist",
    });
  }

  if (accountLogin.password !== password) {
    res.status(403).json({
      message: "Incorrect password",
    });
  }

  const data = {id:accountLogin.id, username, email: accountLogin.email };
  const { accessToken, refreshToken } = UnitApp.generateJwt(data);

  res.status(200).json({ accessToken, refreshToken });
});

module.exports = LoginHandler;
