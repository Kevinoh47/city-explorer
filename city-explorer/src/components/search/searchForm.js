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
      inputCity: '',
      location: {},
      data: {
        map: [],
        weather: [],
        yelp: [],
        meetups: [],
        movies: [],
        trails: []
      }
  
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleInputCity = e =>  {
    let inputCity = e.target.value;
    this.setState({inputCity})
  }

  handleSubmit (e) {
    e.preventDefault();
    let locationStr = this.state.inputCity; 

    const backend = `https://city-explorer-backend.herokuapp.com`;
    let locationAPIQuery = `${backend}/location?data=${locationStr}`;

    superagent.get(locationAPIQuery)
    .then(location => {

      Promise.all([
        superagent.get(`${locationAPIQuery}/weather`).query({data: location.body}).ok(res => true),
        superagent.get(`${locationAPIQuery}/yelp`).query({data: location.body}).ok(res => true),
        superagent.get(`${locationAPIQuery}/meetups`).query({data: location.body}).ok(res => true),
        superagent.get(`${locationAPIQuery}/movies`).query({data: location.body}).ok(res => true),
        superagent.get(`${locationAPIQuery}/trails`).query({data: location.body}).ok(res => true),
      ])
      .then(responses => {

        let [weather, yelp, meetups, movies, trails] = responses;
 
        this.setState(
          {
            location: location.body,
            data: {
              weather: weather.body,
              yelp: yelp.body,
              meetups: meetups.body,
              movies: movies.body,
              trails: trails.body
            }
          }
        )

        console.log('state object: ', this.state);  // TODO remove

        return true;
      })
    });
  }

  render() {
    return (

      <React.Fragment>
        <form id="search-form" onSubmit={this.handleSubmit} >
          <label htmlFor="search"> Search for a location </label>
          <input id="input-search" type="text" name="city" placeholder="Enter a location here" onChange={this.handleInputCity}/>
          <button type="submit">Explore!</button>
        </form>
        <Map location={this.state.location}/>
        <h2 className="query-placeholder"> </h2>
        <div className="column-container hide">
          <Weather data={this.state.data.weather}/>
          <Yelp data={this.state.data.yelp}/>
          <Meetups data={this.state.data.meetups}/>
          <Movies data={this.state.data.meetups}/>
          <Trails data={this.state.data.meetups}/>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchForm;