import React, { Component } from 'react';
import '../styles/App.css';
import {WrappedTravelMap} from "./TravelMap"

class App extends Component {
  render() {
    return (
      <WrappedTravelMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default App;
