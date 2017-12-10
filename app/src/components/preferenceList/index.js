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
        Authorization: 'Bearer ' + window.sessionStorage.authToken
      }
    });
    if (!response.ok) {
      this.props.updateState({ entityType: 'error', entity: true });
    }
  }

  render() {
    return (
      <div>
        {this.props.preferenceList.map((preference, index) => (
          <div key={preference.id} className="flex flex-column flex-row-ns items-center-ns mv4 mv5-ns">
            <div className="flex-auto">
              <h3 className="mw6 mv1">
                <FeatherIcon name={preference.feathericon} className="mr2" />
                {preference.title}
              </h3>
              <p className="black-70 lh-copy mw6 mv1">{preference.description}</p>
            </div>
            <div className="flex-none pv2 pl4-ns">
              <div className="no-select" onClick={() => this.updatingPreference(preference)}>
                <a
                  className={
                    preference.preference
                      ? 'dib white bg-dark-blue ba b--black-10 br1 br--left pv2 ph3'
                      : 'dib black-50 bg-near-white ba b--black-10 br1 br--left pv2 ph3'
                  }>
                  Følg
                </a>
                <a
                  className={
                    preference.preference
                      ? 'dib black-50 bg-near-white ba b--black-10 br1 br--right pv2 ph3'
                      : 'dib white bg-dark-blue ba b--black-10 br1 br--right pv2 ph3'
                  }>
                  Ikke
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PreferenceList;
