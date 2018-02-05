import React, { Component } from 'react';

class ProjectFormInput extends Component {
  render() {
    return (
      <label className="block my-8">
        <span className="block font-bold mb-2">{this.props.title}</span>
        {this.props.type === 'text' ? (
          <input
            type="text"
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            className="block w-full bg-grey-lightest border border-grey-lighter rounded-sm px-3 py-2"
          />
        ) : null}
        {this.props.type === 'textarea' ? (
          <textarea
            name={this.props.name}
            value={this.props.value}
            placeholder={this.props.placeholder}
            className="block w-full h-64 resize-none bg-grey-lightest border border-grey-lighter rounded-sm px-3 py-2"
          />
        ) : null}
      </label>
    );
  }
}

export default ProjectFormInput;
