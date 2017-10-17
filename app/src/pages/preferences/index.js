import React, { Component } from 'react';
import PreferenceList from './PreferenceList'
import update from 'immutability-helper';

class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    }
    this.updatePreference = this.updatePreference.bind(this);
  }

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
    return(
      <div>
        <h1 className="tc">Dine præferencer</h1>
        <div className="mw8 center bg-white pa4 ba b--black-10 br1 shadow-6">
          <div className="tc mb4">
            <p>Nedenfor kan du vælge, hvilke emner du vil følge med i.</p>
            <p>Med dine nuværende præferencer, skal du i gennemsnit tage stilling til ca. <b>{this.state.workload}</b> forslag om året. Det svarer til <b>{Math.round(this.state.workload / 52, 0) }</b> om ugen.</p>
          </div>
          <PreferenceList preferenceList={this.props.preferenceList}/>
        </div>
      </div>
    );
  }
}

export default Preferences;
