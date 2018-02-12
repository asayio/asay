import React, { Component } from 'react';

class formInput extends Component {
  render() {
    return (
      <label className="block my-8">
        <span className="block font-bold mb-2">{this.props.title}</span>
        <input
          name={this.props.name}
          placeholder={this.props.placeholder}
          className="block w-full bg-grey-lightest border border-grey-lighter rounded-sm px-3 py-2"
          onChange={this.props.handleChange}
        />
      </label>
    );
  }
}

export default formInput;
