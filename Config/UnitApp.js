const { sign, verify } = require("jsonwebtoken");
const ProcessKey = require("../Constants/processKey");
const refreshTokens = require("../share_data/refreshToken");

const UnitApp = {
  generateJwt: (data) => {
    const accessToken = sign(data, ProcessKey.ACCESS_TOKEN_SECRET, {
      expiresIn: "60s",
    });
    const refreshToken = sign(data, ProcessKey.REFRESH_TOKEN_SECRET);
    console.log(refreshToken);
    refreshTokens.push(refreshToken);

    return { accessToken, refreshToken };
  },

  refreshToken: (token, userInfo) => {
    if (!token) return { status: 401 };

    if (!token.includes(token)) return { status: 403 };

    if (verify(token, ProcessKey.REFRESH_TOKEN_SECRET)) {
      return {
        accessToken: sign(userInfo, ProcessKey.ACCESS_TOKEN_SECRET, {
          expiresIn: "60s",
        }),
      };
    }
    return { status: 403 };
  },

  verifyJwt: (token) => {
    return verify(token, ProcessKey.ACCESS_TOKEN_SECRET);
  },
};

module.exports = UnitApp;
