import { useEffect, useState } from "react";
import "./css/MovieDetail.css";
import StarRating from "./StarRating";

const MovieDetail = ({
  selectedId,
  onCloseMovieDetail,
  setSelectedId,
  watchedMovies,
  setWatchedMovies,
}) => {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const closeMovieDetail = (e) => {
      if (e.code === "Escape") {
        setSelectedId("");
      }
    };
    window.addEventListener("keydown", closeMovieDetail);

    return () => window.removeEventListener("keydown", closeMovieDetail);
  }, []);

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=94a268b6&i=${selectedId}`
      );
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    document.title = `BasMovie | ${movie.Title}`;

    return () => (document.title = `BasMovie`);
  }, [movie.Title]);

  const addMovieToWatchedMovie = (mov) => {
    if (watchedMovies?.some((movie) => movie.imdbID === mov.imdbID)) {
      setWatchedMovies((watchedMovies) =>
        watchedMovies?.filter((movie) => movie.imdbID !== mov.imdbID)
      );
      setSelectedId("");
      return;
    }

    const watchedMovie = {
      imdbID: mov.imdbID,
      img: mov.Poster,
      title: mov.Title,
      userRating,
      runtime: +mov.Runtime.split(" ").at(0) || 0,
      imdbRating: +mov.imdbRating,
    };

    setWatchedMovies([...watchedMovies, watchedMovie]);

    setSelectedId("");
  };

  const isItemInTheWatchedMovie = watchedMovies?.some(
    (mov) => mov.imdbID === movie.imdbID
  );

  const selectedMovie = watchedMovies?.find(
    (movie) => movie.imdbID === selectedId
  );

  return (
    <>
      {isLoading && (
        <p style={{ textAlign: "center", color: "#fff", fontSize: "20px" }}>
          Loading...
        </p>
      )}
      {!isLoading && (
        <div className="movieDetail">
          <div className="movieDetail--description">
            <img src={movie.Poster} alt="film image" width="100" />
            <div className="movieDetail--detail">
              <p className="movie--title">{movie.Title}</p>
              <p className="movie--gray">{movie.Year} </p>
              <p className="movie--gray">{movie.Type}</p>
              <p className="movie--gray">IMDB:{movie.imdbRating}⭐</p>
              <p className="movie--gray">{movie.Language}</p>
            </div>
          </div>
          <div className="movieDetail--explainment">
            <div className="starRating--container">
              {selectedMovie?.userRating ? (
                <p style={{ color: "#fff", fontSize: "1.5rem" }}>
                  You have already rated {selectedMovie?.userRating} point.
                </p>
              ) : (
                <StarRating
                  maxRating={10}
                  size={24}
                  color="#fff"
                  onSetRating={setUserRating}
                />
              )}
            </div>
            <p className="movieDetail--explainment--text">{movie.Plot}</p>
          </div>
          <div className="movieDetail--addToList">
            <button
              className="movieDetail--addBtn"
              onClick={() => addMovieToWatchedMovie(movie)}
            >
              {isItemInTheWatchedMovie ? "Remove From List" : "+Add To List"}
            </button>
          </div>
          <button className="back" onClick={onCloseMovieDetail}>
            &larr;
          </button>
        </div>
      )}
    </>
  );
};

export default MovieDetail;
