const express = require("express");
const bodyParser = require("body-parser");
const { authorizedVerify } = require("../Config/Jwt");
const movies = require("../share_data/movie");
const likes = require("../share_data/likes");

const MovieApi = express();

MovieApi.use(express.json());
MovieApi.use(bodyParser.urlencoded({ extended: true }));

MovieApi.get("/", authorizedVerify, (req, res, next) => {
  const { page, itemsPerPage } = req.query;
  const min = (page - 1) * Number(itemsPerPage);
  const max = min + Number(itemsPerPage);
  const accountId = req.accountId;
  const result = movies.filter(
    (m) => movies.indexOf(m) >= min && movies.indexOf(m) < max
  );
  if (result.length > 0) {
    let resultArray = [];
    result.forEach((r) => {
      r.isLike = Boolean(
        likes.filter((l) => l.userId === accountId && r.id === l.movieId)[0]
      );
      resultArray.push(r);
    });
    res.status(200).json(resultArray);
  }
  res.sendStatus(404);
});

MovieApi.post("/like", authorizedVerify, (req, res, next) => {
  const { id, isLike } = req.body;
  const { accountId } = req;

  const likeEvent = { userId: accountId, movieId: id };
  console.log(likeEvent);

  if (isLike) {
    likes.push(likeEvent);
  } else {
    for (let i = 0; i < likes.length; i++) {
      if (
        likes[i].userId === likeEvent.userId &&
        likes[i].movieId === likeEvent.movieId
      ) {
        likes.splice(i, 1);
      }
    }
  }
  res.sendStatus(202);
});

module.exports = MovieApi;
