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
    const notificationBoxType =
      (urlParams.emailverification === 'success' || urlParams.emailverification === 'missing') &&
      urlParams.emailverification;
    this.setState({ notificationBox: notificationBoxType });
  }
  closeNotificationBox() {
    this.setState({ notificationBox: false });
  }
  render() {
    const notificationBoxTitle = this.state.notificationBox === 'success' ? 'Succes!' : 'Bekræft din e-mail';
    return (
      <div className="relative flex-auto flex flex-col items-center justify-center text-center px-2 pb-10">
        {this.state.notificationBox && (
          <NotificationBox
            className="absolute pin-x pin-t"
            title={notificationBoxTitle}
            closeNotificationBox={this.closeNotificationBox}>
            <p className="mb-1">
              {this.state.notificationBox === 'success'
                ? 'Din e-mail er blevet verificeret. Du kan nu logge ind.'
                : 'Vi har sendt dig en mail. Klik på linket og bekræft din e-mail for at komme igang.'}
            </p>
          </NotificationBox>
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
