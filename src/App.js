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
  const [pageNumber, setPageNumber] = useState(1)

  async function fetchData(search) {
    setLoading(true);
    // const pagetest = await axios.get(`https://www.omdbapi.com/?s=${search}&page=86&apikey=87763a8c`)
    // console.log(pagetest)
    const result = await axios.get(
      `https://www.omdbapi.com/?s=${search}&page=${pageNumber}&apikey=87763a8c`
    );
    setMovies(result.data.Search);
    if (result.data.Error === "Incorrect IMDb ID.") {
      setError("Please search for something");
    } else {
      setError(result.data.Error);
    }
    setLoading(false);
  }

  function onTextChange(event) {
    clearTimeout(timeoutId);
    setSearchText(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 1000);
    setTimeoutId(timeout);
  }

  return (
    <>
      <Router>
        <Header onTextChange={onTextChange} searchText={searchText} />
        <Routes>
          <Route
            path="/"
            element={
              <Movie
                movies={movies}
                error={error}
                spinner={Spinner}
                loading={loading}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
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
