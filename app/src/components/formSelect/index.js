import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';

class FormSelect extends Component {
  render() {
    return (
      <div className="relative">
        <select
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          className="w-full appearance-none leading-tight text-grey-darker bg-white border border-grey-lighter rounded-sm shadow pl-3 pr-8 py-2">
          {this.props.allOption === true ? <option>Alle</option> : null}
          {this.props.options}
        </select>
        <div className="absolute pin-y pin-r flex items-center px-2">
          <FeatherIcon name="ChevronDown" className="text-grey-dark" />
        </div>
      </div>
    );
  }
}

export default FormSelect;
