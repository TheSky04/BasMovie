import React, { useEffect } from "react";
import "./css/WatchedBox.css";
import { useState } from "react";
import MovieDetail from "./MovieDetail";
import MoviesStats from "./MoviesStats";
import WatchedMovieItem from "./WatchedMovieItem";

function WatchedBox({
  selectedId,
  onCloseMovieDetail,
  setSelectedId,
  onHandleSelectedId,
}) {
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const watchedMoviesList = localStorage.getItem("watched") || [];
    return JSON.parse(watchedMoviesList);
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  const deleteWatchedMovie = (e, id) => {
    e.stopPropagation();

    setWatchedMovies((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  };

  return (
    <div className="box watchedBox--container">
      {selectedId && (
        <MovieDetail
          onCloseMovieDetail={onCloseMovieDetail}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          watchedMovies={watchedMovies}
          setWatchedMovies={setWatchedMovies}
        />
      )}
      {!selectedId && (
        <>
          <MoviesStats watchedMovies={watchedMovies} />
          <ul className="box--list" style={{ height: "calc(70rem - 96.4px)" }}>
            {watchedMovies?.map((movie) => (
              <WatchedMovieItem
                movie={movie}
                onHandleSelectedId={onHandleSelectedId}
                key={movie.imdbID}
                onDeleteWatchedMovie={deleteWatchedMovie}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default WatchedBox;
