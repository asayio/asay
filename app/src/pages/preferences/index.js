import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon'
import * as Icon from 'react-feather'
import update from 'immutability-helper';

class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      categoryPreferences: [],
      workload: ''
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
    const workload = this.workload(categoryPreferences);
  }

  workload(categoryPreferences) {
    const array = categoryPreferences.filter(category => category.preference === true)
    var workload = 0;
    for (var i = 0; i < array.length; i++) {
      workload += array[i].workload;
    }
    this.setState({workload})
  };

  async updatingPreference (index) {
    await fetch('/api/preferences/categories',
      {
        method: 'POST',
        body: JSON.stringify({
          preference: !this.state.categoryPreferences[index].preference,
          id: this.state.categoryPreferences[index].id
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
    });
    this.workload(updatedCategoryPreferences);
    this.updatingPreference(index);
  }

  render () {
    console.log(this.state.workload);
    return(
      <div>
        Du skal i gennemsnit tage stilling til ca. <b>{this.state.workload}</b> forslag om året. Det svarer til <b>{Math.round(this.state.workload / 52, 0) }</b> om ugen i gennemsnit.
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
