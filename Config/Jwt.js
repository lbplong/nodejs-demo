const { verify } = require("jsonwebtoken");
const ProcessKey = require("../Constants/processKey");

const JWTHandler = {
  authorizedVerify: (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    // 'Beaer [token]'
    const token = authorizationHeader.split(" ")[1];
    if (!token) res.sendStatus(401);

    verify(token, ProcessKey.ACCESS_TOKEN_SECRET, (err, data) => {
      console.log(err);
      if (err) res.sendStatus(403);
      req.accountId = data?.id;
      next();
    });
  },
};
module.exports = JWTHandler;
