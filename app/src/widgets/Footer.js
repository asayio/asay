import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Slack, Github, CreditCard, Command, Circle } from 'react-feather'

class Footer extends Component {
  render () {
    return (
      <footer>
        <div>
          <a target="_github" href="https://github.com/asayio/asay"><Github/>Hjælp med udviklingen</a>
          <a target="_slack" href="https://join.slack.com/t/asay/shared_invite/enQtMjUyNjQxODYxNjM0LTgzNWFkZTc5ZjZlNTdiNTlkMjhjMzdkOTUyMTg0NzRkNTRjNzhhZjVmMjQwMzJjYWUwYThmYWVkYTY1MzZlMzk"><Slack/>Tag del i fælleskabet</a>
          <a target="_initiativet" href="https://initiativet.net/sponsor"><CreditCard/>Bliv sponsor</a>
        </div>
      </footer>
    )
  }
}

export default Footer;
