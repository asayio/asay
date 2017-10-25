import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon'

class PreferenceList extends Component {
  constructor() {
    super();
    this.updatingPreference = this.updatingPreference.bind(this);
  }

  async updatingPreference (preference) {
    this.props.updateState({entityType: 'preferenceList', entity: preference})
    await fetch('/api/preference',
      {
        method: 'POST',
        body: JSON.stringify({preference}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }
    )
  };

  render () {
    return(
      <div className="row">
        {this.props.preferenceList.map((preference, index) =>
          <div key={preference.id} className="col12 col6-ns pv3 pr3">
            <input type="checkbox" onChange={() => this.updatingPreference(preference)} checked={preference.preference} className="ml1"/>
            <h3 className="mv2"><FeatherIcon name={preference.feathericon} className="mr2"/>{preference.title}</h3>
            <p className="black-70 lh-copy mt0">{preference.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default PreferenceList;
