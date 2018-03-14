import React, { Component } from 'react';
import './style.css';

class Modal extends Component {
  render() {
    return (
      <div id="modal" className="modal flex fixed z-50 pin items-center justify-center bg-black-50 p-2">
        <div className="relative w-full sm:w-128 text-center bg-white rounded-sm shadow p-8">
          <div
            onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
            className="text-right mr-2">
            <span className="pointer mid-gray hover-dark-gray f3 pl3 pb2">✕</span>
          </div>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default Modal;
