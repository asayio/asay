import R from 'ramda'
import React, { Component } from 'react';
import ProposalInfo from './ProposalInfo';
import { Link } from 'react-router-dom';
import { CheckSquare } from 'react-feather';
import LoadingSpinner from '../../widgets/LoadingSpinner'

class ProposalPage extends Component {

  constructor() {
    super()
    this.state = {
      subscription: false
    };
  this.updateSubscription = this.updateSubscription.bind(this);
  }


  async updateSubscription() {
    const newsubscription = !this.state.subscription
    const response = await fetch(`/api/subscription/proposal/${this.props.match.params.id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          subscription: newsubscription,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      })
    if (response.ok) {
      this.setState({subscription: newsubscription})
    }
  }

  render() {
    const proposal = R.find(R.propEq('id', Number(this.props.match.params.id)), this.props.proposalList)
    if (proposal) {
      return (
        <div>
          <div className="mw8 center">
            <ProposalInfo
              proposal = {proposal}
            />
            <div className="col12 col9-l tc">
              <Link to={`${proposal.id}/vote`} className="db dib-l white bg-dark-blue hover-bg-blue mt3 pv2 ph4 ba b--black-10 br1 shadow-6">
                <CheckSquare className="mr2"/>
                Gå til stemmeboks
              </Link>
              <a onClick={this.updateSubscription}>
                {this.state.subscription ? "Fjern fra egne forslag" : "Tilføj til egne forslag" }
              </a>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <LoadingSpinner/>
      )
    }

  }
}

export default ProposalPage;
