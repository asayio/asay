import React, { Component } from 'react';
import PreferenceList from './PreferenceList'

class Preferences extends Component {
  constructor() {
    super();
    this.state = {
      workload: '2'
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return(
      <div>
        <h1 className="tc">Dine præferencer</h1>
        <div className="mw8 center bg-white pa4 ba b--black-10 br1 shadow-6">
          <div className="tc mb4">
            <p>Nedenfor kan du vælge, hvilke emner du vil følge med i.</p>
            <p>Med dine nuværende præferencer, skal du i gennemsnit tage stilling til ca. <b>{this.state.workload}</b> forslag om året. Det svarer til <b>{Math.round(this.state.workload / 52, 0) }</b> om ugen.</p>
          </div>
          <PreferenceList updateState={this.props.updateState} preferenceList={this.props.preferenceList}/>
        </div>
      </div>
    );
  }
}

export default Preferences;
