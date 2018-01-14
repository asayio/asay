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
          {!!results.for &&
            <span className={'for-bar ' + (results.for > results.against && 'winner')} style={getVoteBarWidth(results.for)}>
              <div>
                <span>
                  {results.for}
                </span>
                <span className='vote-results-percentage'>
                  {Math.round((results.for / totalNumberOfVotes) * 100)}%
                </span>
              </div>
            </span>
          }
          {!!results.blank &&
            <span className='blank-bar' style={getVoteBarWidth(results.blank)}>
              <div>
                <span>
                  {results.blank}
                </span>
                <span className='vote-results-percentage'>
                  {Math.round((results.blank / totalNumberOfVotes) * 100)}%
                </span>
              </div>
            </span>
          }
          {!!results.against &&
            <span className={'against-bar ' + (results.against > results.for && 'winner')} style={getVoteBarWidth(results.against)}>
              <div>
                <span>
                  {results.against}
                </span>
                <span className='vote-results-percentage'>
                  {Math.round((results.against / totalNumberOfVotes) * 100)}%
                </span>
              </div>
            </span>
          }
        </div>
        <ThumbsDown></ThumbsDown>
      </div>
    );
  }
}

export default VoteResults;
