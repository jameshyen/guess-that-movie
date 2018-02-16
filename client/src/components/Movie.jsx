import React from 'react';

const Movie = ({ movie, guessed }) => {
  const style = guessed ? {} : {
    filter: 'blur(5px)',
  };
  return (
    <div>
      <img style={style} src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}></img>
      <h4 style={style}>{movie.title}</h4>
    </div>
  );
}

export default Movie;