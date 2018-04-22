import React, { Component } from 'react';
import R from 'ramda';
import { Link } from 'react-router-dom';
import Login from '../loginBtn';
import Logout from '../logoutBtn';
import MenuItem from './menuItem';
import DropdownItem from './dropdownItem';
import SearchBar from '../searchBar';
import './style.css';

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
  }
  render() {
    const user = this.props.user;
    const candidate = user && R.find(R.propEq('id', user.id), this.props.candidateList);
    const toggleMenu = () => {
      this.setState({ showMenu: !this.state.showMenu });
    };
    return (
      <nav className="fixed pin-t pin-x z-10 bg-white border-b border-grey-lighter shadow select-none p-2">
        <div className="flex max-w-xl mx-auto relative">
          <div className="absolute pin-y flex items-center -ml-8">
            <Link to="/" className="block h-4 w-4 bg-teal rounded-full" />
          </div>
          <div className="hidden md:flex flex-grow flex-no-shrink pr-2">
            <ul className="list-reset -mx-1">
              <MenuItem to="/proposals" itemName="Forslag" />
              <MenuItem to="/projects" itemName="Projekter" />
              <MenuItem to="/candidates" itemName="Kandidater" />
              {user &&
                user.firstname && (
                  <MenuItem to="/insights" itemName="Historik" className="md:border-l md:border-grey-lightest pl-2" />
                )}
            </ul>
          </div>
          <SearchBar
            formClass="flex-auto w-96 flex"
            inputClass="flex-1 w-none appearance-none border border-grey-lightest rounded-l-sm px-2"
            btnClass="flex-none bg-grey-lightest rounded-r-sm p-2 mr-2"
            updateState={this.props.updateState}
          />
          <div className="flex">
            {user && user.firstname ? (
              <div>
                <button
                  className={
                    (this.state.showMenu ? 'text-white bg-grey-darkest' : 'bg-grey-lightest') +
                    ' inline-block leading-tight font-bold rounded-sm relative z-30 p-2'
                  }
                  onClick={toggleMenu}
                  onMouseDown={e => e.preventDefault()}>
                  {user.firstname.charAt(0) + user.lastname.charAt(0)}
                </button>
                <div
                  className={
                    (!this.state.showMenu && 'hidden ') +
                    ' absolute pin-t pin-r w-screen md:w-auto min-w-48 pl-4 pt-2 mt-9 menu-animation'
                  }>
                  <div className="text-white bg-grey-darkest rounded-sm relative z-30">
                    <span className="block border-b border-grey-darker p-4">
                      {user.firstname + ' ' + user.lastname}
                    </span>
                    <ul className="md:hidden list-reset border-b border-grey-darker p-2">
                      <DropdownItem to="/proposals" itemName="Forslag" onClick={toggleMenu} />
                      <DropdownItem to="/projects" itemName="Projekter" onClick={toggleMenu} />
                      <DropdownItem to="/candidates" itemName="Kandidater" onClick={toggleMenu} />
                      {user &&
                        user.firstname && (
                          <DropdownItem
                            to="/insights"
                            itemName="Historik"
                            className="md:border-l md:border-grey-lightest pl-2"
                            onClick={toggleMenu}
                          />
                        )}
                    </ul>
                    <ul className="list-reset border-b border-grey-darker p-2">
                      <DropdownItem to="/projects/mine" itemName="Mine projekter" onClick={toggleMenu} />
                      {candidate && (
                        <DropdownItem to={`/candidate/${user.id}`} itemName="Mit kandidatur" onClick={toggleMenu} />
                      )}
                      <DropdownItem to="/preferences" itemName="Mine præferencer" onClick={toggleMenu} />
                      {/* <DropdownItem to="/settings" itemName="Mine indstillinger" onClick={toggleMenu} /> */}
                    </ul>
                    <div className="p-2">
                      <Logout
                        className="block w-full font-bold text-left hover:bg-black rounded-sm p-2"
                        history={this.props.history}
                      />
                    </div>
                  </div>
                  <div className="fixed pin z-20" onClick={toggleMenu} />
                </div>
              </div>
            ) : (
              <div>
                <div className="md:hidden">
                  <button
                    className={
                      (this.state.showMenu ? 'text-white bg-grey-darkest' : 'bg-grey-lightest') +
                      ' inline-block leading-tight font-bold rounded-sm relative z-30 p-2'
                    }
                    onClick={toggleMenu}
                    onMouseDown={e => e.preventDefault()}>
                    Menu
                  </button>
                  <div
                    className={
                      (!this.state.showMenu && 'hidden ') +
                      ' absolute pin-t pin-r w-screen md:w-auto min-w-48 pl-4 pt-2 mt-9 menu-animation'
                    }>
                    <div className="text-white bg-grey-darkest rounded-sm relative z-30">
                      <ul className="md:hidden list-reset border-b border-grey-darker p-2">
                        <DropdownItem to="/proposals" itemName="Forslag" onClick={toggleMenu} />
                        <DropdownItem to="/projects" itemName="Projekter" onClick={toggleMenu} />
                        <DropdownItem to="/candidates" itemName="Kandidater" onClick={toggleMenu} />
                      </ul>
                      <div className="p-2">
                        <Login
                          type="login"
                          className="block w-full font-bold text-left hover:bg-black rounded-sm p-2"
                        />
                      </div>
                    </div>
                    <div className="fixed pin z-20" onClick={toggleMenu} />
                  </div>
                </div>
                <Login
                  type="login"
                  className="hidden md:inline-block font-bold leading-tight bg-grey-lightest rounded-sm p-2"
                />
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
