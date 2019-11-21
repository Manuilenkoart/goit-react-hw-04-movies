import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../routes';
import { fetchPopularMovies } from '../service/movies-api';

class HomePage extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    this.fetchTrendingMovies();
  }

  mapper = items => {
    // eslint-disable-next-line camelcase
    return items.map(({ original_title: original_name, ...props }) => ({
      original_name,
      ...props,
    }));
  };

  fetchTrendingMovies = () => {
    try {
      fetchPopularMovies().then(movie => {
        this.setState(state => ({
          movies: [...state.movies, ...this.mapper(movie)],
        }));
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  render() {
    const { movies } = this.state;

    return (
      <div>
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${routes.MOVIES}/${movie.id}`}>
                {movie.original_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default HomePage;
