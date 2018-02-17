const db = require('../../database');

module.exports = {
  score: {
    GET(req, res) {
      db.User.findOne({ username: req.session.user }, function (err, user) {
        res.status(201).end(JSON.stringify({ score: user.score }));
      });
    },
    POST(req, res) {
      db.User.findOneAndUpdate({ username: req.session.user }, { $inc: { score: 1 } }, function (err) {
        res.status(201).end();
      });
    },
  },

  scores: {
    GET(req, res) {
      db.User.find({}).sort({ score: -1 }).limit(10).exec().then(function (users) {
        res.status(200).end(JSON.stringify(users));
      });
    },
  },
};
