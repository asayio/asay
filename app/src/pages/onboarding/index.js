import R from 'ramda'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PreferenceList from '../preferences/PreferenceList'
import { ArrowRight } from 'react-feather';

class Onboarding extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0)
    await fetch('/api/user/onboarding',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + window.sessionStorage.authToken
        }
      }
    )
  };

  render () {
    const workload = R.sum(R.pluck('workload')(R.filter(preferenceList => preferenceList.preference === true)(this.props.preferenceList)));
    return(
      <div className="mw8 center w-100 flex-auto">
        <h1 className="f3 tc mt4 mt5-l mb3">Velkommen</h1>
        <div className="bg-white pa4 ba b--black-10 br1 shadow-6">
          <div className="lh-copy mb4">
            <p>Vi vil gerne hjælpe dig med at navigere i alle de forslag, der bliver fremsat i Folketinget. Vælg de politiske emner der interesserer dig, så samler vi et overblik til dig. Du kan altid opdatere dine præferencer samt gennemsøge alle forslag.</p>
            <p>Med dine nuværende præferencer, skal du i gennemsnit tage stilling til ca. <b>{workload}</b> forslag om året. Det svarer til <b>{Math.ceil(workload / 34, 0) }</b> om ugen.</p>
          </div>
          <PreferenceList updateState={this.props.updateState} preferenceList={this.props.preferenceList}/>
        </div>
        <div className="tc mt3">
          <Link to="/" className="db dib-ns white bg-dark-blue hover-bg-blue pv2 ph4 ba b--black-10 br1 shadow-6"><ArrowRight className="mr2"/>Videre til lovforslagene</Link>
        </div>
      </div>
    );
  }
}

export default Onboarding;
