const Assertion = require("express")();

Assertion.get("/", (req, res, next) => {
  res.sendFile("assert.html", { root: process.cwd() });
});

module.exports = Assertion;
