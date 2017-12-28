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

  async updatingEmailPreference(preference) {
    const oldUser = this.props.user;
    const newUser = Object.assign(oldUser, { emailnotification: preference });
    this.updatingUser(newUser);
    const response = await fetch('/api/user/emailnotification', {
      method: 'POST',
      body: JSON.stringify({ emailnotification: newUser.emailnotification }),
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
        <div>
          <h3>E-mail notifikationer </h3>
          <p>Vi sender dig en ugentlig opdatering med nye forslag relevante for dig.</p>
        </div>
        <div>
          <div>
            <a
              onClick={() => this.updatingEmailPreference('never')}
              className={this.props.user.emailnotification === 'never' ? '' : ''}>
              Aldrig
            </a>
            <a
              onClick={() => this.updatingEmailPreference('weekly')}
              className={this.props.user.emailnotification === 'weekly' ? '' : ''}>
              Ugentlig
            </a>
            <a
              onClick={() => this.updatingEmailPreference('monthly')}
              className={this.props.user.emailnotification === 'monthly' ? '' : ''}>
              Månedlig
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsList;
