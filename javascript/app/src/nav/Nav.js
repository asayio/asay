import React, { Component } from 'react';
import Login from '../auth/Login.js';
import Logout from '../auth/Logout.js';
import {
  Link
} from 'react-router-dom';
import { Bell, Cloud, Edit, Home, MessageCircle, MessageSquare, Moon, PieChart, Speaker, Camera, Droplet, Umbrella, Sun, ThumbsUp, Package, Map, Layers, Feather, Heart, Zap } from 'react-feather';

const Icons = [Bell, Cloud, Edit, Home, MessageCircle, MessageSquare, Moon, PieChart, Speaker, Camera, Droplet, Umbrella, Sun, ThumbsUp, Package, Map, Layers, Feather, Heart, Zap]
const RandomIcon = Icons[Math.floor(Math.random()*Icons.length)];

class Nav extends Component {
  render () {
    return (
      <nav className="mb4">
        <Link to="/" className="f3 link dark-pink hover-hot-pink ttl"><RandomIcon className="svg-icon mr2" />Asay</Link>
        {window.sessionStorage.authToken ? <Logout history={this.props.history}/> : <Login/>}
      </nav>
    )
  }
}

export default Nav;
