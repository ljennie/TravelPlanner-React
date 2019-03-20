import React, { Component } from 'react';
import { WrappedTravelMap } from "./TravelMap"


class HomeTab extends Component {
    render() {
        return (
            <WrappedTravelMap
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: 300, width: 300 }} />}
                containerElement={<div style={{ height: 550 }} />}
                mapElement={<div style={{ height:'80%', width:'100%' }} />}
            />
            );
    }
}

export default HomeTab;