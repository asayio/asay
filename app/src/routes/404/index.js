import React, { Component } from 'react';

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
            }
            className="btn btn-white mt-4 mb-8">
            Gå til forsiden
          </button>
          <p className="mx-auto">
            Burde der være en side her?{' '}
            <a href="mailto:dinevenner@initiativet.dk" className="inline-link">
              Send os en mail
            </a>.
          </p>
        </div>
      </div>
    );
  }
}

export default Lost;
