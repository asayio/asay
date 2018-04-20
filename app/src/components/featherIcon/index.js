import React, { Component } from 'react';
import * as Icon from 'react-feather';

export default class FeatherIcon extends Component {
  render() {
    const CategoryIcon = Icon[this.props.name];
    return <CategoryIcon className={this.props.className} />;
  }
}
