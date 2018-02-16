import React from 'react';

const Guess = ({ movie, guess, attempt }) => {
  return (
    <div>
      <input onChange={attempt} />
      <button onClick={guess}>Submit</button>
    </div>
  );
}

export default Guess;