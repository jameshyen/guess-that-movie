import React from 'react';

const Movie = ({ movie }) => {
  return (
    <div>
      <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
      <h4>{movie.title}</h4>
    </div>
  );
}

export default Movie;