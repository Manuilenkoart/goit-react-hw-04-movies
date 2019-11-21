/* eslint-disable no-console */
const key = '47cdc3ef34126643344494d8cbed4236';

const fetchPopularMovies = () => {
  const url = 'https://api.themoviedb.org/3/trending';
  const mediaType = 'all';
  const timeWindow = 'day';

  return fetch(`${url}/${mediaType}/${timeWindow}?api_key=${key}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('error');
    })
    .then(data => data.results)
    .catch(err => console.log(err));
};
const fetchMovieById = movieId => {
  const url = 'https://api.themoviedb.org/3/movie';

  return fetch(`${url}/${movieId}?api_key=${key}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('error');
    })
    .then(data => data)
    .catch(err => {
      console.log(err);
    });
};

const fetchMovieByCharactes = movieId => {
  const url = 'https://api.themoviedb.org/3/movie';

  return fetch(`${url}/${movieId}/credits?api_key=${key}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('error');
    })
    .then(data => data)
    .catch(err => console.log(err));
};

const fetchReviews = movieId => {
  const url = 'https://api.themoviedb.org/3/movie';
  return fetch(`${url}/${movieId}/reviews?api_key=${key}&language=en-US&page=1`)
    .then(res => res.json())
    .then(data => data)
    .catch(error => console.log(error));
};
const fetchByName = movieName => {
  const url = 'https://api.themoviedb.org/3/search/movie';

  return fetch(
    `${url}?api_key=${key}&language=en-US&query=${movieName}&page=1&include_adult=false`,
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('error');
    })
    .then(data => data)
    .catch(error => console.log(error));
};
export {
  fetchPopularMovies,
  fetchMovieById,
  fetchMovieByCharactes,
  fetchReviews,
  fetchByName,
};
