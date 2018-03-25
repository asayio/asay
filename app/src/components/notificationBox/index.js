import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';

class NotificationBox extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="max-w-md text-center bg-white border border-grey-lighter rounded-sm shadow-md mx-auto mt-4">
          <div className="relative border-b border-grey-lightest p-1">
            <h4>Succes!</h4>
            <div className="absolute pin-y pin-r flex items-center justify-center">
              <button
                className="flex-none w-4 h-4 hover:bg-grey-lightest rounded-sm mr-2"
                onClick={this.props.closeNotificationBox}>
                <FeatherIcon name="X" className="mb-0" />
              </button>
            </div>
          </div>
          <div className="p-1">
            <p className="mb-1">Din e-mail er blevet verificeret.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationBox;
