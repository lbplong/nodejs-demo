import React from "react";
import "./MovieStyle.css";

export default function MovieItem(props) {
  const { movie, likeThisMovie } = props;
  const _handleLikedMovie = () => {
    likeThisMovie(movie.id, !movie.isLike);
  };
  return (
    <div className="card">
      <div className="card-box">
        <img src={movie.imageUrl} alt="Avatar" />
        <div className="container">
          <h2>{movie.title}</h2>
          <h4>
            <b>Year: {movie.year}</b>
          </h4>
          <button
            onClick={_handleLikedMovie}
            style={{ backgroundColor: `${movie.isLike ? "red" : ""}` }}
          >
            like
          </button>
        </div>
      </div>
    </div>
  );
}
