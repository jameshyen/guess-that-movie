const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');

const db = require('../database');
const api_key = require('../config');
const auth = require('./auth');

const app = express();

app.use(session({
  secret: 'From delusion, O Suyodhana, thou regardest me to be alone,',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', auth.login.GET);
app.post('/login', auth.login.POST);
app.get('/signup', auth.signup.GET);
app.post('/signup', auth.signup.POST);
app.post('/logout', auth.logout.POST);

app.use(function (req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
});

app.get('/movie', function (req, res) {
  let movieId = 0;
  axios.get('https://api.themoviedb.org/3/movie/latest', {
    params: {
      api_key: api_key,
    }
  }).then(function ({ data }) {
    movieId = Math.floor(Math.random() * (data.id + 1));
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: api_key,
        language: 'en-US',
      }
    });
  }).then(function ({ data }) {
    res.status(200).end(JSON.stringify(data));
  }).catch(function (err) {
    res.status(500).end();
  })
});

app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
