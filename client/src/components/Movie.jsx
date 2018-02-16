import React from 'react';

const Movie = ({ movie }) => (
  <div>
    <img src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
  </div>
);

export default Movie;