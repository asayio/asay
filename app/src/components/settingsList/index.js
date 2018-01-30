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

  async updatingEmailPreference({ type, value }) {
    const oldUser = this.props.user;
    const newUser = Object.assign(oldUser, { [type]: value });
    this.updatingUser(newUser);
    const response = await fetch('/api/user/notificationSettings', {
      method: 'POST',
      body: JSON.stringify({ value, notificationType: type }),
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
        <div className="my-12">
          <h3>Forslagsnotifikationer </h3>
          <div className="flex flex-wrap md:flex-no-wrap items-center">
            <div className="flex-auto w-full">
              <p className="md:mb-0">Vi sender dig en e-mail opdatering med nye forslag relevante for dig.</p>
            </div>
            <div className="flex-none md:pl-8">
              <button
                onClick={() => this.updatingEmailPreference({ value: 'never', type: 'emailnotification' })}
                className={
                  (this.props.user.emailnotification === 'never' ? 'bg-white shadow' : 'bg-grey-lighter') +
                  ' border border-r-0 border-grey-light rounded-l-sm no-outline px-3 py-2'
                }>
                Aldrig
              </button>
              <button
                onClick={() => this.updatingEmailPreference({ value: 'monthly', type: 'emailnotification' })}
                className={
                  (this.props.user.emailnotification === 'monthly' ? 'bg-white shadow' : 'bg-grey-lighter') +
                  ' border border-grey-light no-outline px-3 py-2'
                }>
                Månedlig
              </button>
              <button
                onClick={() => this.updatingEmailPreference({ value: 'weekly', type: 'emailnotification' })}
                className={
                  (this.props.user.emailnotification === 'weekly' ? 'bg-white shadow' : 'bg-grey-lighter') +
                  ' border border-l-0 border-grey-light rounded-r-sm no-outline px-3 py-2'
                }>
                Ugentlig
              </button>
            </div>
          </div>
        </div>
        <div className="my-12">
          <h3>Resultat notifikationer </h3>
          <div className="flex flex-wrap md:flex-no-wrap items-center">
            <div className="flex-auto w-full">
              <p>Vi sender dig en e-mail opdatering når der er nye afstemningsresultater, som er relevante for dig.</p>
            </div>
            <div className="flex-none md:pl-8">
              <button
                onClick={() =>
                  this.props.user.resultnotification !== false &&
                  this.updatingEmailPreference({ value: false, type: 'resultnotification' })
                }
                className={
                  (this.props.user.resultnotification === false ? 'bg-white shadow' : 'bg-grey-lighter') +
                  ' border border-r-0 border-grey-light rounded-l-sm no-outline px-3 py-2'
                }>
                Afmeldt
              </button>
              <button
                onClick={() =>
                  this.props.user.resultnotification !== true &&
                  this.updatingEmailPreference({ value: true, type: 'resultnotification' })
                }
                className={
                  (this.props.user.resultnotification === true ? 'bg-white shadow' : 'bg-grey-lighter') +
                  ' border border-grey-light rounded-r-sm no-outline px-3 py-2'
                }>
                Tilmeldt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsList;
