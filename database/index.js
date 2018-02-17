const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trivia');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  score: Number,
});

module.exports.User = mongoose.model('User', userSchema);
