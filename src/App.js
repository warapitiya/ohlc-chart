import React, {Component} from "react";
import ChatContainer from "./containers/ChatContainer/ChatContainer";
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";

import {hot} from 'react-hot-loader/root'
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="container mt-5">
        <Header title={"A HEADER"}></Header>
        <ChatContainer/>
        <Footer title={"A FOOTER"}/>
      </div>
    );
  }
}

export default hot(App);
