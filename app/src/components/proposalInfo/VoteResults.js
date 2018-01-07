import R from 'ramda';
import React, { Component } from 'react';
import {ThumbsUp, ThumbsDown} from 'react-feather';

class VoteResults extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const results = this.props.results;
    const totalNumberOfVotes = results.length
    const forVotes = R.filter(R.propEq('result', true), results).length
    const blankVotes = R.filter(R.propEq('result', null), results).length
    const againtsVotes = R.filter(R.propEq('result', false), results).length
    function getVoteBarWidth (votes) {
      return {width: (votes / totalNumberOfVotes) * 100 + "%"}
    }
    return (
      <div className='results'>
        <div>Folkets afstemning</div>
        <ThumbsUp></ThumbsUp>
        <div className='results-bar'>
          <span className={'for-bar ' + (forVotes > againtsVotes && 'winner')} style={getVoteBarWidth(forVotes)}><div>{forVotes}</div></span>
          <span className='blank-bar' style={getVoteBarWidth(blankVotes)}><div>{blankVotes}</div></span>
          <span className={'against-bar ' + (againtsVotes > forVotes && 'winner')} style={getVoteBarWidth(againtsVotes)}><div>{againtsVotes}</div></span>
        </div>
        <ThumbsDown></ThumbsDown>
      </div>
    );
  }
}

export default VoteResults;
