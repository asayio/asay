import React, { Component } from 'react';

class SettingsList extends Component {
  constructor() {
    super();
    this.updatingUser = this.updatingUser.bind(this);
  }

  async updatingUser(user) {
    this.props.updateState({ entityType: 'user', entity: user });
    const response = await fetch('/api/user/emailnotification', {
      method: 'POST',
      body: JSON.stringify({ user }),
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
    console.log(this.props.user);
    return (
      <div>
        <div>
          <h2>E-mail notifkationer </h2>
          <p>Vi sender dig en ugentlig opdateringer med forslag.</p>
        </div>
        <div>
          <a onClick={() => this.updatingUser(true)}>Til</a>
          <a>Fra</a>
        </div>
      </div>
    );
  }
}

export default SettingsList;
