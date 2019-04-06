import React from 'react';
import { Marker,DirectionsRenderer,withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import { Polyline } from "react-google-maps"
import { POS_KEY } from "../constants";
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

    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: 40.7795, lng: -73.9680 }}
                ref={this.saveMapRef}
            >
                {(this.props.points || []).map((point) => {
                    return (
                        <TravelMarker
                            key={point.placeID}
                            point={point}
                            totalDays={this.props.totalDays}
                            onDayChange={this.props.handleOnDayChange} />
                    )
                })}
                {
                (this.props.directions1)&&
                <DirectionsRenderer directions={this.props.directions1} suppressMarkers={this.props.markers} options={{
                    markerOptions: { icon: "blueMarker"},
                    icon: { scale: 3 }
                  }}/>
                }
                {
                 (this.props.start||[]).map((point)=>{
                    return(
                        <Marker
                        position={{ lat: point.lat, lng: point.lon }}
                        icon={{url: require(`../assets/images/Flag_8.png`),
                              scale:30}}
                    ></Marker>
                    )
                 })}
                  
                 {
                (this.props.directions)&&
                <DirectionsRenderer directions={this.props.directions} suppressMarkers={this.props.markers} options={{
                    markerOptions: { icon: {url:require(`../assets/images/Flag_2.png`)}} ,
                    icon: { scale: 30}
                  }}/>
                } 
    
             </GoogleMap>
        );
    }
}

export const WrappedTravelMap = withScriptjs(withGoogleMap(TravelMap));
