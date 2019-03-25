import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import {  Polyline } from "react-google-maps"
//import { POS_KEY } from "../constants";
import { TravelMarker } from "./TravelMarker";
import { relative } from 'path';

export class TravelMap extends React.Component {
    constructor(props) {
        super(props);
    }
    
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
                {(this.props.points||[]).map((point) => {
                    return (
                      <TravelMarker key={point.pointId} point={point} onDayChange={this.props.handleOnDayChange}/>
                    )
                 })} 
                 {
                   (this.props.paths!=null&& typeof this.props.paths!= 'undefined') &&<Polyline
                   path={this.props.paths}
                   options={{
                       strokeColor: '#ff2343',
                       strokeOpacity: '1.0',
                       strokeWeight: 3,
                       icons: [{
                           icon: "hello",
                           offset: '0',
                           repeat: '10px'
                       }],
                   }}
               />   
                 }
                
             </GoogleMap>
        );
    }
}

export const WrappedTravelMap = withScriptjs(withGoogleMap(TravelMap));
