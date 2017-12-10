import React, { Component } from 'react';

class SettingsList extends Component {
  constructor() {
    super();
    this.updatingUser = this.updatingUser.bind(this);
    this.updatingEmailPreference = this.updatingEmailPreference.bind(this);
  }

  updatingUser(user) {
    this.props.updateState({ entityType: 'user', entity: user });
  }

  async updatingEmailPreference() {
    const newUser = Object.assign(this.props.user, { emailnotification: !this.props.user.emailnotification });
    this.updatingUser(newUser);
    const response = await fetch('/api/user/emailnotification', {
      method: 'POST',
      body: JSON.stringify({ emailnotification: newUser.emailnotification }),
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
        <div>
          <h2>E-mail notifkationer </h2>
          <p>Vi sender dig en ugentlig opdatering med nye forslag relevante for dig.</p>
        </div>
        <div onClick={() => this.updatingEmailPreference()}>
          <a>Til</a>
          <a>Fra</a>
          <p>Du har valg {this.props.emailnotification ? 'Til' : 'Fra'}</p>
        </div>
      </div>
    );
  }
}

export default SettingsList;
