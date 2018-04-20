import React, { Component } from 'react';
import { ThumbsUp, ThumbsDown } from 'react-feather';

class ProposalResults extends Component {
  render() {
    const results = this.props.results;
    // const partyDistribution = results.partyDistribution;
    const totalNumberOfVotes = results.for + results.against + results.blank;
    function getVoteBarWidth(votes) {
      return { width: votes / totalNumberOfVotes * 100 + '%' };
    }
    return (
      <div className="bg-white border border-grey-lighter rounded-sm shadow m-2">
        <h3 className="text-center border-b border-grey-lighter p-2 mb-0">{this.props.titel}</h3>
        <div className="flex items-end px-4 pt-4 pb-6">
          <ThumbsUp className={(results.for < results.against && 'opacity-50') + ' text-green text-2xl mb-1 mr-4'} />
          <div className="flex-auto">
            <div className="flex mb-2">
              {!!results.for && (
                <span className="text-center font-bold" style={getVoteBarWidth(results.for)}>
                  {Math.round(results.for / totalNumberOfVotes * 100)}%
                  <span className="block sm:inline-block text-grey font-normal sm:ml-2">({results.for})</span>
                </span>
              )}
              {!!results.blank && (
                <span className="text-center font-bold" style={getVoteBarWidth(results.blank)}>
                  {Math.round(results.blank / totalNumberOfVotes * 100)}%
                  <span className="block sm:inline-block text-grey font-normal sm:ml-2">({results.blank})</span>
                </span>
              )}
              {!!results.against && (
                <span className="text-center font-bold" style={getVoteBarWidth(results.against)}>
                  {Math.round(results.against / totalNumberOfVotes * 100)}%
                  <span className="block sm:inline-block text-grey font-normal sm:ml-2">({results.against})</span>
                </span>
              )}
            </div>
            <div className="flex text-center text-white font-bold leading-loose rounded-sm overflow-hidden">
              {!!results.for && (
                <div
                  className={(results.for < results.against && 'opacity-50') + ' bg-green'}
                  style={getVoteBarWidth(results.for)}>
                  For
                </div>
              )}
              {!!results.blank && (
                <div
                  className={(results.for | (results.against > results.blank) && 'opacity-50') + ' bg-grey'}
                  style={getVoteBarWidth(results.blank)}>
                  Blanke
                </div>
              )}
              {!!results.against && (
                <div
                  className={(results.for > results.against && 'opacity-50') + ' bg-red'}
                  style={getVoteBarWidth(results.against)}>
                  Imod
                </div>
              )}
            </div>
          </div>
          <ThumbsDown className={(results.for > results.against && 'opacity-50') + ' text-red text-2xl mb-1 ml-4'} />
        </div>
        {/* We need to format the text correctly before showing this */}
        {/* {!!partyDistribution && <div className="party-distribution">{partyDistribution}</div>} */}
      </div>
    );
  }
}

export default ProposalResults;
