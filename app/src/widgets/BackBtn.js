import React, { Component } from 'react';
import { ArrowLeft } from 'react-feather';

export default class BackBtn extends Component {
  render () {
    const href = this.props.href ? this.props.href : '../'
    return (
      <a href = {href} className="dib link dark-blue hover-blue mt3">
        <ArrowLeft className="mr1" />
        <span>{this.props.title}</span>
      </a>
    )
  }
}
