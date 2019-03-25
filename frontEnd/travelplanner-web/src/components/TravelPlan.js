/*global google*/
import React from 'react';
import { API_ROOT } from "../constants"
import { Button, Radio, Icon } from 'antd';
import { Rectangle, withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"
import { WrappedTravelMap } from "./TravelMap";
const paths1=[
    { lat: 40.7829, lng: -73.9654},
    { lat: 40.7794, lng: -73.9632},
    { lat:40.7614, lng: -73.9776},
    {lat: 40.7425, lng: -74.0061}
  ]
export class TravePlan extends React.Component {
    SelectedPoints = [];
    paths=[];
    directions={};
    start_points = [
        { pointId: 1000, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day: 1, index_in_the_day: 0 },
        { pointId: 1001, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day: 3, index_in_the_day: 0 },
        { pointId: 1002, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day: 2, index_in_the_day: 0 },
    ];

    state = {
        // for testing
        points: [
            { pointId: 0, type: "poi", lat: 40.7829, lon: -73.9654, poi_name: "central park", image_url: "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", day: 1, index_in_the_day: 1 },
            { pointId: 1, type: "poi", lat: 40.7794, lon: -73.9632, poi_name: "The Metropolitan Museum of Art", image_url: "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", day: 2, index_in_the_day: 1 },
            { pointId: 2, type: "poi", lat: 40.7614, lon: -73.9776, poi_name: "MoMa", image_url: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day: 2, index_in_the_day: 2 },
            { pointId: 3, type: "poi", lat: 40.7425, lon: -74.0061, poi_name: "Chelsea Market", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day: 3, index_in_the_day: 1 },
            { pointId: 4, type: "poi", lat: 40.7308, lon: -73.9973, poi_name: "Washington Square Park", image_url: "https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day: 3, index_in_the_day: 2 },
            { pointId: 5, type: "poi", lat: 40.8296, lon: -73.9262, poi_name: "Yankee Stadium", image_url: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day: 3, index_in_the_day: 3 }
        ],

    }

    componentDidMount() {
        //load points from overview
    }
  

    filtermarkers = (e) => {
        var temp = [];
        var temp2 = [];
        var temp3=[];
        temp = this.state.points.filter(place => place.day.toString() === e.target.value);
        //sort by index_in the day 
        temp.sort((a, b) => a.timeM - b.timeM);
        temp.map((dayplaces, i) =>
            temp2.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        );
        console.log(temp2);
        if(temp2!=null&& typeof temp2!= 'undefined'){
        const ori = temp2[0];
        const des = temp2.length >= 2 ? temp2[temp2.length-1]:ori;
        var midpoints= [];
        var temp1=[];
        midpoints= temp2.length>2?temp2.slice(1,-1): []
        midpoints.map((point=>{
           var mid={}
           mid["location"] ={"lat":point.lat, "lng":point.lng};
           mid["stopover"]=true;
           temp3.push(mid);
        }
        ));
       console.log(temp3);
       const DirectionsService = new google.maps.DirectionsService();
       DirectionsService.route({
         //origin: new google.maps.LatLng( 40.7829,-73.9654),
         //origin:new google.maps.LatLng(41.8507300, -87.6512600),
         origin: ori,
          waypoints: temp3,
         //destination: new google.maps.LatLng(41.8525800, -87.6514100),
         destination: des,
         travelMode: google.maps.TravelMode.DRIVING,
       }, (result, status) => {
         if (status === google.maps.DirectionsStatus.OK) {
           this.setState({
             directions: {...result},
             markers: true
           })
           console.log(result)
         } else {
           console.log(`error fetching directions ${result}`);
         }
       });
        this.setState(
            {
                SelectedPoints: temp,
                paths:temp2
            }
        )
    }
    else{
        console.log("first load")
    }
   }
    
    render() {
        
        return (
            <div>
                <div>
                    <Radio.Group onChange={this.filtermarkers}>
                        <Radio.Button value="1">Day1</Radio.Button>
                        <Radio.Button value="2">Day2</Radio.Button>
                        <Radio.Button value="3">Day3</Radio.Button>
                    </Radio.Group>
                </div>
                <div>
                <WrappedTravelMap
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCvUbj7eqr0u0RFbaNFGU9JAWYAoi5JmwY&v=3.exp&libraries=geometry,drawing,places"}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    handleOnDayChange={this.filtermarkers}
                    directions={this.state.directions}
                    markers={this.start_points.markers}
                />
                </div>
            </div>
        );
    }
}