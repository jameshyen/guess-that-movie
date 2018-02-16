var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios');
var { API_KEY } = require('../config/themoviedb.js');

var app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.get('/movie', function (req, res) {
  var high = 0;
  axios.get('https://api.themoviedb.org/3/movie/latest', {
    params: {
      api_key: API_KEY,
    }
  }).then(function ({ data }) {
    
  });
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
