import React, { Component } from 'react';
import FeatherIcon from '../../../components/featherIcon';

class SubmissionModal extends Component {
  render() {
    return (
      <div>
        <h2>Er du sikker?</h2>
        <p>
          Du er ved at stemme
          {this.props.voteresult === true ? (
            <strong className="uppercase"> for</strong>
          ) : this.props.voteresult === false ? (
            <strong className="uppercase"> imod</strong>
          ) : (
            <span>
              <strong className="uppercase"> blankt</strong> på
            </span>
          )}{' '}
          forslaget.
        </p>
        <div className="mt-8 mb-4">
          <button
            onClick={() => this.props.updateState({ entityType: 'modal', entity: false })}
            className="btn btn-secondary m-2">
            <FeatherIcon name="X" className="mr-2" />
            Annuller
          </button>
          <button onClick={() => this.props.handleSubmit()} className="btn btn-primary m-2">
            <FeatherIcon name="Check" className="mr-2" />
            Bekræft
          </button>
        </div>
      </div>
    );
  }
}

export default SubmissionModal;
