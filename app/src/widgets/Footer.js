import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Slack, Github, CreditCard, Command, Circle } from 'react-feather'

class Footer extends Component {
  render () {
    return (
      <footer>
        <div>
          <a href="https://github.com/asayio/asay"><Github/>Help us improve</a>
          <a href="https://join.slack.com/t/asay/shared_invite/enQtMjUyNjQxODYxNjM0LTgzNWFkZTc5ZjZlNTdiNTlkMjhjMzdkOTUyMTg0NzRkNTRjNzhhZjVmMjQwMzJjYWUwYThmYWVkYTY1MzZlMzk"><Slack/>Join the conversation</a>
          <a href="https://initiativet.net/sponsor"><CreditCard/>Sponsor the project</a>
        </div>
      </footer>
    )
  }
}

export default Footer;
