import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';
import './style.css';

class Modal extends Component {
  render() {
    return (
      <div id="modal" className="modal flex fixed z-50 pin items-center justify-center bg-black-50 p-2">
        <div className="relative w-full sm:w-128 text-center bg-white rounded-sm shadow p-8">
          <button
            onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
            className="absolute pin-t pin-r leading-none hover:bg-grey-lightest rounded-sm p-1 m-1">
            <FeatherIcon name="X" />
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
