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
    const totalNumberOfVotes = results.for + results.against + results.blank
    function getVoteBarWidth (votes) {
      return {width: (votes / totalNumberOfVotes) * 100 + "%"}
    }
    return (
      <div className='results'>
        <div className='results-titel'>{this.props.titel}</div>
        <ThumbsUp></ThumbsUp>
        <div className='results-bar'>
          <span className={'for-bar ' + (results.for > results.against && 'winner')} style={getVoteBarWidth(results.for)}><div>{results.for}</div></span>
          <span className='blank-bar' style={getVoteBarWidth(results.blank)}><div>{results.blank}</div></span>
          <span className={'against-bar ' + (results.against > results.for && 'winner')} style={getVoteBarWidth(results.against)}><div>{results.against}</div></span>
        </div>
        <ThumbsDown></ThumbsDown>
      </div>
    );
  }
}

export default VoteResults;
