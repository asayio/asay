import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon'
import {Radio} from 'react-feather'

class PreferenceList extends Component {
  constructor() {
    super();
    this.updatingPreference = this.updatingPreference.bind(this);
  }

  async updatingPreference (preference) {
    const response = await fetch('/api/preference',
      {
        method: 'POST',
        body: JSON.stringify({preference}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }
    )
    if (response.ok) {
      this.props.updateState({entityType: 'preferenceList', entity: preference})
    }
  };

  render () {
    return(
      <div className="row">
        {this.props.preferenceList.map((preference, index) =>
          <div key={preference.id} className="col12 col6-ns pv3 pr3">
            <h3 className="mv2"><FeatherIcon name={preference.feathericon} className="mr2"/>{preference.title}</h3>
            <p className="black-70 lh-copy mt0">{preference.description}</p>
            <a onClick={() => this.updatingPreference(preference)} className={preference.preference ? "pointer db dark-blue pv2 mv3 ba b--dark-blue br1" : "pointer db white bg-dark-blue hover-bg-blue pv2 mv3 ba b--black-10 br1 shadow-6" }>
              <Radio className="mr2"/>
              {preference.preference ? "Fjern fra mine forslag" : "Tilføj til mine forslag" }
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default PreferenceList;
