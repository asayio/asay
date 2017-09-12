import React, { Component } from 'react';
import Nav from '../nav/Nav.js';
import './style.css';
import { ArrowLeft, XSquare, CheckSquare, MinusSquare, ArrowRight, Check, X } from 'react-feather';

class VotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteresult: undefined,
      proposalInfo: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async componentDidMount() {
    const propsalUrl = encodeURIComponent('Sag?$filter=id%20eq%20' + this.props.match.params.id + '&$expand=Sagsstatus,Periode,Sagstype');
    const response = await fetch(`/api/openDataFetcher/fetchAllPages/${propsalUrl}`);
    const proposalData = await response.json();
    const proposalInfo = proposalData[0];
    this.setState({proposalInfo});
  }

  handleChange(event) {
    this.setState({
      voteresult: event.target.value
    });
  }

  resetForm(event) {
    document.getElementById("voteForm").reset();
    this.setState({
      voteresult: undefined
    })
  }

  async handleWithdraw(event) {
    await this.setState({
      voteresult: null
    });
    this.handleVote();
  }

  handleSubmit(event) {
    fetch(`/api/proposal/${this.props.match.params.id}/vote`,
      {
        method: 'POST',
        body: JSON.stringify({
          voteresult: this.state.voteresult,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }).then(function() {
        window.location.href="../../confirmed/"
        window.onunload = refreshParent;
        function refreshParent() {
            window.opener.location.reload();
        }
    }).catch(function() {
      alert("Der opstod en fejl. Prøv igen senere.");
    });
  };

  handleVote(event) {
    if (this.state.voteresult !== undefined) {
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
    } else {
      alert("Hovsa. Du skal lige vælge hvad du vil stemme først.")
    }
  }

  render() {
    console.log(this.state.voteresult);
    return (
      <div>
      <a href = {`../${this.props.match.params.id}`} className="dib link dark-blue hover-blue v-btm mb3">
        <ArrowLeft className="svg-icon mr1" />
        <span className="lh-copy">Tilbage til forslag</span>
      </a>
      <h1>{this.state.proposalInfo.nummer}: {this.state.proposalInfo.titelkort}</h1>
      <form id="voteForm">
        <input name="voteresult" type="radio" onChange={this.handleChange} value="true" required/>
          <CheckSquare className="svg-icon mr1"/>
          <span className="lh-copy">For</span>
        <input name="voteresult" type="radio" onChange={this.handleChange} value="false" required />
          <XSquare className="svg-icon mr1"/>
          <span className="lh-copy">Imod</span>
      </form>
      <br/>
      <a onClick={this.handleVote}>
        <ArrowRight className="svg-icon mr1"/>
        <span className="lh-copy">Stem</span>
      </a> <br/>
      <a onClick={this.handleWithdraw} value="null">
        <MinusSquare className="svg-icon mr1"/>
        <span className="lh-copy">Træk stemme tilbage</span>
      </a>
      <div className="modal" id="withdraw-modal">
        <div className="modal-content">
        <h3>Er du sikker?</h3>
        {this.state.voteresult === null ?
          <p>Du er ved et trække din stemme tilbage.</p>
          : <p>Du er ved at stemme <b>{this.state.voteresult === "true" ? "for" : "imod"} </b>.</p>
        }
        <br/>
        <a id="closemodal" onClick={this.resetForm}>
          <X className="svg-icon mr1"/>
          <span className="lh-copy">Annuller</span>
        </a>
        <a onClick={this.handleSubmit}>
          <Check className="svg-icon mr1"/>
          <span className="lh-copy">Bekræft</span>
        </a>
        </div>
      </div>
      </div>
    );
  }
}

export default VotePage;
