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
          <RandomIcon className="dark-pink mr2"/><Link to="/" className="link black-90 hover-black-70 b">Asay</Link>
        </div>
        {window.sessionStorage.authToken ?
        <div className="dib w-70 tr">
          <span className="black-90 mr2">{window.sessionStorage.user}</span>
          <Logout history={this.props.history}/>
        </div> : <Login/>}
      </nav>
    )
  }
}

export default Nav;