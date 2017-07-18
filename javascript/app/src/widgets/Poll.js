import React, { Component } from 'react';
import CountDown from '../widgets/CountDown';
import './poll.css';
import {
  Link
} from 'react-router-dom';

// This component could use some refactoring
// There is also an issue with handling 0

class Poll extends Component {

  render() {
    const proposalid = this.props.proposal.id
    const poll = this.props.poll

    // Graphs
    const parliamentVotesAgainst = poll.parliamentvotesagainst || 0;
    const parliamentVotesFor = poll.parliamentvotesfor || 0;
    const platformVotesAgainst = poll.platformvotesagainst || 0;
    const platformVotesFor = poll.platformvotesfor || 0;
    const totalValueParliament = parliamentVotesAgainst + parliamentVotesFor;
    const totalValuePlatform = platformVotesAgainst + platformVotesFor;
    const relativeAgainstParliament = Math.floor(parliamentVotesAgainst / totalValueParliament * 100) || 0;
    const relativeForParliament = Math.floor(parliamentVotesFor / totalValueParliament * 100) || 0;
    const relativeAgainstPlatform = Math.floor(platformVotesAgainst / totalValuePlatform * 100) || 0;
    const relativeForPlatform = Math.floor(platformVotesFor / totalValuePlatform * 100) || 0;
    const barHeightParliamentAgainst = {height: relativeAgainstParliament + '%'}
    const barHeightParliamentFor = {height: relativeForParliament + '%'}
    const barHeightPlatformAgainst = {height: relativeAgainstPlatform + '%'}
    const barHeightPlatformFor = {height: relativeForPlatform + '%'}

    // Styling
    const currentPollClass = "pt2 pb3 ph3 ba b--light-gray br2 mv3 lh-solid ma1"
    const pastPollClass = "pt2 pb3 ph3 ba b--red br2 mv3 lh-solid ma1"

    return (
      <div className={poll.current === false ? pastPollClass : currentPollClass }>
        <h2>{poll.status}</h2>
        <h4>Antal stemmer: {totalValuePlatform}</h4>
        {poll.current === true ?
        <div>
          <CountDown dueDate = {poll.due} />
          <Link to={`${proposalid}/vote`} target="_blank">
            <button>Gå til stemmeboks</button>
          </Link>
        </div> :
        <div className="poll">
          <p><i>Afstemning er afsluttet.</i></p>
          <div className = 'section'>
            <h4>Parliament</h4>
            <div className = 'bars'>
              <div className = 'bar-container'>
                <div style = {barHeightParliamentAgainst}></div>
              </div>
              <div className = 'bar-container'>
                <div style = {barHeightParliamentFor}></div>
              </div>
              <div className = 'label'>
                <div>{relativeAgainstParliament} against</div>
                <div>{relativeForParliament} for</div>
              </div>
            </div>
          </div>
          <div className = 'section'>
            <h4>Users</h4>
            <div className = 'bars'>
              <div className = 'bar-container'>
                <div style = {barHeightPlatformAgainst}></div>
              </div>
              <div className = 'bar-container'>
                <div style = {barHeightPlatformFor}></div>
              </div>
            </div>
            <div className = 'label'>
              <div>{relativeAgainstPlatform} against</div>
              <div>{relativeForPlatform} for</div>
            </div>
          </div>
        </div>}
      </div>
    );
  }
}

export default Poll;
