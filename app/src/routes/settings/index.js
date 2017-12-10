import React, { Component } from 'react';
import SettingsList from '../../components/settingsList';

class Settings extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="mw8 center w-100 flex-auto">
        <h1 className="f3 tc mt4 mb3">Indstillinger</h1>
        <div className="bg-white ph4 ba b--black-10 br1 shadow-6">
          <SettingsList user={this.props.user} updateState={this.props.updateState} />
        </div>
      </div>
    );
  }
}

export default Settings;
