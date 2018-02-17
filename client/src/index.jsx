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
        backdrop_path: 'eHUoB8NbvrvKp7KQMNgvc7yLpzM.jpg',
        title: '127 Hours',
        overview: `The true story of mountain climber Aron Ralston's remarkable adventure to save himself after a fallen boulder crashes on his arm and traps him in an isolated canyon in Utah.`,
      },
      guessed: false,
      attempt: '',
    }
    this.fetch = this.fetch.bind(this);
    this.guess = this.guess.bind(this);
    this.attempt = this.attempt.bind(this);
  }

  attempt(e) {
    this.setState({
      attempt: e.target.value,
    });
  }

  componentDidMount() {
    // this.fetch();
  }

  fetch() {
    const App = this;
    $.ajax({
      url: '/movie',
      success(movie) {
        movie = JSON.parse(movie);
        if (!movie.backdrop_path) {
          App.fetch();
        } else {
          console.log(movie.title);
          App.setState({
            movie: movie,
            guessed: false,
          });
        }
      },
      error() {
        App.fetch();
      }
    });
  }

  guess() {
    const App = this;
    if (this.state.movie.title === this.state.attempt) {
      this.setState({
        guessed: true,
      });
      $.ajax({
        url: '/score',
        method: 'POST',
      });
    }
  }

  render() {
    return (
      <div>
        <Movie movie={this.state.movie} guessed={this.state.guessed} />
        <Guess guess={this.guess} attempt={this.attempt} next={this.fetch} /><br />
        <form action="/logout" method="post">
          <button>Logout</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
