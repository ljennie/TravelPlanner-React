import React from 'react';
import { DirectionsRenderer,withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { Polyline } from "react-google-maps"
//import { POS_KEY } from "../constants";
import { TravelMarker } from "./TravelMarker";
import { relative } from 'path';

class TravelMap extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }
    saveMapRef = (mapInstance) => {
        this.map = mapInstance;
    }
    componentDidMount() {
    }





    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 40.7795, lng: -73.9680 }}
                ref={this.saveMapRef}
            >
                {(this.props.points || []).map((point) => {
                    return (
                        <TravelMarker key={point.pointId} point={point} onDayChange={this.props.handleOnDayChange} />
                    )
                })}
                {
                 (this.props.directions)&&
                 <DirectionsRenderer directions={this.props.directions} suppressMarkers={this.props.markers} />
                }
             </GoogleMap>
        );
    }
}

export const WrappedTravelMap = withScriptjs(withGoogleMap(TravelMap));
