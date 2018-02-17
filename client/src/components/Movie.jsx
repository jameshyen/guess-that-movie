import React from 'react';

const Movie = ({ movie, guessed }) => {
  const style = guessed ? {} : {
    filter: 'blur(5px)',
  };
  return (
    <figure className='figure'>
      <img className='figure-img img-fluid rounded' src={`http://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}></img>
      <h4 style={style}>{movie.title}</h4>
      <figcaption className='figure-caption text-center'>{movie.overview}</figcaption>
    </figure>
  );
}

export default Movie;

/*       <h4 style={style}>{movie.title}</h4>
      <p>{movie.overview}</p> */