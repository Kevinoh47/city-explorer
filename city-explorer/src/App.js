import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import './styles/styles.css';
import UrlForm from './components/backend/urlForm.js';
import SearchForm from './components/search/searchForm.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> City Explorer </h1>
          <p>Enter a location below to learn about the weather, events, restaurants, movies filmed there, and more!</p>
        </header>
        <main>
          <UrlForm />
          <SearchForm />
        </main>
      </div>
    );
  }
}

export default App;
