import React, { Component } from 'react';
import './style.css';

class Modal extends Component {
  render() {
    return (
      <div className="modal flex fixed z-20 pin items-center justify-center bg-black-50 p-2">
        <div className="relative w-full sm:w-128 text-center bg-white rounded-sm shadow p-8">{this.props.content}</div>
      </div>
    );
  }
}

export default Modal;
