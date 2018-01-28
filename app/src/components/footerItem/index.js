import React, { Component } from 'react';
// import FeatherIcon from '../featherIcon';

class FooterItem extends Component {
  render() {
    return (
      <a
        target={this.props.linkTarget}
        href={this.props.linkAddress}
        className="inline-block text-grey-dark hover:text-grey-darkest mx-4 my-2">
        {/* <FeatherIcon name={this.props.iconName} className="mr-2" /> */}
        {this.props.linkText}
      </a>
    );
  }
}

export default FooterItem;
