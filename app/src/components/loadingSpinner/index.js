import React, { Component } from 'react';
import './style.css';
import {
  Bell,
  Cloud,
  Edit,
  Home,
  MessageCircle,
  Moon,
  PieChart,
  Speaker,
  Camera,
  Droplet,
  Umbrella,
  Sun,
  ThumbsUp,
  Package,
  Map,
  Layers,
  Feather,
  Heart,
  Zap
} from 'react-feather';

const Icons = [
  Bell,
  Cloud,
  Edit,
  Home,
  MessageCircle,
  Moon,
  PieChart,
  Speaker,
  Camera,
  Droplet,
  Umbrella,
  Sun,
  ThumbsUp,
  Package,
  Map,
  Layers,
  Feather,
  Heart,
  Zap
];

class LoadingSpinner extends Component {
  constructor(props) {
    super(props);
    this.state = { now: new Date().getTime() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 800);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      now: new Date().getTime()
    });
  }

  render() {
    const RandomIcon = Icons[Math.floor(Math.random() * Icons.length)];
    return (
      <div className="loading-spinner flex-auto flex items-center justify-center text-teal p-2">
        <RandomIcon />
      </div>
    );
  }
}

export default LoadingSpinner;
