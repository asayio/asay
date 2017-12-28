import React, { Component } from 'react';
import SettingsList from '../../components/settingsList';

class Settings extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <h1>Indstillinger</h1>
        <div>
          <SettingsList user={this.props.user} updateState={this.props.updateState} />
        </div>
      </div>
    );
  }
}

export default Settings;
