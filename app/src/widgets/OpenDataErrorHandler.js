import React, { Component } from 'react';

export default class OpenDataErrorHandler extends Component {
  render () {
    return (
      <div>
        <h3>Hov!</h3>
        <p>Noget gik galt i folketingets EDB kælder :(</p>
        <p>Prøv at genindlæse siden</p>
        <button onClick={function() {window.location.reload()}}>Genindlæs siden</button>
      </div>
    )
  }
}
