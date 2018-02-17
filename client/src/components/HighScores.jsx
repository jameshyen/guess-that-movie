import React from 'react';

import HighScoresRow from './HighScoresRow.jsx';

const HighScores = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Score</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          return <HighScoresRow key={index} user={user} />;
        })}
      </tbody>
    </table>
  );
};

export default HighScores;