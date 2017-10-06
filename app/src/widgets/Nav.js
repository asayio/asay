import React, { Component } from 'react';
import Login from './auth/Login.js';
import Logout from './auth/Logout.js';
import {
  Link
} from 'react-router-dom';
import { Bell, Cloud, Edit, Home, MessageCircle, Moon, PieChart, Speaker, Camera, Droplet, Umbrella, Sun, ThumbsUp, Package, Map, Layers, Feather, Heart, Zap } from 'react-feather';
const Icons = [Bell, Cloud, Edit, Home, MessageCircle, Moon, PieChart, Speaker, Camera, Droplet, Umbrella, Sun, ThumbsUp, Package, Map, Layers, Feather, Heart, Zap]
const RandomIcon = Icons[Math.floor(Math.random()*Icons.length)];

class Nav extends Component {
  render () {
    return (
      <nav className="mw8 center mv4">
        <div className="dib w-30">
          <Link to="/" className="black-90 hover-black-70 b nav-active"><RandomIcon className="i-green f4 mr2"/>Asay</Link>
        </div>
        <div className="dib w-70 tr">
          <span className="dn di-ns black-90 mr3">{window.sessionStorage.user}</span>
          {window.sessionStorage.authToken ?
          <Logout history={this.props.history} className="pointer dark-blue hover-blue"/>
          : <Login className="pointer dark-blue hover-blue" />
          }
        </div>
      </nav>
    )
  }
}

export default Nav;
