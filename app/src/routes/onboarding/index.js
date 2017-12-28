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
      <div>
        <h1>Velkommen</h1>
        <div>
          <p>Vi vil gerne hjælpe dig med at navigere i alle de forslag, der bliver fremsat i Folketinget.</p>
          <p>Vælg de politiske emner der interesserer dig, så samler vi et overblik til dig. </p>
        </div>
        <div>
          <div>
            <div>
              <PreferenceList updateState={this.props.updateState} preferenceList={this.props.preferenceList} />
            </div>
          </div>
          <div>
            <div>
              <div>
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
        <div>
          <Link to="/proposals">
            <ArrowRight />Videre til lovforslagene
          </Link>
        </div>
      </div>
    );
  }
}

export default Onboarding;
