import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Movie from './components/Movie.jsx';
import Guess from './components/Guess.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        poster_path: 'c6Nu7UjhGCQtV16WXabqOQfikK6.jpg',
        title: '127 Hours',
      },
      guessed: false,
      attempt: '',
    }
    this.fetch();
    // this.fetch = this.fetch.bind(this);
    this.guess = this.guess.bind(this);
    this.attempt = this.attempt.bind(this);
  }

  attempt(e) {
    this.setState({
      attempt: e.target.value,
    });
  }

  guess() {
    if (this.state.movie.title === this.state.attempt) {
      this.setState({
        guessed: true,
      });
    }
  }

  fetch() {
    const App = this;
    $.ajax({
      url: '/movie',
      success(movie) {
        movie = JSON.parse(movie);
        if (!movie.poster_path) {
          App.fetch();
        } else {
          console.log(movie.title);
          App.setState({
            movie: movie,
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Movie movie={this.state.movie} guessed={this.state.guessed} />
        <Guess movie={this.state.movie} guess={this.guess} attempt={this.attempt} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
