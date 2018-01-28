import React, { Component } from 'react';
import Login from '../loginBtn';
import Logout from '../logoutBtn';
import { Link } from 'react-router-dom';
import NavItem from './navItem';
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
        <nav className="fixed pin-t pin-x z-10 bg-white border-b border-grey-lighter shadow select-none p-2">
          <div className="flex max-w-xl mx-auto">
            <div className="absolute pin-y flex items-center -ml-6">
              <div className="h-4 w-4 bg-teal rounded-full" />
            </div>
            <div className="flex-grow flex">
              <NavItem to="/proposals" text="Forslag" />
              <NavItem to="/insights" text="Historik" />
            </div>
            <div className="flex relative">
              <SearchBar
                formClass="hidden sm:block"
                inputClass="w-64 border border-grey-lightest rounded-l-sm p-2"
                btnClass="inline-block bg-grey-lightest rounded-r-sm p-2 mr-2"
                updateState={this.props.updateState}
              />
              <span
                className={
                  this.state.showDropDown
                    ? 'inline-block font-bold text-white bg-grey-darkest rounded-sm p-2'
                    : 'inline-block font-bold bg-grey-lightest rounded-sm p-2'
                }
                onClick={() => this.setState({ showDropDown: !this.state.showDropDown })}
                id="person">
                {initials}
              </span>
              <div
                className={
                  this.state.showDropDown
                    ? 'absolute pin-t pin-r w-screen sm:w-auto min-w-40 pl-4 pt-2 mt-9'
                    : 'hidden absolute pin-t pin-r w-screen sm:w-auto min-w-40 pl-4 pt-2 mt-9'
                }
                id="personal-menu">
                <div className="text-white bg-grey-darkest rounded-sm">
                  <span className="block border-b border-grey-darker p-4">{user.firstname + ' ' + user.lastname}</span>
                  <ul className="list-reset p-2">
                    <li>
                      <Link
                        className="block hover:bg-black rounded-sm p-2"
                        to="/preferences"
                        onClick={() => this.setState({ showDropDown: false })}
                        onMouseDown={e => e.preventDefault()}>
                        Præferencer
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block hover:bg-black rounded-sm p-2"
                        to="/settings"
                        onClick={() => this.setState({ showDropDown: false })}
                        onMouseDown={e => e.preventDefault()}>
                        Indstillinger
                      </Link>
                    </li>
                    <li>
                      <Logout
                        className="block w-full text-left hover:bg-black rounded-sm p-2"
                        history={this.props.history}
                      />
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
        <nav className="fixed pin-t pin-x z-10 bg-white border-b border-grey-lighter select-none p-2">
          <div className="flex max-w-xl mx-auto">
            <div className="absolute pin-y flex items-center -ml-6">
              <div className="h-4 w-4 bg-teal rounded-full" />
            </div>
            <div className="flex-grow flex">
              <NavItem to="/proposals" text="Forslag" />
            </div>
            <div className="flex relative">
              <SearchBar
                formClass="hidden sm:block"
                inputClass="w-64 border border-grey-lightest rounded-l-sm p-2"
                btnClass="inline-block bg-grey-lightest rounded-r-sm p-2 mr-2"
                updateState={this.props.updateState}
              />
              <Login
                type="login"
                className="font-bold bg-grey-lightest rounded-sm p-2"
                onClick={() => this.setState({ showDropDown: !this.state.showDropDown })}
                id="person"
              />
            </div>
          </div>
        </nav>
      );
    }
  }
}

export default Nav;
