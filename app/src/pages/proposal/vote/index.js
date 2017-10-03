import React, { Component } from 'react';
import R from 'ramda'
import './style.css';
import LoadingSpinner from '../../../widgets/LoadingSpinner.js';
import proposalFetcher from '../../../fetcher/proposalFetcher.js';
import { Check,X,Minus } from 'react-feather';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteresult: undefined,
      error: false,
      proposalInfo: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  async componentDidMount() {
    const proposalInfo = await proposalFetcher({specificProposalId: this.props.match.params.id})
    this.setState({proposalInfo: proposalInfo.value[0]});
  }

  closeModal(event) {
    this.setState({voteresult: undefined, error: false})
    const modal = document.getElementById('modal');
    modal.style.display = "none";
  }

  openModal() {
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
      window.location.href="../../confirmed/"
      window.onunload = refreshParent;
      function refreshParent() {
          window.opener.location.reload();
      }
    } else {
      this.setState({error: true})
    }
  };

  render() {
    if (!R.isEmpty(this.state.proposalInfo)) {
      return (
        <div className="mw8 center tc">
          <h1 className="f3 mt5 mb4">{this.state.proposalInfo.nummer}: {this.state.proposalInfo.titelkort.replace('.', '')}</h1>
          <div className="mw6 center bg-white mv2 pa4 ba b--black-10 br1 shadow-6">
            <h2 className="f4">Afgiv din stemme</h2>
            <a onClick={() => this.handleVote(true)} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6"><Check className="mr2"/>For</a>
            <a onClick={() => this.handleVote(false)} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6"><X className="mr2"/>Imod</a>
            <a onClick={() => this.handleVote(null)} className="pointer db dark-blue hover-blue ma3 lh-copy"><Minus className="mr2"/>Træk stemme tilbage</a>
          </div>
          <div id="modal" className="modal dn items-center justify-center overflow-auto w-100 h-100 pa2 z-5">
            {this.state.error ?
            <div className="pv4 ph5 tc bg-white ba b--black-10 br1">
              <h2 className="f4">Der er sket en fejl</h2>
              <p>Det er ikke dig, det er os. Prøv igen.
                <br/><br/>
              Hvis det stadig ikke virker så <a href="mailto:dinvenner@initiativet.net" target="_blank" rel="noopener noreferrer" className="dark-blue hover-blue">send os en mail.</a></p>
              <a onClick={this.closeModal} className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">Tilbage</a>
            </div> :
            <div className="pv4 ph5 tc bg-white ba b--black-10 br1">
              <h2 className="f4">Er du sikker?</h2>
              {this.state.voteresult === null ?
                <p>Du er ved et trække din stemme tilbage.</p>
                : <p>Du er ved at stemme <b>{this.state.voteresult === true ? "FOR" : "IMOD"}</b> forslaget.</p>
              }
              <a onClick={this.closeModal} className="pointer dib dark-blue w4 pv2 ma2 ba b--dark-blue br1">Annuller</a>
              <a onClick={this.handleSubmit} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv2 ma2 ba b--black-10 br1 shadow-6">Bekræft</a>
            </div>}
          </div>
        </div>
      );
    } else {
      return (
        <LoadingSpinner/>
      )
    }
  }
}

export default Vote;
