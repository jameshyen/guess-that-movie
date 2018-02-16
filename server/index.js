const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { API_KEY } = require('../config/themoviedb.js');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.get('/movie', function (req, res) {
  let movieId = 0;
  axios.get('https://api.themoviedb.org/3/movie/latest', {
    params: {
      api_key: API_KEY,
    }
  }).then(function ({ data }) {
    movieId = Math.floor(Math.random() * (data.id + 1));
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      }
    });
  }).then(function ({ data }) {
    res.status(200).end(JSON.stringify(data));
  }).catch(function (err) {
    throw err;
  })
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
