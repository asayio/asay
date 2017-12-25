import R from 'ramda';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PreferenceList from '../../components/preferenceList';
import { ArrowRight } from 'react-feather';

class Onboarding extends Component {
  async componentDidMount() {
    window.scrollTo(0, 0);
    await fetch('/api/user/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.authToken
      }
    });
  }

  render() {
    const workload = R.sum(
      R.pluck('workload')(R.filter(preferenceList => preferenceList.preference === true)(this.props.preferenceList))
    );
    return (
      <div className="mw8 center w-100 flex-auto">
        <h1 className="f3 tc mt4 mb3">Velkommen</h1>
        <div className="lh-copy tc">
          <p>Vi vil gerne hjælpe dig med at navigere i alle de forslag, der bliver fremsat i Folketinget.</p>
          <p>Vælg de politiske emner der interesserer dig, så samler vi et overblik til dig. </p>
        </div>
        <div className="flex flex-wrap">
          <div className="w-100 w-75-l order-last order-0-l">
            <div className="bg-white ph4 ba b--black-10 br1 shadow-6">
              <PreferenceList updateState={this.props.updateState} preferenceList={this.props.preferenceList} />
            </div>
          </div>
          <div className="w-100 w-25-l pl3-l pb3 pb0-l">
            <div className="bg-white pa3 ph4 ph3-l ba b--black-10 br1 shadow-6 sticky-l top-4-l">
              <div className="tc-l lh-copy">
                <p>Her kan du vælge, hvilke emner du vil følge med i.</p>
                <p>
                  Med dine nuværende præferencer, skal du i gennemsnit tage stilling til ca. <b>{workload}</b> forslag
                  om året.
                </p>
                <p>
                  Det svarer til <b>{Math.ceil(workload / 34, 0)}</b> om ugen.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="tc mt3">
          <Link
            to="/proposals"
            className="db dib-ns white bg-dark-blue hover-bg-blue pv2 ph4 ba b--black-10 br1 shadow-6">
            <ArrowRight className="mr2" />Videre til lovforslagene
          </Link>
        </div>
      </div>
    );
  }
}

export default Onboarding;
