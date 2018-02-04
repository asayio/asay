import React, { Component } from 'react';
import Login from '../loginBtn';

class landingPage extends Component {
  componentDidMount() {
    window.localStorage.authToken &&
      this.props.history.replace({
        pathname: './proposals'
      });
  }
  render() {
    return (
      <div className="flex-auto flex flex-col items-center justify-center text-center px-2 pb-10">
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
