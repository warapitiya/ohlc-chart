import React, {Component} from "react";
import Header from './components/header/header';

import {hot} from 'react-hot-loader/root'

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container mt-5">
        <Header title={"Name"}></Header>
        <button className="btn btn-primary">dddd</button>
      </div>
    );
  }
}

export default hot(App);
