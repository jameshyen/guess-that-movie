import React from 'react';

const Guess = ({ guess, attempt, next, score, input }) => {
  const enter = (e) => {
    if (e.key === 'Enter') {
      guess();
    }
  };
  return (
    <div>
      <input onKeyPress={enter} value={input} onChange={attempt} />&nbsp;
      <button onClick={guess}>Submit</button>&nbsp;
      <button onClick={next}>Next</button>&nbsp;
      Score: {score}
    </div>
  );
};

export default Guess;