import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.acceptingCookies = this.acceptingCookies.bind(this);
  }

  componentDidMount() {
    window.localStorage.cookiesAccepted && this.setState({ cookiesAccepted: true });
  }

  acceptingCookies() {
    this.setState({ cookiesAccepted: true });
    window.localStorage.cookiesAccepted = true;
  }

  render() {
    if (this.state.cookiesAccepted) {
      return null;
    } else {
      return (
        <div className="fixed pin-x pin-b bg-white shadow-lg z-4">
          <div className="max-w-xl mx-auto center flex items-center p-3">
            <p className="flex-auto">
              Vi bruger cookies.
              <span role="img" aria-label="Cookie">
                🍪
              </span>
              <a href="https://initiativet.dk/privacy" target="_privacy" className="inline-link">
                Læs mere her
              </a>.
            </p>
            <button onClick={this.acceptingCookies} className="btn btn-secondary">
              Accepter
            </button>
          </div>
        </div>
      );
    }
  }
}

export default Home;
