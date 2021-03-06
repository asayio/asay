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
    this.submitSearch = this.submitSearch.bind(this);
  }

  updateSearchString(event) {
    const searchString = R.path(['target', 'value'], event);
    this.setState({ searchString: searchString });
  }

  submitSearch(evnt) {
    evnt.preventDefault();
    const submitBtn = document.getElementById('searchSubmitBtn');
    submitBtn.click();
    this.setState({ searchString: '' });
  }

  render() {
    const searchString = this.state.searchString;
    const formClass = this.props.formClass;
    const inputClass = this.props.inputClass;
    const btnClass = this.props.btnClass;
    const searchURL = searchString ? `/search?v=${this.state.searchString}` : '/search';
    return (
      <form id="searchBar" className={formClass} onSubmit={this.submitSearch}>
        <input
          className={inputClass}
          type="text"
          onChange={this.updateSearchString}
          placeholder="Søg efter forslag"
          value={searchString}
        />
        <Link id="searchSubmitBtn" className={btnClass} to={searchURL}>
          <Search />
        </Link>
      </form>
    );
  }
}

export default SearchBar;
