
import React, { Component } from 'react';
import R from 'ramda'
import './style.css';
import LoadingSpinner from '../../../widgets/LoadingSpinner.js';
import { Link } from 'react-router-dom';
import { Check, X, Minus, ArrowLeft } from 'react-feather';
import PropTypes from "prop-types";

class Vote extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      voteresult: undefined,
      error: false,
      voteConfirmed: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal(event) {
    this.setState({voteresult: undefined, error: false})
    const modal = document.getElementById('modal');
    modal.style.display = "none";
  }

  openModal(event) {
    const modal = document.getElementById('modal');
    modal.style.display = "flex";
  }

  handleVote(voteresult) {
    this.setState({
      voteresult: voteresult
    },
    this.openModal
    );
  }

  async handleSubmit(event) {
    const response = await fetch(`/api/proposal/${this.props.match.params.id}/vote`,
      {
        method: 'POST',
        body: JSON.stringify({
          voteresult: this.state.voteresult,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      })
    if (response.ok) {
      this.setState({voteConfirmed: true})
      this.props.updateState({
        entityType: 'voteList',
        entity: {proposal: Number(this.props.match.params.id)}
      })
    } else {
      this.setState({error: true})
    }
  };

  render() {
    const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList)
    const modalHeader = this.state.error ? "Der er sket en fejl" : this.state.voteConfirmed ? "Din valghandling er registreret" : "Er du sikker?"
    const modalParagraph = this.state.error ?
      <p>Det er ikke dig, det er os. Prøv igen, og hvis det stadig ikke virker så <a href="mailto:dinvenner@initiativet.net" target="_mailto" rel="noopener noreferrer" className="dark-blue hover-blue">send os en mail.</a></p>
    : this.state.voteConfirmed ?
      <p>Du sendes nu tilbage til dine forslag.</p>
    : <p> Du er ved at stemme {this.state.voteresult === true ? "FOR" : this.state.voteresult === false ? "IMOD" : "BLANKT på"} forslaget.</p>
    if (proposal) {
      return (
        <div className="mw8 center w-100 flex-auto tc">
          <h1 className="f3 mt5 mb4">{proposal.shortTitel.replace('.', '')}</h1>
          <div className="mw6 center bg-white mv2 pa3 pa4-ns ba b--black-10 br1 shadow-6">
            <h2 className="f4">{proposal.hasVoted ? "Ændr din stemme" : "Afgiv din stemme" }</h2>
            {proposal.hasVoted && <p>Du har allerede stemt. Ved at ændre din stemme overskrives din gamle stemme.</p>}
            <a onClick={() => this.handleVote(false)} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6"><X className="mr2"/>Imod</a>
            <a onClick={() => this.handleVote(true)} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6"><Check className="mr2"/>For</a>
            <a onClick={() => this.handleVote(null)} className="pointer db dark-blue hover-blue ma3 lh-copy"><Minus className="mr2"/>Blankt</a>
          </div>
          <Link to={`../${this.props.match.params.id}`} className="pointer dark-blue hover-blue dib mt3"><ArrowLeft className="mr2"/>Tilbage til forslaget</Link>
          <div id="modal" className="modal dn items-center justify-center overflow-auto w-100 h-100 pa2 z-9999">
            <div className="pa3 pv4-ns ph5-ns tc bg-white ba b--black-10 br1">
              <h2 className="f4">{modalHeader}</h2>
              {modalParagraph}
              {this.state.voteConfirmed ?
              <Link to="../../" className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6">Tilbage til forslagslisten</Link> :
              this.state.error ?
              <a onClick={this.closeModal} className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">OK</a>:
              <div>
                <a onClick={this.closeModal} className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">Annuller</a>
                <a onClick={this.handleSubmit} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6">Bekræft</a>
              </div>}
            </div>
          </div>
        </div>
      )} else {
      return (
        <LoadingSpinner/>
      )
    }
  }
}

export default Vote;
