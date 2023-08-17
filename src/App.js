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
  const [display, setDisplay] = useState('none')

  async function fetchData(search, pageNumber) {
    setLoading(true);
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

    if (movies?.length > 0){
      setDisplay('flex')
      console.log(display)
    }

    return result
  }

  function onTextChange(event) {
    clearTimeout(timeoutId);
    setSearchText(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 1000);
    setTimeoutId(timeout);
  }

  function left(){
    if(pageNumber === 1){
      return
    }
    setPageNumber(pageNumber-1)
    fetchData(searchText, pageNumber-1)
    console.log(pageNumber-1)
  }

  function right(){
    if (error){
      return
    }
    setPageNumber(pageNumber+1)
    console.log(pageNumber+1)
    fetchData(searchText, pageNumber+1)
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
              searchText={searchText}
                movies={movies}
                error={error}
                spinner={Spinner}
                loading={loading}
                pageNumber={pageNumber}
                left={left}
                right={right}
                fetchData={fetchData}
                display={display}
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
