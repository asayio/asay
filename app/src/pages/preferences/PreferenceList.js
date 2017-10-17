import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon'
// import update from 'immutability-helper';

class PreferenceList extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    }
    // this.updatePreference = this.updatePreference.bind(this);
  }

  // async updatingPreference (index) {
  //   await fetch('/api/preferences/categories',
  //     {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         preference: !this.state.categoryPreferences[index].preference,
  //         id: this.state.categoryPreferences[index].id
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer ' + window.sessionStorage.authToken
  //       }
  //     }
  //   )
  // };
  //
  // updatePreference (index) {
  //   const newPreference = !this.state.categoryPreferences[index].preference
  //   const updatedCategoryPreferences = update(this.state.categoryPreferences, {[index]: {preference: {$set: newPreference}}});
  //   this.setState({
  //     categoryPreferences: updatedCategoryPreferences
  //   });
  //   this.workload(updatedCategoryPreferences);
  //   this.updatingPreference(index);
  // }

  render () {
    return(
      <div className="row">
        {this.props.preferenceList.map((category, index) =>
          <div key={category.id} className="col12 col6-ns pv3 pr3">
            {category.preference ? <input type="checkbox" onChange={() => this.updatePreference(index)} checked className="ml1"/> : <input type="checkbox" onChange={() => this.updatePreference(index)} className="ml1"/>}
            <h3 className="mv2"><FeatherIcon name={category.feathericon} className="mr2"/>{category.title}</h3>
            <p className="black-70 mt0">{category.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default PreferenceList;
