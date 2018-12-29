import React from 'react';
import superagent from 'superagent';
import Map from '../map/map.js';
import Weather from '../weather/weather.js';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: '',
      weather: '',
      yelp: '',
      meetups: '',
      movies: '',
      trails: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    let locationStr = `portland`;
    let locationAPIQuery = `https://city-explorer-backend.herokuapp.com/location?data=${locationStr}`;
    let mainAPIquery = `https://city-explorer-backend.herokuapp.com/`;
    superagent.get(locationAPIQuery)
    .then(data => {
      const {formatted_query, id, latitude, longitude, search_query} = data.body;
      console.log({formatted_query});
      console.log({id});
      console.log({latitude});
      console.log({longitude});
      console.log({search_query});

      Promise.all([
        fetch(`${mainAPIquery}weather?data[id]=${id}&data[search_query]=${search_query}&data[formatted_query]=${formatted_query}&data[latitude]=${latitude}&data[longitude]=${longitude}&data[created_at]=`),

        fetch(`${mainAPIquery}yelp?data[id]=${id}&data[search_query]=${search_query}&data[formatted_query]=${formatted_query}&data[latitude]=${latitude}&data[longitude]=${longitude}&data[created_at]=`),

        fetch(`${mainAPIquery}meetups?data[id]=${id}&data[search_query]=${search_query}&data[formatted_query]=${formatted_query}&data[latitude]=${latitude}&data[longitude]=${longitude}&data[created_at]=`),

        fetch(`${mainAPIquery}movies?data[id]=${id}&data[search_query]=${search_query}&data[formatted_query]=${formatted_query}&data[latitude]=${latitude}&data[longitude]=${longitude}&data[created_at]=`),

        fetch(`${mainAPIquery}trails?data[id]=${id}&data[search_query]=${search_query}&data[formatted_query]=${formatted_query}&data[latitude]=${latitude}&data[longitude]=${longitude}&data[created_at]=`)
      ])
      .then(responses => 
        responses.map((response, idx) => {
          console.log(response);
          if(idx===0) { this.setState({weather: response.url})}
          else if(idx===1) { this.setState({yelp: response.url})}
          else if(idx===2) { this.setState({meetups: response.url})}
          else if(idx===3) { this.setState({movies: response.url})}
          else if(idx===4) { this.setState({trails: response.url})}
        } 
      ));
    });
  }

  render() {
    return (
      <React.Fragment>
        <form id="search-form" onSubmit={this.handleSubmit}>
          <label htmlFor="search"> Search for a location </label>
          <input id="input-search" type="text" name="search" placeholder="Enter a location here" />
          <button type="submit">Explore!</button>
        </form>
      </React.Fragment>

    );
  }
}

export default SearchForm;