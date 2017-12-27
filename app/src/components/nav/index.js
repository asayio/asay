import React, { Component } from 'react';
import Login from '../loginBtn';
import Logout from '../logoutBtn';
import { Link } from 'react-router-dom';
import { openDropDown } from './dropdown';
import SearchBar from '../searchBar';
import './index.css';

class Nav extends Component {
  render() {
    const user = this.props.user;
    if (user && user.firstname) {
      const initials = user.firstname.charAt(0) + user.lastname.charAt(0);
      return (
        <nav className="fixed top-0 left-0 right-0 z-999 bg-white bb b--black-10 shadow-6 no-select pa2">
          <div className="relative mw8 center flex">
            <div className="absolute top-0 bottom-0 left--2 flex items-center">
              <div className="h1 w1 bg-i-green br-100" />
            </div>
            <div className="flex-auto flex items-center">
              <Link to="/proposals" className="b hover-bg-near-white br1 pa2 mr2" onMouseDown={e => e.preventDefault()}>
                Forslag
              </Link>
              <Link to="/insights" className="b hover-bg-near-white br1 pa2 mr2" onMouseDown={e => e.preventDefault()}>
                Historik
              </Link>
            </div>
            <div className="items-center relative dn flex-ns">
              <SearchBar
                updateState={this.props.updateState}
                inputClass="clear-sans w5 pa2 bn br--left br2 search-input"
                btnClass="dib bg-near-white br--right br2 pa2 mr2"
              />
              <span id="person-ns" className="b bg-near-white br1 pa2">
                {initials}
              </span>
              <div id="personal-menu-ns" className="absolute top-2 right-0 pt2">
                <div className="white bg-dark-gray br1">
                  <span className="db nowrap bb b--white-10 pa3">{user.firstname + ' ' + user.lastname}</span>
                  <ul className="list pa1 ma0">
                    <li className="pa1">
                      <Link
                        to="/preferences"
                        className="db hover-bg-near-black br1 nowrap pa2"
                        onMouseDown={e => e.preventDefault()}>
                        Præferencer
                      </Link>
                    </li>
                    <li className="pa1">
                      <Link
                        to="/settings"
                        className="db hover-bg-near-black br1 nowrap pa2"
                        onMouseDown={e => e.preventDefault()}>
                        Indstillinger
                      </Link>
                    </li>
                    <li className="pa1">
                      <Logout history={this.props.history} className="db hover-bg-near-black br1 nowrap pa2" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="items-center relative flex dn-ns">
              <span id="person" className="b bg-near-white br1 pa2" onClick={openDropDown}>
                {initials}
              </span>
              <div id="personal-menu" className="absolute top-2 right-0 pt2 dn" onClick={openDropDown}>
                <div className="white bg-dark-gray br1">
                  <span className="db nowrap bb b--white-10 pa3">{user.firstname + ' ' + user.lastname}</span>
                  <ul className="list pa1 ma0">
                    <li className="pa1">
                      <Link
                        to="/preferences"
                        className="db hover-bg-near-black br1 nowrap pa2"
                        onMouseDown={e => e.preventDefault()}>
                        Præferencer
                      </Link>
                    </li>
                    <li className="pa1">
                      <Link
                        to="/settings"
                        className="db hover-bg-near-black br1 nowrap pa2"
                        onMouseDown={e => e.preventDefault()}>
                        Indstillinger
                      </Link>
                    </li>
                    <li className="pa1">
                      <Logout history={this.props.history} className="db hover-bg-near-black br1 nowrap pa2" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className="fixed top-0 left-0 right-0 z-999 bg-white bb b--black-10 shadow-6 no-select pa2">
          <div className="relative mw8 center flex">
            <Link to="/" className="absolute top-0 bottom-0 left--2 flex items-center">
              <div className="h1 w1 bg-i-green br-100" />
            </Link>
            <div className="flex-auto flex items-center">
              <Link to="/proposals" className="b hover-bg-near-white br1 pa2 mr2" onMouseDown={e => e.preventDefault()}>
                Forslag
              </Link>
            </div>
            <div className="items-center relative dn flex-ns">
              <SearchBar
                updateState={this.props.updateState}
                inputClass="clear-sans w5 pa2 bn br--left br2 search-input"
                btnClass="dib bg-near-white br--right br2 pa2 mr2"
              />
            </div>
            <div className="flex items-center">
              <Login className="pointer white bg-dark-blue hover-bg-blue br1 pv2 ph3" type="login" />
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default Nav;
