import React, { Component } from 'react';

export default class OpenDataErrorHandler extends Component {
  render () {
    return (
      <div className="mw8 center tc">
        <h3 className="f3 mv4">Hov!</h3>
        <p>Noget gik galt i folketingets EDB kælder :(</p>
        <p>Prøv at genindlæse siden.</p>
        <a onClick={function() {window.location.reload()}} className="pointer dib white bg-dark-blue hover-bg-blue mv3 pv2 ph3 ba b--black-10 br1 shadow-6">Genindlæs siden</a>
      </div>
    )
  }
}
