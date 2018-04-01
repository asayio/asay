import React, { Component } from 'react';

class ConfirmModal extends Component {
  render() {
    return (
      <div>
        <h2>Er du sikker?</h2>
        <p>Du er ved et publicere dit projekt.</p>
        <p>
          Sammen med projektet publiceres også dit navn og email, så andre kan komme i kontakt med dig og bidrage til
          forslaget.
        </p>
        <div className="mt-6 mb-2">
          <button onClick={() => this.props.handleSubmit(false)} className="btn btn-secondary m-2">
            Gem som kladde
          </button>
          <button onClick={() => this.props.handleSubmit(true)} className="btn btn-primary m-2">
            Publicer
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmModal;
