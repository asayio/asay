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
      <div className="my-12">
        <h3>E-mail notifikationer </h3>
        <div className="flex flex-wrap md:flex-no-wrap items-center">
          <div className="flex-auto w-full">
            <p className="md:mb-0">Vi sender dig en ugentlig opdatering med nye forslag relevante for dig.</p>
          </div>
          <div className="flex-none md:pl-8">
            <button
              onClick={() => this.updatingEmailPreference('never')}
              className={
                (this.props.user.emailnotification === 'never' ? 'bg-white shadow' : 'bg-grey-lightest') +
                ' border border-r-0 border-grey-lighter rounded-l-sm no-outline px-3 py-2'
              }>
              Aldrig
            </button>
            <button
              onClick={() => this.updatingEmailPreference('weekly')}
              className={
                (this.props.user.emailnotification === 'weekly' ? 'bg-white shadow' : 'bg-grey-lightest') +
                ' border border-grey-lighter no-outline px-3 py-2'
              }>
              Ugentlig
            </button>
            <button
              onClick={() => this.updatingEmailPreference('monthly')}
              className={
                (this.props.user.emailnotification === 'monthly' ? 'bg-white shadow' : 'bg-grey-lightest') +
                ' border border-l-0 border-grey-lighter rounded-r-sm no-outline px-3 py-2'
              }>
              Månedlig
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsList;
