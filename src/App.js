import { useState } from "react";
import Header from "./components/Header";
import Movie from "./components/Movie";
import MoreInfo from "./components/MoreInfo";
import axios from "axios";
import Spinner from "./assets/spinner-3.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [searchText, setSearchText] = useState("");
  const [timeoutId, setTimeoutId] = useState();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  

  async function fetchData(search, pageNumber) {
    setLoading(true);
    const result = await axios.get(
      `https://www.omdbapi.com/?s=${search}&page=${pageNumber}&apikey=87763a8c`);
    // const type = await axios.get(`https://www.omdbapi.com/?type=trending`)
    // console.log(type)
    
    setMovies(result.data.Search);
    console.log(movies);
    if (result.data.Error === "Incorrect IMDb ID.") {
      setError("Please search for something");
    } else {
      setError(result.data.Error);
    }
    setLoading(false);

    return result;
  }

  function filterMovies(filter) {
    if (filter === "Year, ascending") {
      setMovies(movies.slice().sort((a, b) => a.Year - b.Year));
    } else if (filter === "Year, descending") {
      setMovies(movies.slice().sort((a, b) => b.Year - a.Year));
    }
  }

  function onTextChange(event) {
    clearTimeout(timeoutId);
    setSearchText(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 1000);
    setTimeoutId(timeout);
    setPageNumber(1);
  }

  function left() {
    if (pageNumber === 1) {
      return;
    }
    setPageNumber(pageNumber - 1);
    fetchData(searchText, pageNumber - 1);
    console.log(pageNumber - 1);
  }

  function right() {
    if (error) {
      return;
    }
    setPageNumber(pageNumber + 1);
    console.log(pageNumber + 1);
    fetchData(searchText, pageNumber + 1);
  }

  return (
    <>
      <Router>
        <Header onTextChange={onTextChange} searchText={searchText} />
        <Routes>
          {/* <Route path="/:searchText" element={<Header/>} /> */}
          <Route
            path="/"
            element={
              <Movie
                searchText={searchText}
                movies={movies}
                error={error}
                spinner={Spinner}
                loading={loading}
                pageNumber={pageNumber}
                left={left}
                right={right}
                fetchData={fetchData}
                filterMovies={filterMovies}
              />
            }
          />
          <Route path="/:imdbID" element={<MoreInfo spinner={Spinner} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
