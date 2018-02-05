import React, { Component } from 'react';
import FormSelect from '../formSelect';

class ProjectFormInput extends Component {
  render() {
    return (
      <label className="block md:w-1/2 my-8">
        <span className="block font-bold mb-2">{this.props.title}</span>
        <FormSelect
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          defaultOption={this.props.defaultOption}
          defaultOptionDisabled={this.props.defaultOptionDisabled}
          options={this.props.options}
        />
      </label>
    );
  }
}

export default ProjectFormInput;
