import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';
import './style.css';
class ProposalListItemNotification extends Component {
  render() {
    const icon = this.props.iconName;
    const label = this.props.labelName;
    return (
      <div>
        <FeatherIcon name={icon} />
        <span>{label}</span>
      </div>
    );
  }
}

export default ProposalListItemNotification;
