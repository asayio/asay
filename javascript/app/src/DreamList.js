import React, { Component } from 'react';

class DreamList extends Component {
  constructor() {
    super();
    this.state = {
      dreamList: []
    };
  }

  async componentDidMount() {
    const response = await fetch('/api/dreams');
    const dreamList = await response.json();
    this.setState({dreamList});
  }

  render() {
    return (
    <div className="DreamList">
      <h3>All my dreams</h3>
      <ul>
      {this.state.dreamList.map(dream =>
        <li key={dream}>{dream}</li>
      )}
      </ul>
    </div>
    );
  }
}

export default DreamList;
