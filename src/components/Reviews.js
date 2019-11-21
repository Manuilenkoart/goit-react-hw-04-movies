import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchReviews } from '../service/movies-api';

export default class Reviews extends Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
  };

  state = {
    reviews: [],
  };

  componentDidMount() {
    this.fetchUserReviews();
  }

  fetchUserReviews = () => {
    const { movieId } = this.props.match.params;
    fetchReviews(movieId).then(review => {
      this.setState({ reviews: review });
    });
  };

  render() {
    const { reviews } = this.state;

    return (
      <div>
        {reviews.total_results ? (
          <ul>
            {reviews.results.map(el => (
              <li key={el.id}>
                <h3>Author: {el.author}</h3>
                <p>{el.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>We don&apos;t have any reviews for this film</p>
        )}
      </div>
    );
  }
}
