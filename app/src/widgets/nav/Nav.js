import React, { Component } from 'react';
import Login from '../auth/Login.js';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
import { openDropDown } from './dropdown.js';
import './nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className="fixed top-0 left-0 right-0 z-999 bg-white bb b--black-10 shadow-6 no-select pv2 ph3">
        {window.sessionStorage.authToken ? (
          <div className="relative mw8 center flex">
            <div className="absolute top-0 bottom-0 left--2 flex items-center">
              <div className="h1 w1 bg-i-green br-100" />
            </div>
            <div className="flex-auto flex items-center">
              <Link to="/" className="b hover-bg-near-white br1 pa2" onMouseDown={e => e.preventDefault()}>
                Forslag
              </Link>
            </div>
            <div className="items-center relative dn flex-ns">
              <span id="person-ns" className="b bg-near-white br1 pa2">
                {window.sessionStorage.firstname.charAt(0) + window.sessionStorage.lastname.charAt(0)}
              </span>
              <div id="personal-menu-ns" className="absolute top-2 right-0 pt2">
                <ul className="list white bg-black-80 br1 pv1 ph2 ma0">
                  <li className="db cursor-default nowrap bb b--white-10 pt1 pb2 ph2 mv1">
                    {window.sessionStorage.firstname + ' ' + window.sessionStorage.lastname}
                  </li>
                  <li>
                    <Link
                      to="/preferences"
                      className="db hover-bg-black br1 nowrap pv1 ph2 mv1"
                      onMouseDown={e => e.preventDefault()}>
                      Præferencer
                    </Link>
                  </li>
                  <li>
                    <Logout history={this.props.history} className="db hover-bg-black br1 nowrap pv1 ph2 mv1" />
                  </li>
                </ul>
              </div>
            </div>
            <div className="items-center relative flex dn-ns">
              <span id="person" className="b bg-near-white br1 pa2" onClick={openDropDown}>
                {window.sessionStorage.firstname.charAt(0) + window.sessionStorage.lastname.charAt(0)}
              </span>
              <div id="personal-menu" className="absolute top-2 right-0 pt2 dn">
                <ul className="list white bg-black-80 br1 pv1 ph2 ma0">
                  <li className="db cursor-default nowrap bb b--white-10 pt2 pb3 ph2 mv2">
                    {window.sessionStorage.firstname + ' ' + window.sessionStorage.lastname}
                  </li>
                  <li>
                    <Link
                      to="/preferences"
                      className="db hover-bg-black br1 nowrap pa2 mv2"
                      onMouseDown={e => e.preventDefault()}>
                      Præferencer
                    </Link>
                  </li>
                  <li>
                    <Logout history={this.props.history} className="db hover-bg-black br1 nowrap pa2 mv2" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative mw8 center flex">
            <div className="absolute top-0 bottom-0 left--2 flex items-center">
              <div className="h1 w1 bg-i-green br-100" />
            </div>
            <div className="flex-auto flex items-center">
              <span to="/" className="b ttl">
                Initiativet<span className="i-green">.</span>
              </span>
            </div>
            <div className="flex items-center">
              <Login className="pointer white bg-dark-blue hover-bg-blue br1 pv2 ph3" type="login" />
            </div>
          </div>
        )}
      </nav>
    );
  }
}

export default Nav;
