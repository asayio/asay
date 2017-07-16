import React, { Component } from 'react';
import './poll.css';

class Poll extends Component {

  render() {
    const parliamentVotesAgainst = this.props.poll.parliamentvotesagainst || 0;
    const parliamentVotesFor = this.props.poll.parliamentvotesfor || 0;
    const platformVotesAgainst = this.props.poll.platformvotesagainst || 0;
    const platformVotesFor = this.props.poll.platformvotesfor || 0;
    console.log(parliamentVotesAgainst, parliamentVotesFor, platformVotesAgainst, platformVotesFor);
    const totalValueParliament = parliamentVotesAgainst + parliamentVotesFor;
    const totalValuePlatform = platformVotesAgainst + platformVotesFor;
    const relativeAgainstParliament = Math.floor(parliamentVotesAgainst / totalValueParliament * 100);
    const relativeForParliament = Math.floor(parliamentVotesFor / totalValueParliament * 100);
    const relativeAgainstPlatform = Math.floor(platformVotesAgainst / totalValuePlatform * 100);
    const relativeForPlatform = Math.floor(platformVotesFor / totalValuePlatform * 100);
    const barHeightParliamentAgainst = {height: relativeAgainstParliament + '%'}
    const barHeightParliamentFor = {height: relativeForParliament + '%'}
    const barHeightPlatformAgainst = {height: relativeAgainstPlatform + '%'}
    const barHeightPlatformFor = {height: relativeForPlatform + '%'}

    return (
      <div className = 'poll'>
        <div className = 'section'>
          <h4>
            Parliament
          </h4>
          <div className = 'bars'>
            <div className = 'bar-container'>
              <span style = {barHeightParliamentAgainst}>
                {relativeAgainstParliament}
              </span>
            </div>
            <div className = 'bar-container'>
              <span style = {barHeightParliamentFor}>
                {relativeForParliament}
              </span>
            </div>
          </div>
          <div>
            <span>
              for
            </span>
            <span>
              against
            </span>
          </div>
        </div>
        <div className = 'section'>
          <h4>
            Users
          </h4>
          <div className = 'bars'>
            <div className = 'bar-container'>
              <span style = {barHeightPlatformAgainst}>
                {relativeAgainstPlatform}
              </span>
            </div>
            <div className = 'bar-container'>
              <span style = {barHeightPlatformFor}>
                {relativeForPlatform}
              </span>
            </div>
          </div>
          <div>
            <span>
              for
            </span>
            <span>
              against
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Poll;
