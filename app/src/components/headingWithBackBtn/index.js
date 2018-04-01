import React, { Component } from 'react';
import FeatherIcon from '../featherIcon';

class Heading extends Component {
  render() {
    return (
      <div className="flex flex-wrap sm:flex-no-wrap items-center my-6 sm:my-8">
        <button
          onClick={() => window.history.back()}
          className="sm:flex-none sm:h-9 w-full sm:w-9 sm:text-xl bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md px-3 py-2 sm:px-0 sm:py-0 mb-4 sm:mb-0">
          <FeatherIcon name="ArrowLeft" className="sm:leading-none sm:translate-y-005 mr-2 sm:mr-0" />
          <span className="sm:hidden">Tilbage</span>
        </button>
        <h1 className="flex-auto sm:pl-4 sm:pr-8 my-0">{this.props.title}</h1>
      </div>
    );
  }
}

export default Heading;
