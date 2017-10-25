import R from 'ramda'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PreferenceList from './PreferenceList'
import { CheckSquare } from 'react-feather';

class Preferences extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    const workload = R.sum(R.pluck('workload')(R.filter(preferenceList => preferenceList.preference === true)(this.props.preferenceList)));
    return(
      <div className="mw8 center w-100 flex-auto">
        <h1 className="f3 tc mt5 mb3">Dine præferencer</h1>
        <div  className="bg-white pa4 ba b--black-10 br1 shadow-6">
          <div className="lh-copy mb4">
            <p>Nedenfor kan du vælge, hvilke emner du vil følge med i.</p>
            <p>Med dine nuværende præferencer, skal du i gennemsnit tage stilling til ca. <b>{workload}</b> forslag om året. Det svarer til <b>{Math.ceil(workload / 52, 0) }</b> om ugen.</p>
          </div>
          <PreferenceList updateState={this.props.updateState} preferenceList={this.props.preferenceList}/>
        </div>
        <div className="tc mt3">
          <Link to="/" className="db dib-ns b white bg-dark-blue hover-bg-blue pv2 ph4 ba b--black-10 br1 shadow-6"><CheckSquare className="mr2"/>Gå til lovforslag</Link>
        </div>
      </div>
    );
  }
}

export default Preferences;
