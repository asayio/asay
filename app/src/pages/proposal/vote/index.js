import React, { Component } from 'react';
import './style.css';
import BackBtn from '../../../widgets/BackBtn.js';

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
    const propsalUrl = encodeURIComponent('Sag?$filter=id%20eq%20' + this.props.match.params.id + '&$expand=Sagsstatus,Periode,Sagstype');
    const response = await fetch(`/api/openDataFetcher/fetchAllPages/${propsalUrl}`);
    const proposalData = await response.json();
    const proposalInfo = proposalData[0];
    this.setState({proposalInfo});
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
    return (
      <div className="mw8 center tc">
        <h1 className="f3 mt5 mb4">{this.state.proposalInfo.nummer}: {this.state.proposalInfo.titelkort}</h1>
        <div className="mw6 center bg-white mv2 pa4 ba b--black-10 br1 shadow-6">
          <h2 className="f4">Afgiv din stemme</h2>
          <a onClick={() => this.handleVote(true)} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv3 ma3 ba b--black-10 br1 shadow-6">For</a>
          <a onClick={() => this.handleVote(false)} className="pointer dib white bg-dark-blue hover-bg-blue w4 pv3 ma3 ba b--black-10 br1 shadow-6">Imod</a>
          <a onClick={() => this.handleVote(null)} className="pointer db dark-blue hover-blue ma3 lh-copy">Træk stemme tilbage</a>
        </div>
        <div className="modal" id="modal">
          {this.state.error ?
          <div className="modal-content">
            <h3>Der er sket en fejl</h3>
            <p>Det er ikke dig, det er os. Prøv igen.<br/>Hvis det stadig ikke virker så <a href="mailto:dinvenner@initiativet.net">send os en mail.</a></p>
            <a id="closemodal" onClick={this.closeModal}>
              <span className="lh-copy">Tilbage</span>
            </a>
          </div> :
          <div className="modal-content">
            <h3>Er du sikker?</h3>
            {this.state.voteresult === null ?
              <p>Du er ved et trække din stemme tilbage.</p>
              : <p>Du er ved at stemme <b>{this.state.voteresult === true ? "for" : "imod"} </b>.</p>
            } <br/>
            <a id="closemodal" onClick={this.closeModal}>
              <span className="lh-copy">Annuller</span>
            </a>
            <a onClick={this.handleSubmit}>
              <span className="lh-copy">Bekræft</span>
            </a>
          </div>}
        </div>
      </div>
    );
  }
}

export default Vote;
