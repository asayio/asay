import React, { Component } from 'react';
import FeatherIcon from '../../components/featherIcon';

class PreferenceList extends Component {
  constructor() {
    super();
    this.updatingPreference = this.updatingPreference.bind(this);
  }

  async updatingPreference(preference) {
    this.props.updateState({ entityType: 'preferenceList', entity: preference });
    const response = await fetch('/api/preference', {
      method: 'POST',
      body: JSON.stringify({ preference }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
    if (!response.ok) {
      this.props.updateState({ entityType: 'error', entity: response.status });
    }
  }

  render() {
    return (
      <div>
        {this.props.preferenceList.map((preference, index) => (
          <div key={preference.id}>
            <div>
              <h3>
                <FeatherIcon name={preference.feathericon} />
                {preference.title}
              </h3>
              <p>{preference.description}</p>
            </div>
            <div>
              <div onClick={() => this.updatingPreference(preference)}>
                <a className={preference.preference ? '' : ''}>Følg</a>
                <a className={preference.preference ? '' : ''}>Ikke</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PreferenceList;
