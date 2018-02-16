const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trivia');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const movieSchema = mongoose.Schema({
  id: Number, // hm...
  title: String,
  user: String,
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.Movie = mongoose.model('Movie', movieSchema);
