import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon';
import openModal from '../../widgets/openModal';
import { Bookmark } from 'react-feather';

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
      openModal('error-modal');
    }
  }

  render() {
    return (
      <div className="flex flex-wrap">
        {this.props.preferenceList.map((preference, index) => (
          <div key={preference.id} className="w-100 w-50-ns pv4 pr4 flex flex-column">
            <h3 className="mt0 mb2">
              <FeatherIcon name={preference.feathericon} className="mr2" />
              {preference.title}
            </h3>
            <p className="black-70 lh-copy mt0 flex-auto">{preference.description}</p>
            <div>
              <a
                onClick={() => this.updatingPreference(preference)}
                className={
                  (preference.preference
                    ? 'dark-blue bg-white b--dark-blue'
                    : 'white bg-dark-blue hover-bg-blue b--black-10 shadow-6') +
                  ' pointer dib pv2 ph3 mt2 ba br1 flex-none'
                }>
                <Bookmark className="mr2" />
                {preference.preference ? 'Fjern fra mine forslag' : 'Tilføj til mine forslag'}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PreferenceList;
