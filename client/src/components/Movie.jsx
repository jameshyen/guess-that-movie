import React from 'react';

const Movie = ({ movie, guessed }) => {
  const style = guessed ? {} : {
    filter: 'blur(5px)',
  };
  return (
    <div>
      <img src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}></img>
      <h4 style={style}>{movie.title}</h4>
      <p>{movie.overview}</p>
    </div>
  );
};

export default Movie;