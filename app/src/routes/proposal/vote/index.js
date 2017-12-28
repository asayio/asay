import React, { Component } from 'react';
import R from 'ramda';
import './style.css';
import LoadingSpinner from '../../../components/loadingSpinner';
import { Link } from 'react-router-dom';
import { Check, X, Minus, ArrowLeft } from 'react-feather';
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
        {' '}
        Du er ved at stemme{' '}
        {this.state.voteresult === true ? 'FOR' : this.state.voteresult === false ? 'IMOD' : 'BLANKT på'} forslaget.
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
        <div>
          <h1>{proposal.shortTitel.replace('.', '')}</h1>
          <div>
            <h2>{proposal.hasVoted ? 'Ændr din stemme' : 'Afgiv din stemme'}</h2>
            {proposal.hasVoted && <p>Du har allerede stemt. Ved at ændre din stemme overskrives din gamle stemme.</p>}
            <a onClick={() => this.handleVote(false)}>
              <X />Imod
            </a>
            <a onClick={() => this.handleVote(true)}>
              <Check />For
            </a>
            <a onClick={() => this.handleVote(null)}>
              <Minus />Blankt
            </a>
          </div>
          <Link to={`../${this.props.match.params.id}`}>
            <ArrowLeft />Tilbage til forslaget
          </Link>
          {this.state.showModal && (
            <Modal
              content={
                <div>
                  <h2>{modalHeader}</h2>
                  {modalParagraph}
                  {this.state.voteConfirmed ? (
                    <Link to="../../" onClick={() => this.setState({ showModal: false })}>
                      <ArrowLeft />Tilbage til mine forslag
                    </Link>
                  ) : this.state.voteSubmitted ? (
                    <LoadingSpinner />
                  ) : (
                    <div>
                      <a onClick={() => this.setState({ showModal: false })}>Annuller</a>
                      <a onClick={this.handleSubmit}>Bekræft</a>
                    </div>
                  )}
                </div>
              }
            />
          )}
        </div>
      );
    }
  }
}

export default Vote;
