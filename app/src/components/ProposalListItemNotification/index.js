import React, { Component } from 'react';
import FeatherIcon from '../../widgets/FeatherIcon';
import './style.css';
class ProposalListItemNotification extends Component {
  render() {
    const icon = this.props.iconName;
    const label = this.props.labelName;
    return (
      <div className="notification-wrapper relative mid-gray pa1">
        <FeatherIcon name={icon} className="notification-icon" />
        <span className="notification-label white bg-dark-gray pv1 ph2 br1">{label}</span>
      </div>
    );
  }
}

export default ProposalListItemNotification;
