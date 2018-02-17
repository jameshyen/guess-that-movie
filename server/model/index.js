const db = require('../../database');

module.exports = {
  GET: function (req, res) {
    db.User.findOne({ username: req.session.user}, function (err, user) {
      res.status(201).end(JSON.stringify({ score: user.score }));
    });
  },
  POST: function (req, res) {
    db.User.findOneAndUpdate({ username: req.session.user}, { $inc: { score: 1 } }, function (err) {
      res.status(201).end();
    });
  },
};
