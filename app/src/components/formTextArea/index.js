import React, { Component } from 'react';

class formTextArea extends Component {
  render() {
    return (
      <label className="block my-8">
        <span className="block font-bold mb-2">{this.props.title}</span>
        <textarea
          name={this.props.name}
          defaultValue={this.props.value}
          placeholder={this.props.placeholder}
          className="block w-full h-64 resize-none bg-grey-lightest border border-grey-lighter rounded-sm px-3 py-2"
        />
      </label>
    );
  }
}

export default formTextArea;
