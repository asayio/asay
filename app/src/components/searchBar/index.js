import R from 'ramda';
import React, { Component } from 'react';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ''
    };
    this.updateSearchString = this.updateSearchString.bind(this);
  }

  updateSearchString(event) {
    const searchString = R.path(['target', 'value'], event);
    this.setState({ searchString: searchString });
  }

  render() {
    const searchString = this.state.searchString;
    const inputClass = this.props.inputClass;
    const btnClass = this.props.btnClass;
    return (
      <div>
        <input
          className={inputClass}
          type="text"
          onChange={this.updateSearchString}
          placeholder="Søg"
          value={this.state.searchString}
        />
        <Link className={btnClass} to={searchString ? `./search?v=${this.state.searchString}` : './search'}>
          <Search />
        </Link>
      </div>
    );
  }
}

export default SearchBar;
