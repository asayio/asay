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
      this.props.updateState({ entityType: 'modal', entity: response.status });
    }
  }

  render() {
    return (
      <div>
        {this.props.preferenceList.map((preference, index) => (
          <div key={preference.id} className="my-12">
            <h3>
              <FeatherIcon name={preference.feathericon} className="mr-2" />
              {preference.title}
            </h3>
            <div className="flex flex-wrap md:flex-no-wrap items-center">
              <div className="flex-auto w-full">
                <p className="md:mb-0">{preference.description}</p>
              </div>
              <div className="flex-none md:pl-8">
                <div onClick={() => this.updatingPreference(preference)}>
                  <button
                    className={
                      (preference.preference ? 'bg-white shadow-sm' : 'text-grey-dark bg-grey-lighter') +
                      ' border border-grey-light rounded-l-sm no-outline px-3 py-2'
                    }>
                    Følg
                  </button>
                  <button
                    className={
                      (preference.preference ? 'text-grey-dark bg-grey-lighter' : 'bg-white shadow-sm') +
                      ' border border-l-0 border-grey-light rounded-r-sm no-outline px-3 py-2'
                    }>
                    Ikke
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PreferenceList;
