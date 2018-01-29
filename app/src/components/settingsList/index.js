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
      <div className="my-12">
        <h3>E-mail notifikationer </h3>
        <div className="flex flex-wrap md:flex-no-wrap items-center">
          <div className="flex-auto w-full">
            <p className="md:mb-0">Vi sender dig en ugentlig opdatering med nye forslag relevante for dig.</p>
          </div>
          <div className="flex-none md:pl-8">
            <button
              onClick={() => this.updatingEmailPreference({ value: 'never', type: 'emailnotification' })}
              className={
                (this.props.user.emailnotification === 'never' ? 'bg-white shadow' : 'bg-grey-lightest') +
                ' border border-r-0 border-grey-lighter rounded-l-sm no-outline px-3 py-2'
              }>
              Aldrig
            </button>
            <button
              onClick={() => this.updatingEmailPreference({ value: 'weekly', type: 'emailnotification' })}
              className={
                (this.props.user.emailnotification === 'weekly' ? 'bg-white shadow' : 'bg-grey-lightest') +
                ' border border-grey-lighter no-outline px-3 py-2'
              }>
              Ugentlig
            </button>
            <button
              onClick={() => this.updatingEmailPreference({ value: 'montly', type: 'emailnotification' })}
              className={
                (this.props.user.emailnotification === 'monthly' ? 'bg-white shadow' : 'bg-grey-lightest') +
                ' border border-l-0 border-grey-lighter rounded-r-sm no-outline px-3 py-2'
              }>
              Månedlig
            </button>
            <div className="flex flex-column flex-row-ns items-center-ns mv4 mv5-ns">
              <div className="flex-auto">
                <h3 className="mw6 mv1">Resultat E-mail notifikationer </h3>
                <p className="black-70 lh-copy mw6 mv1">
                  Vi sender dig en opdatering når der er nye afstemnings resultater relevante for dig.
                </p>
              </div>
              <div className="flex-none pv2 pl4-ns">
                <div className="no-select">
                  <a
                    onClick={() =>
                      this.props.user.resultnotification !== false &&
                      this.updatingEmailPreference({ value: false, type: 'resultnotification' })
                    }
                    className={
                      this.props.user.resultnotification === false
                        ? 'dib white bg-dark-blue ba b--black-10 br1 br--left pv2 ph3'
                        : 'dib black-50 bg-near-white ba b--black-10 br1 br--left pv2 ph3'
                    }>
                    Afmeldt
                  </a>
                  <a
                    onClick={() =>
                      this.props.user.resultnotification !== true &&
                      this.updatingEmailPreference({ value: true, type: 'resultnotification' })
                    }
                    className={
                      this.props.user.resultnotification === true
                        ? 'dib white bg-dark-blue ba b--black-10 br1 br--right br--left pv2 ph3'
                        : 'dib black-50 bg-near-white ba b--black-10 br1 br--right br--left pv2 ph3'
                    }>
                    Tilmeldt
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsList;
