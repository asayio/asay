import React, { Component } from 'react';
import Login from '../loginBtn';
import Logout from '../logoutBtn';
import { Link } from 'react-router-dom';
import SearchBar from '../searchBar';
import './style.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showDropDown: false
    };
  }
  render() {
    const user = this.props.user;
    if (user && user.firstname) {
      const initials = user.firstname.charAt(0) + user.lastname.charAt(0);
      return (
        <nav>
          <div>
            <div>
              <Link to="/proposals" onMouseDown={e => e.preventDefault()}>
                Forslag
              </Link>
              <Link to="/insights" onMouseDown={e => e.preventDefault()}>
                Historik
              </Link>
            </div>
            <div>
              <SearchBar updateState={this.props.updateState} inputClass="" btnClass="" />
              <span id="person-ns">{initials}</span>
              <div id="personal-menu-ns">
                <div>
                  <span>{user.firstname + ' ' + user.lastname}</span>
                  <ul>
                    <li>
                      <Link to="/preferences" onMouseDown={e => e.preventDefault()}>
                        Præferencer
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" onMouseDown={e => e.preventDefault()}>
                        Indstillinger
                      </Link>
                    </li>
                    <li>
                      <Logout history={this.props.history} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <span id="person" onClick={() => this.setState({ showDropDown: !this.state.showDropDown })}>
                {initials}
              </span>
              <div
                id="personal-menu"
                className={this.state.showDropDown ? '' : ''}
                onClick={() => this.setState({ showDropDown: !this.state.showDropDown })}>
                <div>
                  <span>{user.firstname + ' ' + user.lastname}</span>
                  <ul>
                    <li>
                      <Link to="/preferences" onMouseDown={e => e.preventDefault()}>
                        Præferencer
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" onMouseDown={e => e.preventDefault()}>
                        Indstillinger
                      </Link>
                    </li>
                    <li>
                      <Logout history={this.props.history} />
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
        <nav>
          <div>
            <Link to="/">
              <div />
            </Link>
            <div>
              <Link to="/proposals" onMouseDown={e => e.preventDefault()}>
                Forslag
              </Link>
            </div>
            <div>
              <SearchBar updateState={this.props.updateState} inputClass="" btnClass="" />
            </div>
            <div>
              <Login type="login" />
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default Nav;
