import React from 'react';

const Guess = ({ guess, attempt, next }) => {
  return (
    <div>
      <input onChange={attempt} />&nbsp;
      <button onClick={guess}>Submit</button>&nbsp;
      <button onClick={next}>Next</button>
    </div>
  );
}

export default Guess;