import React from "react";
import "./css/ListBox.css";
import BoxItem from "./BoxItem";
import { useState, useEffect } from "react";

function ListBox({ searchValue = "", onHandleSelectedId, movies, setMovies }) {
  const [error, setError] = useState("");
  const [showBox, setShowBox] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);

        if (searchValue.length < 3) {
          setIsLoading(false);
          setMovies([]);
          setError("");
          setShowIcon(false);
        }

        const response = await fetch(
          `http://omdbapi.com/?apikey=94a268b6&s=${searchValue}`
        );

        const data = await response.json();

        if (data.Response === "False") {
          setIsLoading(false);
          setShowIcon(false);
          throw new Error("⛔Movie Not found.");
        }
        setShowIcon(true);
        setMovies(data.Search);
        setIsLoading(false);
        setError("");
      } catch (err) {
        setError(err.message);
      }
    }
    getMovies();
  }, [searchValue]);

  return (
    <div className="box">
      {showIcon && (
        <div className="close" onClick={() => setShowBox(!showBox)}>
          {showBox ? "-" : "+"}
        </div>
      )}
      {isLoading && <p className="loading">Loading ...</p>}
      {error && <p className="box--error">{error}</p>}
      {!isLoading && showBox && !error && (
        <ul className="box--list">
          {movies
            ?.filter((movie) => movie.Poster !== "N/A")
            .map((movie) => (
              <BoxItem
                movie={movie}
                onHandleSelectedId={onHandleSelectedId}
                key={movie.imdbID}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

export default ListBox;
