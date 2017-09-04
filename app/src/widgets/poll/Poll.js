import React, { Component } from 'react';
import CountDown from '../CountDown';
import PollHistory from './PollHistory'
import PollCurrent from './PollCurrent'

class Poll extends Component {
  render() {
    const proposal = this.props.proposal
    const poll = this.props.poll

    // Styling
    const currentPollClass = "pt2 pb3 ph3 ba b--light-gray br2 mv3 lh-solid ma1"
    const pastPollClass = "pt2 pb3 ph3 ba b--red br2 mv3 lh-solid ma1"

    return (
      <div className={poll.current === false ? pastPollClass : currentPollClass }>
        <h2>{poll.status}</h2>
        <div className="f4 normal ttl small-caps dib mr3 silver">
          <CountDown dueDate = {poll.due} />
        </div>
        <h4>Deltagelse: {poll.platformvotesfor + poll.platformvotesagainst} stemmer</h4>
        {poll.uservote === null ? <nothing/> : <p>Du har stemt {poll.uservote === true ? "for" : "imod"}</p>}
        <div className="poll">
          {poll.current === true ?
            <PollCurrent poll = {poll} proposal = {proposal}/>
            :<PollHistory poll = {poll}/>}
        </div>
      </div>
    );
  }
}

export default Poll;
