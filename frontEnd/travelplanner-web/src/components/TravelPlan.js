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
import Background from '../assets/images/background.jpg';


const testingGeneratedPoints = [

  {placeID: "ChIJgzD7uFVYwokRXCoEdvGu-av", type: "poi", lat: 40.7829, lon: -73.9654, name: "central park", imageURL: "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", day:0, intradayIndex: 1},
  {placeID: "ChIJgzD7uFVYwoerwCoEdvGa-as", type: "poi", lat: 40.7794, lon: -73.9632, name: "The Metropolitan Museum of Art", imageURL: "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", day: 0, intradayIndex: 2},
  {placeID: "ChIJavd7uFVYwokRXCoEdwsu-wA", type: "poi", lat: 40.7614, lon: -73.9776, name: "MoMa", imageURL: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day: 1, intradayIndex: 3},
  {placeID: "ChIJgzD7uFVYwokRXCoEdvGc-re", type: "poi", lat: 40.7425, lon: -74.0061, name: "Chelsea Market", imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day:1, intradayIndex: 2},
  {placeID: "ChIJgzD7uFVYwdtwXCosdfGu-sA", type: "poi", lat: 40.7308, lon: -73.9973, name: "Washington Square Park", imageURL:"https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day:2, intradayIndex: 3},
  {placeID: "ChIJgzD7uFVYwokRXCoEdvds-zA", type: "poi", lat: 40.8296, lon: -73.9262, name: "Yankee Stadium", imageURL: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day:2, intradayIndex: 1},
  {placeID: "ChIJgzD7uFVYwokavdeEdvGu-wA", type: "start", lat: 40.7829, lon: -73.9654, name: "aa", imageURL: "", day:0, intradayIndex: 0},
  {placeID: "ChIJgzcdsFVYwokRXCoEdvGu-aA", type: "start", lat: 40.7829, lon: -73.9654, name: "bb", imageURL: "", day:1, intradayIndex: 0},
  {placeID: "ChIJgzD7uFfdskRXCoEdvGud-dv", type: "start", lat: 40.7829, lon: -73.9654, name: "yy", imageURL: "", day:2, intradayIndex: 0},
];

export class TravelPlan extends React.Component {
    SelectedPoints = [];
    LegPoints=[];
    start={};
    paths=[];
    directions={};
    directions1={};
    
    state = {
        // for testing
        points: []
        
    }

    componentWillMount(){
        //const testingGeneratedPoints=this.props.points;
        //var temp=this.props.points.filter(place => (place.day+1).toString() === "1");
        //var temp=testingGeneratedPoints.filter(place => (place.day+1).toString() === "1");
        //console.log(temp)
        //start=temp.filter(place => (place.type) === "start");
        //sort by index_in the day 
        //var temp2=[]
        //temp.filter(place => (place.type) === "poi").sort((a, b) => b.intradayIndex - a.intradayIndex);
        //temp.map((dayplaces, i) =>
            //temp2.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        //);
        //console.log(temp2);
        //if(temp2!=null&& typeof temp2!= 'undefined'){
        //const ori = temp2[0];
        //const des = temp2.length >= 2 ? temp2[temp2.length-1]:ori;
        //var midpoints= [];
        //var temp3=[];
        //midpoints= temp2.length>2?temp2.slice(1,-1): []
        //midpoints.map((point=>{
           //var mid={}
           //mid["location"] ={"lat":point.lat, "lng":point.lng};
           //mid["stopover"]=true
           //temp3.push(mid);
        //}
        //));
       //console.log(temp3);
       /*const DirectionsService = new google.maps.DirectionsService();
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
             markers: false
           })
           //console.log(result)
         } else {
           console.log(`error fetching directions ${result}`);
         }
       }); */
        this.setState(
            {
                points: this.props.points,

             }
        )
    
  }
    
    handeldrop= (e) => {
        //console.log(e);
        var temp=e
        var startpoint=[]
        var start=[];
        temp.map((sort,i)=>{
            temp[i].intradayIndex=i
        })
        var temp2=[]
        //sort by index_in the day 
        temp.sort((a, b) => b.intradayIndex - a.intradayIndex);
        start=this.state.points.filter(place => (place.type) === "start");
        //temp.filter(place => (place.type) === "poi").sort((a, b) => b.intradayIndex - a.intradayIndex);
        start.map((dayplaces, i) =>
            startpoint.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        );
         temp.map((dayplaces, i) => temp2.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        );
        //update connection between start point to first leg
        //connect start point with the first place
        const ori = startpoint[0];
        const des = temp2[0];
       //console.log(des);
       const DirectionsService = new google.maps.DirectionsService();
       DirectionsService.route({
          //origin: new google.maps.LatLng( 40.7829,-73.9654),
         //origin:new google.maps.LatLng(41.8507300, -87.6512600),
         origin: ori,
         //destination: new google.maps.LatLng(41.8525800, -87.6514100),
         destination: des,
         travelMode: google.maps.TravelMode.DRIVING,
       }, (result1, status) => {
         if (status === google.maps.DirectionsStatus.OK) {
           this.setState({
             directions1: {...result1},
             markers: false
           })
            console.log(result1)
         } else {
           console.log(`error fetching directions ${result1}`);
         }
       });
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
             markers: false
           })
           //console.log(result)
         } else {
           console.log(`error fetching directions ${result}`);
         }
       });
        this.setState(
            {
                legs: temp,

             }
                )   
      }
    }
    
    filtermarkers = (e) => {
        //console.log(this.state.SelectedPoints)
        var start=[];
        var legs=[];
        var temp = [];
        var temp2 = [];
        var temp3=[];
        var startpoint=[];
        //var temp4=[];
        temp=this.state.points.filter(place => (place.day+1).toString() === e.target.value);
        //sort by index_in the day 
        temp.sort((a, b) => b.intradayIndex - a.intradayIndex);
        start=temp.filter(place => (place.type) === "start");
        legs=temp.filter(place => (place.type) === "poi")
        //temp.filter(place => (place.type) === "poi").sort((a, b) => b.intradayIndex - a.intradayIndex);
        start.map((dayplaces, i) =>
            startpoint.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        );
        legs.map((dayplaces, i) =>
            temp2.push({ 'lat': dayplaces.lat, 'lng': dayplaces.lon })
        );
        //console.log(temp2);
        if(temp2!=null&& typeof temp2!= 'undefined'){
        //connect start point with the first place
        const ori = startpoint[0];
        const des = temp2[0];
       //console.log(des);
       const DirectionsService = new google.maps.DirectionsService();
       DirectionsService.route({
          //origin: new google.maps.LatLng( 40.7829,-73.9654),
         //origin:new google.maps.LatLng(41.8507300, -87.6512600),
         origin: ori,
         //destination: new google.maps.LatLng(41.8525800, -87.6514100),
         destination: des,
         travelMode: google.maps.TravelMode.DRIVING,
       }, (result1, status) => {
         if (status === google.maps.DirectionsStatus.OK) {
           this.setState({
             directions1: {...result1},
             markers: false
           })
            console.log(result1)
         } else {
           console.log(`error fetching directions ${result1}`);
         }
       });
       //connect other leg points
       const ori1 = temp2[0];
       const des1 = temp2.length >= 2 ? temp2[temp2.length-1]:ori1;
       var midpoints= [];
       midpoints= temp2.length>2?temp2.slice(1,-1): []
       midpoints.map((point=>{
          var mid={}
          mid["location"] ={"lat":point.lat, "lng":point.lng};
          mid["stopover"]=true;
          temp3.push(mid);
       }
       ));
      //console.log(temp3);
      const DirectionsService1 = new google.maps.DirectionsService();
      DirectionsService1.route({
        //origin: new google.maps.LatLng( 40.7829,-73.9654),
        //origin:new google.maps.LatLng(41.8507300, -87.6512600),
        origin: ori1,
         waypoints: temp3,
        //destination: new google.maps.LatLng(41.8525800, -87.6514100),
        destination: des1,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: {...result},
            markers: false
          })
           console.log(result)
        } else {
          console.log(`error fetching directions ${result}`);
        }
      });
        this.setState(
            {
                SelectedPoints: temp,
                paths:temp2,
                start:start,
                legs:legs
            }
        )
    }
    else{
        console.log("first load")
    }
   }

    saveButtonClicked = () => {
        const endPoint = 'UpdatePaths';
        console.log(JSON.stringify({"userID": this.props.userID, "newSchedule": this.state.points}));
        fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
            body: JSON.stringify({"userID": this.props.userID, "newSchedule": this.state.points}),
            headers: {
                'Content-Type':'application/json'
            }
        }).catch((e) => {
            console.log(e.message);
        });
    }


    render() {
        //const Background= "D:\travel\awesomeTravelPlanner\frontEnd\travelplanner-web\src\assets\images\background.jpg"
        return (
            <div style={{display:`flex`, backgroundImage: `url(${Background})`
             }}>
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
                    suppressMarkers={true}
                    start={this.state.start}
                    directions={this.state.directions}
                    directions1={this.state.directions1}
                    //markers={this.start_points.markers}
                />
                </div>
                </div>
                <div id ="board" style={{ float:`right`,width:`500px`, height:`600px`}} >
                    {
                      (this.state.legs||typeof(this.state.legs)!="undefined")&&(
                        <SortableComponent items={this.state.legs} change={this.handeldrop} start={this.state.start} />
                      )  
                    } 
                    <div><Button onClick={this.saveButtonClicked}>Save</Button></div>
                </div>  
            </div>
        );
    }
  }