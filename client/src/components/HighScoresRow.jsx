import React from 'react';

const HighScoresRow = ({ user, index }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{user.username}</td>
      <td>{user.score}</td>
    </tr>
  );
};

export default HighScoresRow;