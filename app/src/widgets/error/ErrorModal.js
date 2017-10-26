import React, { Component } from 'react';

class ErrorModal extends Component {
  closeModal(event) {
    const modal = document.getElementById('error-modal');
    modal.style.display = "none";
  }
  
  render () {
    return(
      <div id="error-modal" className="modal dn items-center justify-center overflow-auto w-100 h-100 pa2 z-9999">
        <div className="pa3 pv4-ns ph5-ns tc bg-white ba b--black-10 br1">
          <h2 className="f4">Der er sket en fejl</h2>
          <p>Det er ikke dig, det er os. Prøv igen, og hvis det stadig ikke virker så <a href="mailto:dinvenner@initiativet.net" target="_mailto" rel="noopener noreferrer" className="dark-blue hover-blue">send os en mail.</a></p>
          <div>
            <a onClick={this.closeModal} className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">OK</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorModal;
