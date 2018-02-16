const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const bcrypt = require('bcrypt');
const path = require('path');

const { User, Movie } = require('../database'); // Database models...
const { API_KEY } = require('../config'); // API key for TheMovieDB...

const app = express();

app.use(session({
  secret: 'From delusion, O Suyodhana, thou regardest me to be alone,',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '/../client/auth/login.html'));
});

app.post('/login', function (req, res) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, match) {
        if (match) {
          req.session.regenerate(function () {
            req.session.user = req.body.username;
            res.status(201).redirect('/');
          });
        } else {
          res.status(400).end('Incorrect combination of username and password!');
        }
      })
    } else {
      res.status(400).end('No such user found in our database!'); // lol
    }
  });
});

app.get('/signup', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '/../client/auth/signup.html'));
});

app.post('/signup', function (req, res) {
  User.find({ username: req.body.username }, function (err, user) {
    if (user.length !== 0) {
      res.status(400).end('Username already taken!');
    } else {
      bcrypt.hash(req.body.password, 10, function (err, hash) {
        (new User({
          username: req.body.username,
          password: hash,
        })).save().then(function (user) {
          req.session.regenerate(function () {
            req.session.user = user.username;
            res.status(201).redirect('/');
          });
        });
      });
    }
  });
});

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
    res.status(500).end();
  })
});

app.use(express.static(__dirname + '/../client/dist'));

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
