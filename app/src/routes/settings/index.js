import React, { Component } from 'react';
import SettingsList from '../../components/settingsList';

class Settings extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="">
        <h1 className="">Indstillinger</h1>
        <SettingsList user={this.props.user} updateState={this.props.updateState} />
      </div>
    );
  }
}

export default Settings;
