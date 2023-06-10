import React from "react";
import Look from "../assets/undraw_home_cinema_l7yl.svg";
import { useNavigate } from "react-router-dom";

function Movie({ movies, error, spinner, loading }) {
  let navigate = useNavigate();

  return (
    <>
      {!loading ? (
        <>
          <div className="movie__container">
            {movies?.length > 0 ? (
              movies.map((movie) => (
                <div
                  className="movie"
                  key={movie.imdbID}
                  onClick={() => navigate(`/${movie.imdbID}`)}
                >
                  <div className="movie__description">
                    <h2>More Info→</h2>
                  </div>
                  <img
                    src={movie.Poster}
                    alt="Poster Not Found"
                    className="movie__poster"
                  />
                  <div className="info">
                    <span className="movie__title"> {movie.Title}</span>
                    <span className="movie__year">{movie.Year}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="mount">
                <img src={Look} className="search__img" />
                <h3>{error || "Please Search for something"}</h3>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="spinner">
          <img src={spinner} alt="" />
        </div>
      )}
    </>
  );
}

export default Movie;
