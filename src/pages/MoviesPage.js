import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import { fetchByName } from '../service/movies-api';

export default class MoviesPages extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
  };

  state = {
    movies: null,
  };

  componentDidMount() {
    const { location } = this.props;
    const query = new URLSearchParams(location.search).get('query');

    if (!query) {
      return;
    }

    fetchByName(query).then(movies => {
      this.setState({ movies });
    });
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    const prevQuery = new URLSearchParams(prevProps.location.search).get(
      'query',
    );
    const nextQuery = new URLSearchParams(location.search).get('query');
    if (prevQuery === nextQuery) {
      return;
    }
    fetchByName(nextQuery).then(movies => {
      this.setState({ movies });
    });
  }

  setSearchQuery = searchQuery => {
    this.props.history.push({
      ...this.props.location,
      search: `query=${searchQuery}`,
    });
  };

  render() {
    const { movies } = this.state;
    const { location, match } = this.props;

    return (
      <div>
        <SearchBar onSearch={this.setSearchQuery} />

        {movies && (
          <ul>
            {movies.results.map(el => (
              <li key={el.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${el.id}`,
                    state: { from: location },
                  }}
                >
                  {el.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
