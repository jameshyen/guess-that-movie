import React from 'react';

const HighScoresRow = ({ user, index }) => {
  return (
    <tr>
      <td>{user.score}</td>
      <td>{user.username}</td>
    </tr>
  );
};

export default HighScoresRow;