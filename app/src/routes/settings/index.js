import React, { Component } from 'react';
import SettingsList from '../../components/settingsList';

class Settings extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="flex-auto px-2">
        <div className="max-w-xl mx-auto">
          <h1>Indstillinger</h1>
          <div className="bg-white border border-grey-lighter rounded-sm shadow px-4 md:px-8">
            <SettingsList user={this.props.user} updateState={this.props.updateState} />
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
