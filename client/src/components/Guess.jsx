import React from 'react';

const Guess = ({ guess, attempt, next, score }) => {
  return (
    <div>
      <input className='form-control' onChange={attempt} />&nbsp;
      <button type='button' className='btn btn-outline-primary btn-sm' onClick={guess}>Submit</button>&nbsp;
      <button type='button' className='btn btn-outline-primary btn-sm' onClick={next}>Next</button>&nbsp;
      Score: {score}
    </div>
  );
}

export default Guess;