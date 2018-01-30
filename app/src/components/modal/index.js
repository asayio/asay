import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="fixed z-20 pin flex items-center justify-center bg-black-50 p-2">
        <div className="w-full sm:w-128 text-center bg-white rounded-sm p-8">{this.props.content}</div>
      </div>
    );
  }
}

export default Modal;
