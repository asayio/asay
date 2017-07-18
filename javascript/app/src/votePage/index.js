import React, { Component } from 'react';
import Nav from '../nav/Nav.js';
import './style.css';
import { ArrowLeft } from 'react-feather';

class VotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteresult: '',
      proposalHeader: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(`/api/proposal/${this.props.match.params.id}`);
    const proposalData = await response.json();
    const proposal = proposalData.proposalInfo;
    const proposalHeader = proposal.ref + ': ' + proposal.subtitle;
    this.setState({proposalHeader});
  }

  handleChange(event) {
    this.setState({
      voteresult: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const voteresult = this.state.voteresult
    fetch(`/api/proposal/${this.props.match.params.id}/vote`,
      {
        method: 'POST',
        body: JSON.stringify({
          voteresult: voteresult,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(function() {
        window.location.href="../../confirmed/"
    }).catch(function() {
      alert("Der opstod en fejl. Prøv igen senere.");
    });
  };

  handleWithdraw(event) {
    this.setState({
      voteresult: null
    });
    const modal = document.getElementById('withdraw-modal');
    modal.style.display = "flex";
    const closeBtn = document.getElementById("closemodal");
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
    }
  }

  render() {
    return (
      <div>
      <Nav history={this.props.history}/>
      <a href = {`../${this.props.match.params.id}`} className="dib link dark-blue hover-blue v-btm mb3">
        <ArrowLeft className="svg-icon mr1" />
        <span className="lh-copy">Tilbage til forslag</span>
      </a>
      <h1>{this.state.proposalHeader}</h1>
      <form id="voteForm" onSubmit={this.handleSubmit}>
        <input name="voteresult" type="radio" onChange={this.handleChange} value="true" required/>For
        <input name="voteresult" type="radio" onChange={this.handleChange} value="false" required />Imod
        <br/><button type="submit">Skriv under</button>
      </form>
      <a onClick={this.handleWithdraw} value="null">Træk stemme tilbage </a>
      <div className="modal" id="withdraw-modal">
        <div className="modal-content">
        <h3>Er du sikker?</h3>
        {this.state.voteresult === null ?
          <p>Du er ved et trække din stemme tilbage</p>
          : <p>Du er ved at stemme <b>{this.state.voteresult === "true" ? "for" : "imod"} </b>.</p>
        }
        <br/><button id="closemodal">Annuller</button>
        <button onClick={this.handleSubmit}>Bekræft</button>
        </div>
      </div>
      </div>
    );
  }
}

export default VotePage;
