import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';
import './style.css';
class ProposalListItemNotification extends Component {
  render() {
    const icon = this.props.iconName;
    const label = this.props.labelName;
    return (
      <div className="notification-wrapper absolute pin-t pin-r leading-none m-2">
        <FeatherIcon name={icon} className="text-grey-dark" />
        <span className="notification-label absolute whitespace-no-wrap text-white bg-grey-darkest rounded-sm p-1">
          {label}
        </span>
      </div>
    );
  }
}

export default ProposalListItemNotification;
