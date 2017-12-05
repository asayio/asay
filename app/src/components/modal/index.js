import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="fixed absolute--fill bg-black-50 flex items-center justify-center overflow-auto pa2 z-9999">
        <div className="pa3 pv4-ns ph5-ns tc bg-white ba b--black-10 br1">{this.props.content}</div>
      </div>
    );
  }
}

export default Modal;
