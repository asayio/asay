import React, { Component } from 'react';
import Nav from '../nav/Nav.js'
import './style.css'

class VotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollid: [],
      voteresult: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  handleChange(event) {
    this.setState({
      voteresult: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("voteForm");
    fetch('/api/vote/poll/2', //make dynamic
      {
        method: 'POST',
        body: JSON.stringify({
          voteresult: this.state.voteresult,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
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
        <h1>ref: subtitle</h1>
        <form id="voteForm" onSubmit={this.handleSubmit}>
          <input name="voteresult" type="radio" onChange={this.handleChange} value="true"/>For
          <input name="voteresult" type="radio" onChange={this.handleChange} value="false"/>Imod
          <br/><button type="submit">Skriv under</button>
        </form>
        {this.props.voteresult === null ?
          <nothing/>:
          <a onClick={this.handleWithdraw} value="null">Træk stemme tilbage </a>
        }
        <div className="modal" id="withdraw-modal">
          <div className="modal-content">
          <h3>Er du sikker?</h3>
          {this.state.voteresult === null ?
            <p>Du er ved et trække din stemme tilbage</p>
            : <p>Du er ved at stemme <b>{this.state.voteresult === "true" ? "for" : "imod"} </b>.</p>
          }
          <br/><button id="closemodal">Annuller</button>
          <button id="submitWithdrawal" type="submit" onSubmit={this.handleSubmit}>Bekræft</button>
          </div>
        </div>
      </div>
    );
  }
}

export default VotePage;
