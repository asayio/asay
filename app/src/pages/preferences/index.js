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
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + window.sessionStorage.authToken
      }
    });
    const categoryPreferences = await getCategoryPreferences.json();
    categoryPreferences.sort(function(a, b) {
      return a.title.localeCompare(b.title)
    })
    this.setState({categoryPreferences});
    this.workload(categoryPreferences);
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
    return(
      <div>
        <h1 className="tc">Dine præferencer</h1>
        <div className="mw8 center bg-white pa4 ba b--black-10 br1 shadow-6">
          <div className="tc mb4">
            <p>Nedenfor kan du vælge, hvilke emner du vil følge med i.</p>
            <p>Med dine nuværende præferencer, skal du i gennemsnit tage stilling til ca. <b>{this.state.workload}</b> forslag om året. Det svarer til <b>{Math.round(this.state.workload / 52, 0) }</b> om ugen.</p>
          </div>
          <div className="row">
            {this.state.categoryPreferences.map((category, index) =>
              <div key={category.id} className="col12 col6-ns pv3 pr3">
                {category.preference ? <input type="checkbox" onClick={() => this.updatePreference(index)} checked className="ml1"/> : <input type="checkbox" onClick={() => this.updatePreference(index)} className="ml1"/>}
                <h3 className="mv2"><FeatherIcon name={category.feathericon} className="mr2"/>{category.title}</h3>
                <p className="black-70 mt0">{category.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Preferences;
