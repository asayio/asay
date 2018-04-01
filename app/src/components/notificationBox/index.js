import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';

class NotificationBox extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="max-w-md text-center bg-white border border-grey-lighter rounded-sm shadow-md mx-auto mt-4">
          <div className="relative border-b border-grey-lightest p-2">
            <h4>{this.props.title}</h4>
            <div className="absolute pin-y pin-r flex items-center justify-center">
              <button
                className="leading-none hover:bg-grey-lightest rounded-sm p-1 mr-2"
                onClick={this.props.closeNotificationBox}>
                <FeatherIcon name="X" />
              </button>
            </div>
          </div>
          <div className="px-4 py-2">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default NotificationBox;
