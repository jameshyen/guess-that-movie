import React from 'react';

import HighScoresRow from './HighScoresRow.jsx';

const HighScores = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>User</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return <HighScoresRow key={index} user={user} index={index} />;
        })}
      </tbody>
    </table>
  );
};

export default HighScores;