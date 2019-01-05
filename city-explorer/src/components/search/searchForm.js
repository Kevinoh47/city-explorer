import React from 'react';
import superagent from 'superagent';
import Map from '../map/map.js';
import Weather from '../weather/weather.js';
import Yelp from '../yelp/yelp.js';
import Meetups from '../meetups/meetups.js';
import Movies from '../movies/movies.js';
import Trails from '../trails/trails.js';

const API = `https://city-explorer-backend.herokuapp.com`;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCity: '',
      location: {},
      data: {
        weather: [],
        yelp: [],
        meetups: [],
        movies: [],
        trails: []
      }
    };
  }
  
  handleInputCity = e =>  {
    let inputCity = e.target.value;
    this.setState({inputCity})
  }

  getLocation = () => {
    const location = superagent.get(`${API}/location`).query({ data: this.state.inputCity });
    console.log({location}); // TODO remove
    return location;
  };

  getData = location => {
    let serviceCalls = [];
    Object.keys(this.state.data).forEach(service => {
      let url = `${API}/${service}`;
      serviceCalls.push(
        superagent
          .get(url)
          .query({ data: location.body })
          .ok(res => true)
      );
    });

    return serviceCalls;
  };

  searchCity = async e => {
    e.preventDefault();
    try {
      let location = await this.getLocation();
      let serviceCalls = this.getData(location);
      let [weather, yelp, meetups, movies, trails] = await Promise.all(
        serviceCalls
      );
 
      this.setState({
        location: location.body,
        data: {
          weather: weather.body,
          yelp: yelp.body,
          meetups: meetups.body,
          movies: movies.body,
          trails: trails.body
        }
      });
    } catch (e) {
      console.error("Fetch Error", e);
    }

    console.log("state", this.state);
  };

  render() {

    let validLocation = (this.state.location && this.state.location.id > 0);
    if(validLocation) {
      return (
        <React.Fragment>
          <form id="search-form" onSubmit={this.searchCity} >
            <label htmlFor="search"> Search for a location </label>
            <input id="input-search" type="text" name="city" placeholder="Enter a location here" onChange={this.handleInputCity}/>
            <button type="submit">Explore!</button>
          </form>
          <Map location={this.state.location}/>
          <h2 className="query-placeholder"> </h2>
          <div className="column-container">
            <Weather data={this.state.data.weather}/>
            <Yelp data={this.state.data.yelp}/>
            <Meetups data={this.state.data.meetups}/>
            <Movies data={this.state.data.movies}/>
            <Trails data={this.state.data.trails}/> 
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <form id="search-form" onSubmit={this.searchCity} >
            <label htmlFor="search"> Search for a location </label>
            <input id="input-search" type="text" name="city" placeholder="Enter a location here" onChange={this.handleInputCity}/>
            <button type="submit">Explore!</button>
          </form>
        </React.Fragment>
      )
    }
  }
}

export default SearchForm;