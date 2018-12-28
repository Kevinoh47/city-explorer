import React from 'react';
import superagent from 'superagent';

class StarWarsPeople extends React.Component {
  constructor(props) {
    super (props);
    this.state = {people:[]}
  }

  fetchPeople = () => {
    superagent.get('https://swapi.co/api/people/')
      .then(data => {
        const people = data.body.results.map(person => person.name);
        this.setState({people});
      }
    );
  };

  render() {
    return (
      <>
      <button onClick={this.fetchPeople}>Get StarWars Peeps!</button>  
      <hr />
      <ul>
        {this.state.people.map( (person, idx) => <li key={idx}>{person}</li>)}
      </ul>
      </>
    )
  }
}

export default StarWarsPeople;
