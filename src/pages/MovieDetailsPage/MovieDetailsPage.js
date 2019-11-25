import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchMovieById } from '../../service/movies-api';
import Cast from '../../components/Cast/Cast';
import Review from '../../components/Reviews';
import routes from '../../routes';
import css from './MovieDetailsPage.module.css';

export default class MovieDetailPage extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
  };

  state = {
    movie: null,
  };

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = () => {
    const { movieId } = this.props.match.params;
    try {
      fetchMovieById(movieId).then(movie => {
        this.setState({ movie });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  filmRealiseData = () => {
    const { movie } = this.state;
    return movie.release_date.slice(0, 4);
  };

  onGoBack = () => {
    const { history, location } = this.props;

    if (location.state && location.state.from) {
      history.push(location.state.from);
      return;
    }

    history.push('/');
  };

  render() {
    const { movie } = this.state;
    const { match } = this.props;

    return (
      <div>
        <button type="button" onClick={this.onGoBack} className={css.btn}>
          Back
        </button>
        {movie && (
          <article className={css.article}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt="img"
            />
            <div className={css.container}>
              <h3>
                {movie.title} ({this.filmRealiseData()})
              </h3>

              <p>User score: {movie.vote_average}%</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>

              <ul>
                {movie.genres.map(el => (
                  <li key={el.id}>{el.name}</li>
                ))}
              </ul>
            </div>
          </article>
        )}
        <div className={css.container}>
          <p>Additional information</p>

          <ul className={css.linkList}>
            <li>
              <Link to={`${match.url}/${routes.CAST}`} className={css.castLink}>
                Cast
              </Link>
            </li>
            <li>
              <Link
                to={`${match.url}/${routes.REVIEW}`}
                className={css.reviewLink}
              >
                Review
              </Link>
            </li>
          </ul>
          <>
            <Route path={`${match.path}/${routes.CAST}`} component={Cast} />
            <Route path={`${match.path}/${routes.REVIEW}`} component={Review} />
          </>
        </div>
      </div>
    );
  }
}
