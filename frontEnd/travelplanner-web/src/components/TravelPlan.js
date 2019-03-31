/*global google*/
import React from 'react';
import { API_ROOT } from "../constants"
import { Button, Radio, Icon } from 'antd';
import { Rectangle, withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"
import { WrappedTravelMap } from "./TravelMap";
import Board from "./Board";
import RatioButtons from "./RatioButtons";
import  {SortableComponent} from "./SortableList"
import {arrayMove} from 'array-move'

const paths1=[
    { lat: 40.7829, lng: -73.9654},
    { lat: 40.7794, lng: -73.9632},
    { lat:40.7614, lng: -73.9776},
    { lat: 40.7425, lng: -74.0061}
  ]
export class TravelPlan extends React.Component {
    SelectedPoints = [];
    ChangePoints=[];
    start={};
    paths=[];
    directions={};
    start_points = [
        { pointId: 1000, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day: 1, index_in_the_day: 0 },
        { pointId: 1001, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day: 3, index_in_the_day: 0 },
        { pointId: 1002, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day: 2, index_in_the_day: 0 },
    ];

    state = {
        // for testing
        points: []
        
    }
    userID = this.props.userID;

    componentWillMount(){
        const testingGeneratedPoints=this.props.points;
        this.setState(
            {
                points: testingGeneratedPoints,

             }
        )

    }
    
    handeldrop= (e) => {
        //console.log(e);
        var temp=e
        temp.map((sort,i)=>{
            temp[i].intradayIndex=i
        })
        var temp2=[]
        temp.sort((a, b) => b.intradayIndex - a.intradayIndex);
        temp.map((dayplaces, i) =>
            temp2.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        );
        //console.log(temp3);
        if(temp2!=null&& typeof temp2!= 'undefined'){
            const ori = temp2[0];
            const des = temp2.length >= 2 ? temp2[temp2.length-1]:ori;
            var midpoints= [];
            var temp3=[];
            midpoints= temp2.length>2?temp2.slice(1,-1): []
            midpoints.map((point=>{
               var mid={}
               mid["location"] ={"lat":point.lat, "lng":point.lng};
               mid["stopover"]=true;
               temp3.push(mid);
            }
            ));
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
           //console.log(result)
         } else {
           console.log(`error fetching directions ${result}`);
         }
       });
        this.setState(
            {
                SelectedPoints: temp,

             }
                )   
      }
    }
    
    filtermarkers = (e) => {
        //console.log(this.state.SelectedPoints)
        var start=[];
        var temp = [];
        var temp2 = [];
        var temp3=[];
        //var temp4=[];
        temp=this.state.points.filter(place => (place.day+1).toString() === e.target.value);
        start=temp.filter(place => (place.type) === "start");
        //sort by index_in the day 
        //temp.filter(place => (place.type) === "poi").sort((a, b) => b.intradayIndex - a.intradayIndex);
        temp.map((dayplaces, i) =>
            temp2.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        );
        //console.log(temp2);
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
       //console.log(temp3);
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
           //console.log(result)
         } else {
           console.log(`error fetching directions ${result}`);
         }
       });
        this.setState(
            {
                SelectedPoints: temp,
                paths:temp2,
                start:start
            }
        )
    }
    else{
        console.log("first load")
    }
   }
    
    render() {
        return (
            <div style={{display:`flex`}}>
                <div id="map content" style={{ float:`left`, width :`800px`,height:`500px`}}>
                <div>
                    <Radio.Group onChange={this.filtermarkers}>
                    {
                     [...Array(this.props.totalDays).keys()].map(i =>
                      <Radio.Button key={i} value={(i+1).toString()}>Day{i+1}</Radio.Button>
                     )
                   }
                    </Radio.Group>
                </div>
                <div>
                <WrappedTravelMap
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCvUbj7eqr0u0RFbaNFGU9JAWYAoi5JmwY&v=3.exp&libraries=geometry,drawing,places"}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    handleOnDayChange={this.filtermarkers}
                    directions={this.state.directions}
                    markers={this.start_points.markers}
                />
                </div>
                </div>
                <div id ="board" style={{ float:`right`,width:`500px`, height:`600px`}} >
                    {
                      (this.state.SelectedPoints||typeof(this.state.SelectedPoints)!="undefined")&&(
                        <SortableComponent items={this.state.SelectedPoints} change={this.handeldrop} />
                      )  
                    } 
                </div>
            </div>
        );
    }
}