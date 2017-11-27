import React, { Component } from 'react';
import Login from '../auth/Login.js';
import Logout from '../auth/Logout.js';
import { Link } from 'react-router-dom';
import './nav.css';
import { openBurgerMenu, closeBurgerMenu } from './burgerMenu';
import { Home, User, ChevronDown, Menu, X } from 'react-feather';

class Nav extends Component {
  render() {
    return (
      <nav className="bg-white bb b--black-10 shadow-6 pa3">
        <div className="nav-container mw8 center lh-2 flex">
          <div className="flex-auto">
            <Link to="/" className="merriweather black-90 b ttl">
              Initiativet<span className="i-green">.</span>
            </Link>
          </div>
          {window.sessionStorage.authToken ? (
            <div>
              <ul className="regular-menu dn db-ns list ma0 pa0">
                <li className="dib pr3 br b--black-10">
                  <Link to="/" className="black-90">
                    <Home className="mr2" />Hjem
                  </Link>
                </li>
                <li className="dib pl3 cursor-default">
                  <User className="mr2" />
                  {window.sessionStorage.firstname + ' ' + window.sessionStorage.lastname}
                  <ChevronDown className="chevron i-green ml1" />
                  <ul className="list ma0 ph0 pv2 bg-white ba b--black-10 br1 shadow-6">
                    <li className="lh-solid ph3 pv2">
                      <Link to="/preferences" className="black-90">
                        Præferencer
                      </Link>
                    </li>
                    <li className="lh-solid ph3 pv2">
                      <Logout history={this.props.history} className="pointer black-90" />
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="burger-menu dn-ns tr">
                <Menu className="pointer f3" id="menu-icon" onClick={openBurgerMenu} />
                <X className="pointer f3 dn" id="close-icon" onClick={closeBurgerMenu} />
                <ul className="list ma0 pa0 pt2 dn" id="burger-list">
                  <li className="lh-copy pv2">
                    <Link to="/" className="black-90" onClick={closeBurgerMenu}>
                      Hjem
                    </Link>
                  </li>
                  <li className="lh-copy pv2">
                    <Link to="/preferences" className="black-90" onClick={closeBurgerMenu}>
                      Præferencer
                    </Link>
                  </li>
                  <li className="lh-copy pv2">
                    <Logout history={this.props.history} className="pointer black-90" onClick={closeBurgerMenu} />
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex-auto tr">
              <Login icon="LogIn" iconClass="mr2" className="dib pointer white bg-dark-blue hover-bg-blue ba b--black-90 br1 ph3" type="login" />
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default Nav;
