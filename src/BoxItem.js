import React from 'react';
import './css/BoxItem.css';

function BoxItem({ movie, onHandleSelectedId }) {
  return (
    <li className="box--item" key={movie.imdbID} id={movie.imdbID} onClick={() => onHandleSelectedId(movie.imdbID)}>
      <img width="50" src={movie.Poster} />
      <div className="box--item--description">
        <h4>{movie.Title}</h4>
        <p>Year : {movie.Year}</p>
      </div>
    </li>
  );
}

export default BoxItem;
