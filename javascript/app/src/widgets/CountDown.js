import React, { Component } from 'react';

class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {now: new Date().getTime()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      now: new Date().getTime()
    });
  }

  render() {
    const dueDate = new Date(this.props.dueDate);
    const distance = dueDate - this.state.now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var counter = 'Expired';
    if (distance > 0) {
      counter = days + ':' + hours + ':' + minutes;
    }
    return (
      <span>
        {counter}
      </span>
    );
  }
}

export default CountDown;
