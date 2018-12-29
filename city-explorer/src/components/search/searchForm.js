import React from 'react';
import superagent from 'superagent';
import Map from '../map/map.js';
import Weather from '../weather/weather.js';
import Yelp from '../yelp/yelp.js';
import Meetups from '../meetups/meetups.js';
import Movies from '../movies/movies.js';
import Trails from '../trails/trails.js';

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
    let locationStr = `portland`; //TODO parse this from form... hardcoded for now
    let locationAPIQuery = `https://city-explorer-backend.herokuapp.com/location?data=${locationStr}`;
    const mainUrl = `https://city-explorer-backend.herokuapp.com/`;
    
    superagent.get(locationAPIQuery)
    .then(data => {
      const {formatted_query, id, latitude, longitude, search_query} = data.body;
      const dataString = `?data[id]=${id}&data[search_query]=${search_query}&data[formatted_query]=${formatted_query}&data[latitude]=${latitude}&data[longitude]=${longitude}&data[created_at]=`;
      Promise.all([
        fetch(`${mainUrl}weather${dataString}`),
        fetch(`${mainUrl}yelp${dataString}`),
        fetch(`${mainUrl}meetups${dataString}`),
        fetch(`${mainUrl}movies${dataString}`),
        fetch(`${mainUrl}trails${dataString}`)
      ])
      .then(responses => 
        responses.map((response, idx) => { 
          console.log(response);
          if(idx===0) { this.setState({weather: response.url})}
          else if(idx===1) { this.setState({yelp: response.url})}
          else if(idx===2) {this.setState({meetups: response.url})}
          else if(idx===3) { this.setState({movies: response.url})}
          else if(idx===4) { this.setState({trails: response.url})}
        } 
      ));
    });
  }
  // TODO state change should populate the h2 with "Here are the results for <city>, <statecode>, USA"
  render() {
    return (
      <React.Fragment>
        <form id="search-form" onSubmit={this.handleSubmit}>
          <label htmlFor="search"> Search for a location </label>
          <input id="input-search" type="text" name="search" placeholder="Enter a location here" />
          <button type="submit">Explore!</button>
        </form>
        <Map />
        <h2 className="query-placeholder"> </h2>
        <div className="column-container hide">
          <Weather />
          <Yelp />
          <Meetups />
          <Movies />
          <Trails />
        </div>
      </React.Fragment>
    );
  }
}

export default SearchForm;