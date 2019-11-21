import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchMovieByCharactes } from '../../service/movies-api';
import css from './Cast.module.css';

export default class Cast extends Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
  };

  state = {
    actors: null,
  };

  componentDidMount() {
    this.fetchCharactes();
  }

  fetchCharactes = () => {
    const { movieId } = this.props.match.params;

    fetchMovieByCharactes(movieId).then(actors => {
      this.setState({ actors });
    });
  };

  render() {
    const { actors } = this.state;

    return (
      <ul className={css.actorList}>
        {actors &&
          actors.cast.map(el => (
            <li key={el.id}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${el.profile_path}`}
                alt="img"
                className={css.actorListImg}
              />

              <p> {el.name}</p>
            </li>
          ))}
      </ul>
    );
  }
}
