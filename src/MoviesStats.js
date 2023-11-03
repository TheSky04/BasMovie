import React from "react";
import "./css/MoviesStats.css";

function MoviesStats({ watchedMovies }) {
  const totalImdbRating = watchedMovies?.reduce(
    (acc, cur) => acc + cur.imdbRating,
    0
  );
  const totalUserRating = watchedMovies?.reduce(
    (acc, cur) => acc + cur.userRating,
    0
  );
  const totalRuntime = watchedMovies?.reduce(
    (acc, cur) => acc + cur.runtime,
    0
  );

  const countOfMovies = watchedMovies?.length;

  const avgImdbRating = (totalImdbRating / countOfMovies || 0).toFixed(2);
  const avgUserRating = (totalUserRating / countOfMovies || 0).toFixed(2);

  return (
    <div className="watchedBoxContainer">
      <h1>Movies you watched</h1>
      <div className="watchedBox">
        <div className="watchedBox--item">
          <span>🎥</span>
          <div>{countOfMovies} movies</div>
        </div>
        <div className="watchedBox--item">
          <span className="imdbRating">⭐</span>
          <div>{avgImdbRating}</div>
        </div>
        <div className="watchedBox--item">
          <span className="userRating">🌟</span>
          <div>{avgUserRating}</div>
        </div>
        <div className="watchedBox--item">
          <span>⏳</span>
          <div>{totalRuntime} min</div>
        </div>
      </div>
    </div>
  );
}

export default MoviesStats;
