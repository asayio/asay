import React, { Component } from 'react';
import { ChevronUp, ChevronDown } from 'react-feather';
import postVote from './postVote'
import booleanToInt from './booleanToInt'

class UpDownVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voteresult: this.props.uservote,
      score: this.props.score
    };
    this.onVote = this.onVote.bind(this);
  }

  onVote(result) {
    const voteresult = result === this.state.voteresult ? null : result
    const score = this.props.score - booleanToInt(this.props.uservote) + booleanToInt(voteresult)
    this.setState({voteresult: voteresult, score: score});
    postVote (this.props.type, this.props.id, voteresult)
  }

  render() {
    const userVoteClass = "f3 link dark-pink hover-hot-pink ttl"
    const voteClass = "f3 gray hover-dark-gray ttl"
    return (
      <div>
        <ChevronUp className={this.state.voteresult === true ? userVoteClass : voteClass } onClick={() => this.onVote(true)}/>
          <div>{this.state.score}</div>
        <ChevronDown className={this.state.voteresult === false ? userVoteClass : voteClass } onClick={() => this.onVote(false)}/>
      </div>
    );
  }
}

export default UpDownVote;
