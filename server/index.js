const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');

const key = require('../config');
const auth = require('./auth');
const model = require('./model');

const app = express();

app.use(session({
  secret: 'From delusion, O Suyodhana, thou regardest me to be alone,',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('tiny'));

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
  const page = Math.floor(Math.random() * 1001);
  axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key: key,
      with_original_language: 'en',
      include_adult: false,
      page,
    },
  }).then(function ({ data: { results } }) {
    const movie = Math.floor(Math.random() * results.length);
    // console.log(results[movie]);
    res.status(200).end(JSON.stringify(results[movie]));
  }).catch(function (err) {
    res.status(500).end();
  });
});

app.post('/score', model.score.POST);
app.get('/score', model.score.GET);
app.get('/scores', model.scores.GET);

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(3000, function () {
  console.log('listening on port 3000!');
});
