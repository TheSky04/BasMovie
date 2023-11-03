import React from 'react';
import './css/WatchedMovieItem.css';

function WatchedMovieItem({ movie, onHandleSelectedId, onDeleteWatchedMovie }) {
  return (
    <li
      className="watchedMovieItem"
      key={movie.imdbID}
      id={movie.imdbID}
      onClick={() => onHandleSelectedId(movie.imdbID)}
    >
      <img src={movie.img} alt="movie's photo" />
      <h4>{movie.title}</h4>
      <p>🌟{movie.userRating}</p>
      <p>⭐{movie.imdbRating} </p>
      <p>⌛{movie.runtime}</p>
      <button className="watchedMovieItem--button" onClick={e => onDeleteWatchedMovie(e, movie.imdbID)}>
        &times;
      </button>
    </li>
  );
}

export default WatchedMovieItem;
