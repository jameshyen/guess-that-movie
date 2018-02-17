import React from 'react';

const Guess = ({ guess, attempt, next, score }) => {
  return (
    <div>
      <input onChange={attempt} />&nbsp;
      <button onClick={guess}>Submit</button>&nbsp;
      <button onClick={next}>Next</button>&nbsp;
      Score: {score}
    </div>
  );
}

export default Guess;