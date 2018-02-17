const bcrypt = require('bcrypt');
const path = require('path');

const db = require('../../database');

module.exports.login = {
  GET(req, res) {
    res.status(200).sendFile(path.join(__dirname, '/../../client/auth/login.html'));
  },
  POST(req, res) {
    db.User.findOne({ username: req.body.username }, function (err, user) {
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
        });
      } else {
        res.status(400).end('No such user found in our database!'); // lol
      }
    });
  },
};

module.exports.signup = {
  GET(req, res) {
    res.status(200).sendFile(path.join(__dirname, '/../../client/auth/signup.html'));
  },
  POST(req, res) {
    db.User.find({ username: req.body.username }, function (err, user) {
      if (user.length !== 0) {
        res.status(400).end('Username already taken!');
      } else {
        bcrypt.hash(req.body.password, 10, function (err, hash) {
          (new db.User({
            username: req.body.username,
            password: hash,
            score: 0,
          })).save().then(function (user) { // shadowing...
            req.session.regenerate(function () {
              req.session.user = user.username;
              res.status(201).redirect('/');
            });
          });
        });
      }
    });
  },
};

module.exports.logout = {
  POST(req, res) {
    req.session.destroy(function () {
      res.status(200).redirect('/login');
    });
  },
};
