import R from 'ramda';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PreferenceList from '../../components/preferenceList';
import { ArrowLeft } from 'react-feather';

class Preferences extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const workload = R.sum(
      R.pluck('workload')(R.filter(preferenceList => preferenceList.preference === true)(this.props.preferenceList))
    );
    return (
      <div>
        <h1>Præferencer</h1>
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
            <ArrowLeft />Tilbage til lovforslagene
          </Link>
        </div>
      </div>
    );
  }
}

export default Preferences;
