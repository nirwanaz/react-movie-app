import React from "react";

const MovieList = (props) => {
  const FavoriteComponent = props.favoriteComponent

  return (
    <div className="image-container d-flex justify-content-start">
      {props.movies.map((movie, index) => (
        <div className="m-3 img-wrap" key={index.toString()}>
          <img src={movie.Poster} alt="movie"></img>
          <div
            onClick={() => props.handleFavoritesClick(movie)} 
            className="overlay d-flex align-items-center justify-content-center">
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList