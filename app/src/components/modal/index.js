import React, { Component } from 'react';

class Modal extends Component {
  render() {
    return (
      <div className="fixed absolute--fill bg-black-50 items-center justify-center overflow-auto pa2 z-9999">
        <div className="pa3 pv4-ns ph5-ns tc bg-white ba b--black-10 br1">
          <h2 className="f4">{this.props.header}</h2>
          <p>{this.props.parapgraph}</p>
          <div>
            {this.props.btn1 &&
              this.props.btn1onClick && (
                <a onClick={this.props.btn1onClick} className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">
                  OK
                </a>
              )}
            {this.props.btn2 &&
              this.props.btn2onClick && (
                <a onClick={this.props.btn2onClick} className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">
                  OK
                </a>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
