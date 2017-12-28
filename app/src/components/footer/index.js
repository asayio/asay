import React, { Component } from 'react';
import { Github, Edit3, CreditCard, Slack } from 'react-feather';

class Footer extends Component {
  render() {
    return (
      <footer>
        <a target="_initiativet" href="https://initiativet.dk">
          <Edit3 />Giv en vælgererklæring
        </a>
        <a target="_sponsor" href="https://initiativet.dk/sponsor">
          <CreditCard />Bliv sponsor
        </a>
        <a
          target="_slack"
          href="https://join.slack.com/t/initiativetdk/shared_invite/enQtMjkxNzMyNTIwNDY5LWYzY2UzN2E3NjQwN2FhYTdiM2NjMDk3ODZhYjUwNjNiZTYxNzM3NTc5MDdlNmRlOGY0MGZlN2U5NDM1ZWZjYjc">
          <Slack />Skriv med os på Slack
        </a>
        <a target="_github" href="https://github.com/asayio/asay">
          <Github />Find os på Github
        </a>
      </footer>
    );
  }
}

export default Footer;
