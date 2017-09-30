import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon'
import * as Icon from 'react-feather'
import update from 'immutability-helper';

class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      categoryPreferences: []
    }
    this.updatePreference = this.updatePreference.bind(this);
  }

  async componentDidMount() {
    const getCategoryPreferences = await fetch('/api/preferences/categories', {
      method: 'GET',
      headers: {
        authtoken: window.sessionStorage.authToken
      }
    });
    const categoryPreferences = await getCategoryPreferences.json();
    categoryPreferences.sort(function(a, b) {
      return a.title.localeCompare(b.title)
    })
    this.setState({categoryPreferences});
  }

  async updatePreference() {
    await fetch('/api/preferences/categories',
      {
        method: 'POST',
        body: JSON.stringify({
          preference: !this.state.categoryPreferences[0].preference,
          id: this.state.categoryPreferences[0].id
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }
    )
  };

  updatePreference (index) {
    const newPreference = !this.state.categoryPreferences[index].preference
    const updatedCategoryPreferences = update(this.state.categoryPreferences, {[index]: {preference: {$set: newPreference}}});
    this.setState({
      categoryPreferences: updatedCategoryPreferences
    })
  }

  render () {
    return(
      <div>
        {this.state.categoryPreferences.map((category, index) =>
          <div key={category.id} onClick={() => this.updatePreference(index)}>
            {category.preference ? <Icon.CheckSquare/> : <Icon.Square/>}
            <h3><FeatherIcon name={category.feathericon}/> {category.title}</h3>
            <p>{category.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Preferences;
