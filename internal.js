const http = require("http");
const path = require("path");

const hostname = "localhost";
const port = 3001;

const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const server = express();
const Assertion = require("./Paths/Asserts/index");
const LoginHandler = require("./Handles/login");
const RegisterHandler = require("./Handles/register");
const cors = require("cors");
const MovieHandler = require("./Handles/movie");
const CheckIn = require("./Handles/CheckIn");

dotenv.config();

server.use(cors());
server.use(express.static(path.join(__dirname, "/")));
server.engine("html", require("ejs").renderFile);
server.set("view engine", "html");
server.engine("js", require("ejs").renderFile);
server.set("view engine", "js");
server.set("/", __dirname);

server.use("/assert", Assertion);
server.use("/check-in", CheckIn);
server.use("/register", RegisterHandler);
server.use("/login", LoginHandler);
server.use("/movies", MovieHandler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = server;
