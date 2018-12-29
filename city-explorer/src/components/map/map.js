import React from 'react';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // TODO state change should add src value which i think comes from heroku not google???
  // TODO state change should remove hide class...
  render() {
    return (
      <img id="map" className="hide" src="" alt="Map of search query"></img>
    )
  }
}

export default Map;