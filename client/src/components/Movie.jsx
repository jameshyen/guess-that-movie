import React from 'react';

const Movie = ({ movie }) => {
  const style = {
    marginLeft: 'auto',
    marginRight: 'auto',
  }
  return (
    <div style={style}>
      <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
      <h4>{movie.title}</h4>
    </div>
  );
}

export default Movie;