import React from "react";
import Look from "../assets/undraw_home_cinema_l7yl.svg";
import { useNavigate } from "react-router-dom";

function Movie({
  searchText,
  fetchData,
  movies,
  error,
  spinner,
  loading,
  pageNumber,
  setPageNumber,
}) {
  let navigate = useNavigate();
  
  // function turnPageLeft() {
  //   if ( !searchText || pageNumber < 1) {
  //     return;
  //   } 
    
  //   if (pageNumber > 0) {
  //     setPageNumber(pageNumber - 1);
  //     fetchData(searchText);
  //   } 
  // }

  // function turnPageRight() {
  //   if (!searchText || !movies) {
  //     return;
  //   } 

  //   if (pageNumber >= 1 ) {
  //     setPageNumber(pageNumber + 1);
  //     console.log(fetchData(searchText));
  //   }

  // }

  return (
    <>
      {!loading ? (
        <>
          <div className="page__buttons">
            <button className="page__turner--left">
              <span>←</span>
            </button>
            <div className="current__page">{pageNumber}</div>
            <button className="page__turner--right">
              <span>→</span>
            </button>
          </div>
          <div className="movie__container">
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
