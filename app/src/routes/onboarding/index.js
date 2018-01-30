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
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Velkommen</h1>
          <div className="text-center mb-8">
            <p className="mx-auto">
              Vi vil gerne hjælpe dig med at navigere i alle de forslag, der bliver fremsat i Folketinget.
            </p>
            <p className="mx-auto">Vælg de politiske emner der interesserer dig, så samler vi et overblik til dig.</p>
          </div>
          <div className="flex flex-wrap md:flex-no-wrap md:flex-row-reverse -mx-1">
            <div className="w-full md:w-64 md:flex-no-shrink mx-1 mb-2">
              <div className="md:sticky md:top-15">
                <div className="bg-white text-center border border-grey-lighter rounded-sm shadow px-4 pt-4 pb-1">
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
            <div className="w-full bg-white border border-grey-lighter rounded-sm shadow px-4 md:px-8 mx-1">
              <PreferenceList updateState={this.props.updateState} preferenceList={this.props.preferenceList} />
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/proposals" className="btn btn-white w-full sm:w-auto">
              <ArrowRight className="mr-2" />Videre til lovforslagene
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Onboarding;
