import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
//import { POS_KEY } from "../constants";
import { TravelMarker} from "./TravelMarker";
import { relative } from 'path';
import { nbind } from 'q';
import { Button, Radio, Icon } from 'antd';
//import Button from 'react-bootstrap/Button'
//import ButtonGroup from 'react-bootstrap/ToggleButtonGroup'
//import ToggleButton from 'react-bootstrap/ToggleButton'

const response =[{key:1, lat:40.7829, lng: -73.9654, name:"central park", url:"https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1",day:1},
{key:2, lat:40.7794, lng: -73.9632, name:"The Metropolitan Museum of Art", url:"https://cdn.getyourguide.com/img/tour_img-210854-148.jpg",day:2},
{key:3, lat:40.7614, lng:-73.9776, name:"MoMa",url: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day:2},
{key:4, lat: 40.7425, lng: -74.0061, name:"Chelsea Market", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day:3},
{key:5, lat: 40.7308, lng: -73.9973, name:"Washington Square Park", url:"https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day:3},
{key:6, lat:40.8296, lng: -73.9262,  name: "Yankee Stadium", url: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day:3}
]

export class TravelMap extends React.Component {
    constructor(props) {
        super(props);
        this.filtermarkers = this.filtermarkers.bind(this);
        this.state = {
          orginal_markers:[],
          select_markers: []
        };
      }
      filtermarkers(e) {
         var temp=[];
         temp=response.filter(place => place.day.toString()===e.target.value);

          console.log(`radio checked:${e.target.value}`);
          console.log(`${response[0].day.toString()}`);
           this.setState(
             {
              select_markers:temp
             }
          )

        }
    
      
    saveMapRef = (mapInstance) => {
        this.map = mapInstance;
    }
   
    render() {
        //const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <div>
            <div>
            <Radio.Group  onChange={this.filtermarkers}>
          <Radio.Button value="1">Day1</Radio.Button>
          <Radio.Button value="2">Day2</Radio.Button>
          <Radio.Button value="3">Day3</Radio.Button>
              </Radio.Group>
          </div>
            <div style={ {position: 'absolute',
                         top: 120,
                         left: 120,
                         width: 100,
                         height: 100,}}>
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: 40.7795, lng: -73.9680}}
                ref={this.saveMapRef}
                >   
               {
                (this.state.select_markers||[]).map((marker, i) =>{
                return(
                  <TravelMarker 
                  key={marker.key} lat={marker.lat} lng={marker.lng} name={marker.name} url={marker.url} day={marker.day} 
                  />
                )}
                )
                }
             </GoogleMap>
             </div>
            </div>
        );
    }
  }
  


export const WrappedTravelMap = withScriptjs(withGoogleMap(TravelMap));