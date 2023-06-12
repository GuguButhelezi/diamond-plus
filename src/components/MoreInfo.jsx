import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MoreInfo({ spinner }) {
  let navigate = useNavigate();
  const { imdbID } = useParams();
  const [idInfo, setIdInfo] = useState([]);
  const [load, setLoad] = useState(false);

  async function moreInfo() {
    setLoad(true);
    const more = await axios.get(
      `https://www.omdbapi.com/?i=${imdbID}&apikey=87763a8c`
    );
    setIdInfo(more.data);
    setLoad(false);
  }

  useEffect(() => {
    moreInfo();
  }, []);

  return (
    <>
      <button className="back" onClick={() => navigate(`/`)}>
        ← Back
      </button>
      {!load ? (
        <>
          <div className="mount">
            <h3>{idInfo.Title}</h3>
          </div>
          <div className="info__container">
            <div className="left">
              <img
                src={idInfo.Poster}
                className="left__img"
                alt="Poster Not Found"
              />
            </div>
            <div className="right">
              <div className="details">
                <h2 className="detail">
                  Release date : <p className="normal">{idInfo.Released}</p>
                </h2>
                <h2 className="detail">
                  Language : <p className="normal">{idInfo.Language}</p>
                </h2>
                <h2 className="detail">Rated: {idInfo.Rated}</h2>
                <h2 className="detail">
                  Runtime: <p className="normal">{idInfo.Runtime}</p>
                </h2>
                <h2 className="detail">Genre: {idInfo.Genre}</h2>
                <h2 className="detail">
                  Cast: <p className="normal">{idInfo.Actors}</p>
                </h2>
                <h2 className="detail">
                  Directed by: <p className="normal">{idInfo.Director}</p>
                </h2>
                <h2 className="detail">
                  Plot: <p className="normal">{idInfo.Plot}</p>
                </h2>
              </div>
            </div>
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

export default MoreInfo;
