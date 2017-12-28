import React, { Component } from 'react';
import { ArrowLeft } from 'react-feather';

export default class BackBtn extends Component {
  render() {
    const href = this.props.href ? this.props.href : '../';
    return (
      <a href={href}>
        <ArrowLeft />
        <span>{this.props.title}</span>
      </a>
    );
  }
}
