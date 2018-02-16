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
      },
    }
    this.fetch();
    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    const App = this;
    $.ajax({
      url: '/movie',
      success(movie) {
        movie = JSON.parse(movie);
        console.log(movie);
        if (!movie.poster_path) {
          App.fetch();
        } else {
          App.setState({
            movie: movie,
          });
        }
      }
    });
  }
//         <Guess movie={this.state.movie} fetch={this.fetch} />
  render() {
    return (
      <div>
        <Movie movie={this.state.movie} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
