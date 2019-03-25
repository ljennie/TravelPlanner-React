import React from 'react';
import { GoogleMap } from "react-google-maps";
import { Link } from "react-router-dom";
//import{ MyMapComponent}  from "MyMapComponent"
//mport {MyMapComponent} from './MyMapComponent';
const paths=[
    { lat: 40.7829, lng: -73.9654},
    { lat: 40.7794, lng: -73.9632},
    { lat:40.7614, lng: -73.9776},
    {lat: 40.7425, lng: -74.0061}
  ]
export class TestPage extends React.Component {
    constructor(props) {
        super(props);
        //console.log(props.location.state);
    }
    render() {
        return (
            <div>
                "lalala"
           </div>
        );
    }
}