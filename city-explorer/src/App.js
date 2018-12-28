import React, { Component } from 'react';
//import superagent from 'superagent';
import logo from './logo.svg';
//import './App.css';
import './styles.css';
import StarWarsPeople from '../src/components/starwars/people.js';


class App extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: 'City Explorer',
  //   }
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <StarWarsPeople />
      </div>
    );
  }
}

export default App;
