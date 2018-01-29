import React, { Component } from 'react';
import { Home } from 'react-feather';

class Lost extends Component {
  render() {
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto text-center">
          <h1>Ups! Der er problemer</h1>
          <p className="mx-auto">Der er ikke dig, det er os. Vi mangler at lave en side til den URL, du har valgt.</p>
          <button
            onClick={() =>
              this.props.history.replace({
                pathname: '/'
              })
            }>
            <Home />Gå til forsiden
          </button>
        </div>
      </div>
    );
  }
}

export default Lost;
