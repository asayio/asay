import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Circle, Github, Edit3, CreditCard } from 'react-feather'

class Footer extends Component {
  render () {
    return (
      <footer className="mw8 center tc mv4">
        <a target="_asay" href="https://asay.io" className="db dib-ns black-50 hover-black-70 ma2"><Circle/>Kodet som en del af Asay</a>
        <a target="_asay" href="https://github.com/asayio/asay" className="db dib-ns black-50 hover-black-70 ma2"><Github/>Find os på Github</a>
        <a target="_initiativet" href="https://initiativet.net" className="db dib-ns black-50 hover-black-70 ma2"><Edit3 />Giv en vælgererklæring</a>
        <a target="_sponsor" href="https://initiativet.net/sponsor" className="db dib-ns black-50 hover-black-70 ma2"><CreditCard/>Bliv sponsor</a>
      </footer>
    )
  }
}

export default Footer;
