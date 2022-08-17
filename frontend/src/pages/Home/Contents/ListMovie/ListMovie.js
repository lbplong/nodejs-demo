/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "../../../../API/Module/Movie";
import MovieItem from "../../../../components/MovieItem/MovieItem";
import "./ListMovie.css";

export default function ListMovie() {
  const [movieData, setMovieData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    itemsPerPage: 5,
  });
  const navigate = useNavigate();

  const _getMovies = async () => {
    const data = pagination;
    const dataResult = await Movie.getData(data);
    if (!dataResult.isAxiosError) {
      setMovieData(dataResult.data);
    }
  };

  const _getMoreMovies = async () => {
    const data = pagination;
    const dataResult = await Movie.getData(data);
    if (!dataResult.isAxiosError) {
      setMovieData([...movieData, ...dataResult.data]);
    }
  };

  const _handleScroll = (e) => {
    const { scrollTop, offsetHeight } = e.currentTarget;
    console.log(scrollTop, offsetHeight, movieData.length * 300);
    if (scrollTop + offsetHeight >= movieData.length * 300) {
      setPagination({ ...pagination, page: pagination.page + 1 });
      console.log(movieData);
    }
  };

  useEffect(() => {
    _getMovies();
  }, []);

  useEffect(() => {
    _getMoreMovies();
  }, [pagination]);

  const _handlerLikeThisMovie = async (id, isLike) => {
    const data = { id, isLike };
    const resultLike = await Movie.changeLikedMovie(data);
    console.log(resultLike);
    if (!resultLike.isAxiosError) {
      let tempMovie = [];
      movieData.forEach((t) => {
        if (t.id === id) {
          t.isLike = isLike;
        }
        tempMovie.push(t);
      });
      setMovieData(tempMovie);
    }
  };
  const _handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="container-content">
      <h1>List movie</h1>
      <button className="logout" onClick={_handleLogout}>
        Logout
      </button>
      <div className="list-movie" onScroll={_handleScroll}>
        {movieData &&
          movieData.map((i, key) => (
            <MovieItem
              movie={i}
              key={key}
              likeThisMovie={_handlerLikeThisMovie}
            />
          ))}
      </div>
    </div>
  );
}
