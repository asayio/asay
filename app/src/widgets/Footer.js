import React, { Component } from 'react';
import { Github, Edit3, CreditCard } from 'react-feather';

class Footer extends Component {
  render() {
    return (
      <footer className="mw8 center tc mv3 mt4-ns">
        <a target="_initiativet" href="https://initiativet.net" className="db dib-ns black-50 hover-black-70 ma2">
          <Edit3 className="black-70 mr2" />Giv en vælgererklæring
        </a>
        <a target="_sponsor" href="https://initiativet.net/sponsor" className="db dib-ns black-50 hover-black-70 ma2">
          <CreditCard className="black-70 mr2" />Bliv sponsor
        </a>
        <a target="_github" href="https://github.com/asayio/asay" className="db dib-ns black-50 hover-black-70 ma2">
          <Github className="black-70 mr2" />Find os på Github
        </a>
      </footer>
    );
  }
}

export default Footer;
