import React, { Component } from 'react';
import superagent from 'superagent';
import logo from './logo.svg';
//import './App.css';
import './styles.css';
import Content from '../src/components/content/content.js'


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'City Explorer',
      people: [],
    }
  }

  fetchPeople = () => {
    superagent.get('https://swapi.co/api/people')
      .then(data => {
        const people = data.body.results.map(person => person.name);
        this.setState({people});
        //console.log({people})
      })
  };


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
        <Content fetch={this.fetchPeople} items={this.state.people} />
      </div>
    );
  }
}

export default App;
