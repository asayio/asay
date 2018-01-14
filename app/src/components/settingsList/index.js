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

  async updatingEmailPreference({type, value}) {
    const oldUser = this.props.user;
    const newUser = Object.assign(oldUser, { [type]: value });
    this.updatingUser(newUser);
    const response = await fetch('/api/user/notificationSettings', {
      method: 'POST',
      body: JSON.stringify({value, notificationType: type}),
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
        <div className='user-notification-setting'>
          <div className="flex flex-column flex-row-ns items-center-ns mv4 mv5-ns">
            <div className="flex-auto">
              <h3 className="mw6 mv1">Periodiske E-mail notifikationer </h3>
              <p className="black-70 lh-copy mw6 mv1">
                Vi sender dig en ugentlig opdatering med nye forslag relevante for dig.
              </p>
            </div>
            <div className="flex-none pv2 pl4-ns">
              <div className="no-select">
                <a
                  onClick={() => this.props.user.emailnotification !== 'never' && this.updatingEmailPreference({value: 'never', type: 'emailnotification'})}
                  className={
                    this.props.user.emailnotification === 'never'
                      ? 'dib white bg-dark-blue ba b--black-10 br1 br--left pv2 ph3'
                      : 'dib black-50 bg-near-white ba b--black-10 br1 br--left pv2 ph3'
                  }>
                  Aldrig
                </a>
                <a
                  onClick={() => this.props.user.emailnotification !== 'weekly' && this.updatingEmailPreference({value: 'weekly', type: 'emailnotification'})}
                  className={
                    this.props.user.emailnotification === 'weekly'
                      ? 'dib white bg-dark-blue ba b--black-10 br1 br--right br--left pv2 ph3'
                      : 'dib black-50 bg-near-white ba b--black-10 br1 br--right br--left pv2 ph3'
                  }>
                  Ugentlig
                </a>
                <a
                  onClick={() => this.props.user.emailnotification !== 'monthly' && this.updatingEmailPreference({value: 'monthly', type: 'emailnotification'})}
                  className={
                    this.props.user.emailnotification === 'monthly'
                      ? 'dib white bg-dark-blue ba b--black-10 br1 br--right pv2 ph3'
                      : 'dib black-50 bg-near-white ba b--black-10 br1 br--right pv2 ph3'
                  }>
                  Månedlig
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='user-notification-setting'>
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
                  onClick={() => this.props.user.resultnotification !== false && this.updatingEmailPreference({value: false, type: 'resultnotification'})}
                  className={
                    this.props.user.resultnotification === false
                      ? 'dib white bg-dark-blue ba b--black-10 br1 br--left pv2 ph3'
                      : 'dib black-50 bg-near-white ba b--black-10 br1 br--left pv2 ph3'
                  }>
                  Afmeldt
                </a>
                <a
                  onClick={() => this.props.user.resultnotification !== true && this.updatingEmailPreference({value: true, type: 'resultnotification'})}
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
    );
  }
}

export default SettingsList;
