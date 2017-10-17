import React, { Component } from 'react';
import { ArrowRight } from 'react-feather'
import { Link } from 'react-router-dom'
import PreferenceList from '../preferences/PreferenceList'

class Onboarding extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  async finishingOnboarding (event) {
    const response = await fetch('/api/user/onboarding',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }
    )
    if (response.ok) {
      this.props.history.replace({
        pathname: './'
      })
    }
  };

  render () {
    return(
      <div>
        <h1 className="tc">Velkommen</h1>
        <Link to="./"><ArrowRight className="mr2"/>Ikke nu</Link>
        <div className="mw8 center bg-white pa4 ba b--black-10 br1 shadow-6">
          <div className="tc mb4">
            <p>Vi vil gerne hjælpe dig med at navigere i alle de forslag, der bliver fremsat i Folketinget. Vælg de politiske emner der interesserer dig, så samler vi et overblik til dig. Du kan altid opdatere dine præferencer samt gennemsøge alle forslag.</p>
            <p>Med dine nuværende præferencer, skal du i gennemsnit tage stilling til ca. <b>{this.state.workload}</b> forslag om året. Det svarer til <b>{Math.round(this.state.workload / 52, 0) }</b> om ugen.</p>
          </div>
          <PreferenceList preferenceList={this.props.preferenceList}/>
          <a onClick={() => this.finishingOnboarding()}><ArrowRight className="mr2"/>Gå til forslag</a>
        </div>
      </div>
    );
  }
}

export default Onboarding;
