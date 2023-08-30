import React from "react";
import Look from "../assets/undraw_home_cinema_l7yl.svg";
import { useNavigate } from "react-router-dom";



function Movie({
  movies,
  error,
  spinner,
  loading,
  pageNumber,
  left,
  right,
  filterMovies,
}) {
  let navigate = useNavigate();

  return (
    <>
      {!loading ? (
        <>
          <>
            <>
              {!error ? (
                <div className="page__buttons" style={{ display: "flex" }}>
                  <button className="page__turner--left" onClick={left}>
                    <span>←</span>
                  </button>
                  <div className="current__page">{pageNumber}</div>
                  <button className="page__turner--right" onClick={right}>
                    <span>→</span>
                  </button>
                </div>
              ) : (
                <div className="page__buttons" style={{ display: "none" }}>
                  <button className="page__turner--left" onClick={left}>
                    <span>←</span>
                  </button>
                  <div className="current__page">{pageNumber}</div>
                  <button className="page__turner--right" onClick={right}>
                    <span>→</span>
                  </button>
                </div>
              )}
            </>
          </>
          <div className="movie__container">
            <>
              {movies?.length > 0 ? (
                <select
                  id="filter"
                  defaultValue="DEFAULT"
                  onChange={(event) => filterMovies(event.target.value)}
                >
                  <option value="DEFAULT" disabled>
                    Sort by:
                  </option>
                  <option value="Year, ascending">Year, ascending</option>
                  <option value="Year, descending">Year, descending</option>
                </select>
              ) : (
                ""
              )}
            </>
            {movies?.length > 0 ? (
              movies.map((movie) => (
                <div className="movie" key={movie.imdbID}>
                  <div
                    className="movie__description"
                    onClick={() => navigate(`/${movie.imdbID}`)}
                  >
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
