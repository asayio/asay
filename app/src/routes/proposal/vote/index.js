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
        Authorization: 'Bearer ' + window.sessionStorage.authToken
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
      this.props.updateState({ entityType: 'error', entity: true });
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
        <div className="mw8 center w-100 flex-auto tc">
          <h1 className="f3 mt5 mb4">{proposal.shortTitel.replace('.', '')}</h1>
          <div className="mw6 center bg-white mv2 pa3 pa4-ns ba b--black-10 br1 shadow-6">
            <h2 className="f4">Afstemningen er afsluttet</h2>
          </div>
          <Link to={`../${this.props.match.params.id}`} className="pointer dark-blue hover-blue dib mt3">
            <ArrowLeft className="mr2" />Tilbage til forslaget
          </Link>
        </div>
      );
    } else {
      return (
        <div className="mw8 center w-100 flex-auto tc">
          <h1 className="f3 mt5 mb4">{proposal.shortTitel.replace('.', '')}</h1>
          <div className="mw6 center bg-white mv2 pa3 pa4-ns ba b--black-10 br1 shadow-6">
            <h2 className="f4">{proposal.hasVoted ? 'Ændr din stemme' : 'Afgiv din stemme'}</h2>
            {proposal.hasVoted && <p>Du har allerede stemt. Ved at ændre din stemme overskrives din gamle stemme.</p>}
            <a
              onClick={() => this.handleVote(false)}
              className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6">
              <X className="mr2" />Imod
            </a>
            <a
              onClick={() => this.handleVote(true)}
              className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6">
              <Check className="mr2" />For
            </a>
            <a onClick={() => this.handleVote(null)} className="pointer db dark-blue hover-blue ma3 lh-copy">
              <Minus className="mr2" />Blankt
            </a>
          </div>
          <Link to={`../${this.props.match.params.id}`} className="pointer dark-blue hover-blue dib mt3">
            <ArrowLeft className="mr2" />Tilbage til forslaget
          </Link>
          {this.state.showModal && (
            <Modal
              content={
                <div>
                  <h2 className="f4">{modalHeader}</h2>
                  {modalParagraph}
                  {this.state.voteConfirmed ? (
                    <Link
                      to="../../"
                      onClick={() => this.setState({ showModal: false })}
                      className="pointer dib white bg-dark-blue hover-bg-blue ph3 pv2 ma2 ba b--black-10 br1 shadow-6">
                      <ArrowLeft className="mr2" />Tilbage til mine forslag
                    </Link>
                  ) : this.state.voteSubmitted ? (
                    <LoadingSpinner />
                  ) : (
                    <div>
                      <a
                        onClick={() => this.setState({ showModal: false })}
                        className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">
                        Annuller
                      </a>
                      <a
                        onClick={this.handleSubmit}
                        className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6">
                        Bekræft
                      </a>
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
