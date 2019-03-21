import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
//import { POS_KEY } from "../constants";
import { TravelMarker2 } from "./TravelMarker2";
import { relative } from 'path';

class TravelMap2 extends React.Component {

    componentDidMount(){

    }
    saveMapRef = (mapInstance) => {
        this.map = mapInstance;
    }
   
    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: 40.7795, lng: -73.9680}}
                ref={this.saveMapRef}
                >
                {this.props.points.map((point) => {
                    return (
                      <TravelMarker2 key={point.pointId} point={point}/>
                    )
                 })}    
             </GoogleMap>
        );
    }
}

export const WrappedTravelMap2 = withScriptjs(withGoogleMap(TravelMap2));