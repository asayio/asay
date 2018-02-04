import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';

class ProposalTab extends Component {
  render() {
    const tab = this.props.tab;
    const isSelected = this.props.selectedTab === tab.name;
    const className =
      (isSelected ? 'bg-white cursor-auto' : 'bg-grey-lightest hover:shadow-md') +
      ' leading-none w-1/2 sm:w-auto border border-grey-lighter rounded-sm shadow no-outline px-4 py-2 mx-1';
    return (
      <button onClick={() => this.props.selectTab(tab.name)} className={className}>
        <FeatherIcon name={tab.icon} className="mr-2" />
        {tab.name}
      </button>
    );
  }
}

export default ProposalTab;
