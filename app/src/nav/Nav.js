import React, { Component } from 'react';
import Login from '../auth/Login.js';
import Logout from '../auth/Logout.js';
import {
  Link
} from 'react-router-dom';
import { Bell, Cloud, Edit, Home, MessageCircle, Moon, PieChart, Speaker, Camera, Droplet, Umbrella, Sun, ThumbsUp, Package, Map, Layers, Feather, Heart, Zap } from 'react-feather';
const Icons = [Bell, Cloud, Edit, Home, MessageCircle, Moon, PieChart, Speaker, Camera, Droplet, Umbrella, Sun, ThumbsUp, Package, Map, Layers, Feather, Heart, Zap]
const RandomIcon = Icons[Math.floor(Math.random()*Icons.length)];

class Nav extends Component {
  render () {
    return (
      <nav className="w-100 flex mb4">
        <div className="flex-auto">
          <RandomIcon className="i-green mr2"/><Link to="/" className="link black-90 hover-black-70 b">Initiativet</Link>
        </div>
        {window.sessionStorage.authToken ? <Logout history={this.props.history}/> : <Login/>}
      </nav>
    )
  }
}

export default Nav;
