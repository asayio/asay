import React, { Component } from 'react';
import ProposalTab from '../proposalTab';

class ProposalTabBar extends Component {
  render() {
    const selectedTab = this.props.selectedTab;
    const selectTab = this.props.selectTab;
    const tabs = this.props.tabs;
    return (
      <div>
        {tabs.map((item, index) => (
          <ProposalTab key={index} tab={item} selectTab={selectTab} selectedTab={selectedTab} />
        ))}
      </div>
    );
  }
}

export default ProposalTabBar;
