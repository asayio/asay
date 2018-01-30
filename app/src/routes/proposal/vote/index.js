import React, { Component } from 'react';
import R from 'ramda';
import './style.css';
import LoadingSpinner from '../../../components/loadingSpinner';
import { Link } from 'react-router-dom';
import { Check, X, Minus, ArrowLeft } from 'react-feather';
import FeatherIcon from '../../../components/featherIcon';
import Modal from '../../../components/modal';

class Vote extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      voteresult: undefined,
      voteSubmitted: false,
      voteConfirmed: false,
      showModal: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(voteresult) {
    this.setState({
      voteresult: voteresult,
      showModal: true
    });
  }

  async handleSubmit(event) {
    this.setState({ voteSubmitted: true });
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
      this.setState({ voteConfirmed: true });
      const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList);
      !proposal.hasVoted &&
        this.props.updateState({
          entityType: 'voteList',
          entity: { proposal: Number(this.props.match.params.id) }
        });
    } else {
      this.setState({ showModal: false });
      this.props.updateState({ entityType: 'error', entity: response.status });
    }
  }

  render() {
    const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList);
    const modalHeader = this.state.voteConfirmed ? 'Din valghandling er registreret' : 'Er du sikker?';
    const modalParagraph = this.state.voteConfirmed ? (
      <p>Du sendes nu tilbage til dine forslag.</p>
    ) : (
      <p>
        Du er ved at stemme{' '}
        {this.state.voteresult === true ? (
          <strong className="uppercase">for</strong>
        ) : this.state.voteresult === false ? (
          <strong className="uppercase">imod</strong>
        ) : (
          <span>
            <strong className="uppercase">blankt</strong> på
          </span>
        )}{' '}
        forslaget.
      </p>
    );
    if (proposal.status === 'Afsluttet') {
      return (
        <div>
          <h1>{proposal.shortTitel.replace('.', '')}</h1>
          <div>
            <h2>Afstemningen er afsluttet</h2>
          </div>
          <Link to={`../${this.props.match.params.id}`}>
            <ArrowLeft />Tilbage til forslaget
          </Link>
        </div>
      );
    } else {
      return (
        <div className="flex-auto px-2">
          <div className="max-w-xl mx-auto">
            <div className="flex flex-wrap sm:flex-no-wrap items-center my-6 sm:my-8">
              <button
                onClick={() => window.history.back()}
                className="sm:flex-none sm:h-9 w-full sm:w-9 sm:text-xl bg-white border border-grey-lighter rounded-sm shadow hover:shadow-md px-3 py-2 sm:px-0 sm:py-0 mb-4 sm:mb-0">
                <ArrowLeft className="sm:leading-none sm:mb-0 mr-2 sm:mr-0" />
                <span className="sm:hidden">Tilbage</span>
              </button>
              <h1 className="flex-auto sm:pl-4 sm:pr-8 my-0">{proposal.shortTitel.replace('.', '')}</h1>
            </div>
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
                  <Check className="mr-2" />For
                </button>
                <button onClick={() => this.handleVote(false)} className="btn btn-primary m-2">
                  <X className="mr-2" />Imod
                </button>
              </div>
              <div className="my-4">
                <button onClick={() => this.handleVote(null)} className="btn btn-secondary m-2">
                  <Minus className="mr-2" />Blankt
                </button>
              </div>
            </div>
            {this.state.showModal && (
              <Modal
                content={
                  <div>
                    <h2>{modalHeader}</h2>
                    {modalParagraph}
                    {this.state.voteConfirmed ? (
                      <div className="my-8">
                        <Link
                          to="../../"
                          onClick={() => this.setState({ showModal: false })}
                          className="btn btn-primary">
                          <ArrowLeft className="mr-2" />Tilbage til mine forslag
                        </Link>
                      </div>
                    ) : this.state.voteSubmitted ? (
                      <LoadingSpinner />
                    ) : (
                      <div className="my-8">
                        <button onClick={() => this.setState({ showModal: false })} className="btn btn-secondary m-2">
                          <FeatherIcon name="X" className="mr-2" />
                          Annuller
                        </button>
                        <button onClick={this.handleSubmit} className="btn btn-primary m-2">
                          <FeatherIcon name="Check" className="mr-2" />
                          Bekræft
                        </button>
                      </div>
                    )}
                  </div>
                }
              />
            )}
          </div>
        </div>
      );
    }
  }
}

export default Vote;
