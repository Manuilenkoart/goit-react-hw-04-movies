import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  };

  state = { value: '' };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <h1>movies</h1>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={value} onChange={this.onChange} />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
