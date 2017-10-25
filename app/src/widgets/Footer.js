import React, { Component } from 'react';
import { Circle, Github, Edit3, CreditCard } from 'react-feather'

class Footer extends Component {
  render () {
    return (
      <footer className="mw8 center tc mt5 mb3">
        <a target="_initiativet" href="https://initiativet.net" className="db dib-ns black-50 hover-black-70 mv3 mh2"><Edit3 className="black-70 mr2"/>Giv en vælgererklæring</a>
        <a target="_sponsor" href="https://initiativet.net/sponsor" className="db dib-ns black-50 hover-black-70 mv3 mh2"><CreditCard className="black-70 mr2"/>Bliv sponsor</a>
        <a target="_asay" href="https://asay.io" className="db dib-ns black-50 hover-black-70 mv3 mh2"><Circle className="black-70 mr2"/>Kodet af Asay</a>
        <a target="_github" href="https://github.com/asayio/asay" className="db dib-ns black-50 hover-black-70 mv3 mh2"><Github className="black-70 mr2"/>Find os på Github</a>
      </footer>
    )
  }
}

export default Footer;
