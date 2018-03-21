import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './js/Game.js';
import GroceryApp from './js/GroceryApp.js';
import Soccer from './js/Soccer.js';
import Clock from './js/components/Clock.js';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fun With React</h1>



        </header>
        <p className="App-intro"> </p>
        <div> <Clock /></div>
        <div className="container">
          <Game />
          <hr />
        </div>
      </div>
    );
  }
}
export default App;
