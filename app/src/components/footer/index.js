import React, { Component } from 'react';
import { Github, Edit3, CreditCard, Slack } from 'react-feather';

class Footer extends Component {
  render() {
    return (
      <footer className="mw8 center tc mv3 mt4-ns">
        <a target="_initiativet" href="https://initiativet.dk" className="db dib-ns black-50 hover-black-70 ma2">
          <Edit3 className="black-70 mr2" />Giv en vælgererklæring
        </a>
        <a target="_sponsor" href="https://initiativet.dk/sponsor" className="db dib-ns black-50 hover-black-70 ma2">
          <CreditCard className="black-70 mr2" />Bliv sponsor
        </a>
        <a
          target="_slack"
          href="https://join.slack.com/t/initiativetdk/shared_invite/enQtMjkxNzMyNTIwNDY5LWYzY2UzN2E3NjQwN2FhYTdiM2NjMDk3ODZhYjUwNjNiZTYxNzM3NTc5MDdlNmRlOGY0MGZlN2U5NDM1ZWZjYjc"
          className="db dib-ns black-50 hover-black-70 ma2">
          <Slack className="black-70 mr2" />Skriv med os på Slack
        </a>
        <a target="_github" href="https://github.com/asayio/asay" className="db dib-ns black-50 hover-black-70 ma2">
          <Github className="black-70 mr2" />Find os på Github
        </a>
      </footer>
    );
  }
}

export default Footer;
