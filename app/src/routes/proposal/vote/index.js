import React, { Component } from 'react';
import R from 'ramda';
import './style.css';
import { Link } from 'react-router-dom';
import FeatherIcon from '../../../components/featherIcon';
import Heading from '../../../components/headingWithBackBtn';
import SubmissionModal from './submissionModal';
import ConfirmationModal from './confirmationModal';

class Vote extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      voteresult: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(voteresult) {
    this.setState({
      voteresult: voteresult
    });
    this.props.updateState({
      entityType: 'modal',
      entity: {
        content: (
          <SubmissionModal
            updateState={this.props.updateState}
            voteresult={voteresult}
            handleSubmit={this.handleSubmit}
          />
        )
      }
    });
  }

  async handleSubmit(event) {
    this.props.updateState({ entityType: 'modal', entity: 'loading' });
    const response = await fetch(`/api/proposal/${this.props.match.params.id}/vote`, {
      method: 'POST',
      body: JSON.stringify({
        voteresult: this.state.voteresult
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
    if (response.ok) {
      this.props.updateState({
        entityType: 'modal',
        entity: { content: <ConfirmationModal updateState={this.props.updateState} /> }
      });
      const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList);
      !proposal.hasVoted &&
        this.props.updateState({
          entityType: 'voteList',
          entity: { proposal: Number(this.props.match.params.id) }
        });
    } else {
      this.props.updateState({ entityType: 'modal', entity: response.status });
    }
  }

  render() {
    const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList);
    if (proposal.status === 'Afsluttet') {
      return (
        <div>
          <h1>{proposal.shortTitel.replace('.', '')}</h1>
          <div>
            <h2>Afstemningen er afsluttet</h2>
          </div>
          <Link to={`../${this.props.match.params.id}`}>
            <FeatherIcon name="ArrowLeft" />
          </Link>
        </div>
      );
    } else {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <Heading title={proposal.shortTitel.replace('.', '')} />
            <div className="max-w-md text-center bg-white border border-grey-lighter rounded-sm shadow px-4 pt-4 pb-8 mx-auto">
              <div>
                <h2>{proposal.hasVoted ? 'Ændr din stemme' : 'Afgiv din stemme'}</h2>
                {proposal.hasVoted && (
                  <p className="mx-auto">
                    Du har allerede stemt. Ved at ændre din stemme overskrives din gamle stemme.
                  </p>
                )}
              </div>
              <div className="mt-6 mb-4">
                <button onClick={() => this.handleVote(true)} className="btn btn-primary m-2">
                  <FeatherIcon name="Check" className="mr-2" />For
                </button>
                <button onClick={() => this.handleVote(false)} className="btn btn-primary m-2">
                  <FeatherIcon name="X" className="mr-2" />Imod
                </button>
              </div>
              <div className="my-4">
                <button onClick={() => this.handleVote(null)} className="btn btn-secondary m-2">
                  <FeatherIcon name="Minus" className="mr-2" />Blank
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Vote;
