import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div>
        <div>{this.props.content}</div>
      </div>
    );
  }
}

export default Modal;
