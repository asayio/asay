import React, { Component } from 'react';
import Login from '../loginBtn';
import NotificationBox from '../notificationBox';
import queryString from 'query-string';

class landingPage extends Component {
  constructor() {
    super();
    this.state = {};
    this.closeNotificationBox = this.closeNotificationBox.bind(this);
  }
  componentDidMount() {
    window.localStorage.authToken &&
      this.props.history.replace({
        pathname: './proposals'
      });
    const urlParams = queryString.parse(window.location.search);
    const showNotificationBox = urlParams.emailverification === 'success';
    this.setState({ showNotificationBox: showNotificationBox });
    if (showNotificationBox) {
      const email = urlParams.email;
      fetch(`/api/user/emailverification/${email}`, { method: 'POST' });
    }
  }
  closeNotificationBox() {
    this.setState({ showNotificationBox: false });
  }
  render() {
    return (
      <div className="relative flex-auto flex flex-col items-center justify-center text-center px-2 pb-10">
        {this.state.showNotificationBox && (
          <NotificationBox className="absolute pin-x pin-t" closeNotificationBox={this.closeNotificationBox} />
        )}
        <h1 className="mb-10">
          Medbestemmelse. Simpelt.
          <span className="block text-lg font-normal text-grey-darker mt-2">
            Politik gjort tilgængeligt, forståeligt og attraktivt at deltage i. Så alle kan være med.
          </span>
        </h1>
        <div>
          <Login icon="LogIn" iconClass="mr-2" type="login" className="btn btn-secondary m-2" />
          <Login icon="UserPlus" iconClass="mr-2" type="signUp" className="btn btn-primary m-2" />
        </div>
      </div>
    );
  }
}

export default landingPage;
