import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";
//import { POS_KEY } from "../constants";
import { TravelMarker } from "./TravelMarker";


class TravelMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          markers: []
        };
      }
     componentDidMount(){
        // or you can set markers list somewhere else
        // please also set your correct lat & lng
        // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
        // later change to button onclick
        this.setState({
                    markers: [{key:1, lat:40.7829, lng: -73.9654, name:"central park", url:"https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1",day:1},
                    {key:2, lat:40.7794, lng: -73.9632, name:"The Metropolitan Museum of Art", url:"https://cdn.getyourguide.com/img/tour_img-210854-148.jpg",day:2},
                    {key:3, lat:40.7614, lng:-73.9776, name:"MoMa",url: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day:2},
                    {key:4, lat: 40.7425, lng: -74.0061, name:"Chelsea Market", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day:3},
                    {key:5, lat: 40.7308, lng: -73.9973, name:"Washington Square Park", url:"https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day:3},
                    {key:6, lat:40.8296, lng: -73.9262,  name: "Yankee Stadium", url: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day:3}
                ],
        });
      }
    saveMapRef = (mapInstance) => {
        this.map = mapInstance;
    }
    
    render() {
        //const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: 40.7795, lng: -73.9680}}
                ref={this.saveMapRef}
                //onDragEnd={this.reloadMarkers}
                //onZoom={this.reloadMarkers}
            >   {this.state.markers.map((marker, i) =>{
                return(
                  <TravelMarker 
                  key={marker.key} lat={marker.lat} lng={marker.lng} name={marker.name} url={marker.url} day={marker.day} 
                  />
                )
                 })}    
                </GoogleMap>/*div
                    <TravelMarker key={1} lat={40.7829} lng={-73.9654} name="central park" url="https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1" day={1} />
                    <TravelMarker key={2} lat={40.7794} lng={-73.9632} name="The Metropolitan Museum of Art" url="https://cdn.getyourguide.com/img/tour_img-210854-148.jpg" day={1} />
                    <TravelMarker key={3} lat={40.7614} lng={-73.9776} name="MoMa" url="https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250" day={1}/>
                    <TravelMarker key={4} lat={40.7587} lng={-73.9787} name="Rockefeller Center" url="https://res.cloudinary.com/gray-malin/image/upload/c_scale,w_1000,q_80/gray-malin/products/Gray_Malin_x_Rockefeller_Center_Tree.jpg?updated=1541526604" day={1}/>

                    <TravelMarker key={5} lat={40.7425} lng={-74.0061} name="Chelsea Market" url="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg" day={2} />
                    <TravelMarker key={6} lat={40.7480} lng={-74.0048} name="The High Line" url="https://www.tripsavvy.com/thmb/u__1MLKdHHdEnrHxYjEx0KwHpyw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/HighLine_WildflowerField_NYCCompany-MarleyWhite-5b104d08a474be003826e215.jpg" day={2} />
                    <TravelMarker key={7} lat={40.7484} lng={-73.9857} name="Empire State Building" url="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg" day={2}/>
                    <TravelMarker key={8} lat={40.7308} lng={-73.9973} name="Washington Square Park" url="https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg" day={2}/>

                    <TravelMarker key={9} lat={40.8075} lng={-73.9626} name="Columbia University" url="https://www.columbia.edu/content/sites/default/files/styles/cu_crop/public/content/Campus%20Images/low-plaza.jpg?itok=DJ8f43Xe" day={3} />
                    <TravelMarker key={10} lat={40.8296} lng={-73.9262} name="Yankee Stadium" url="https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398" day={3} />
                    <TravelMarker key={11} lat={40.7925} lng={-73.9519} name="Museum of the City of New York" url="https://media-cdn.tripadvisor.com/media/photo-s/0f/ec/53/13/the-museum-of-the-city.jpg" day={3} />

                </div> */
        );
    }
}

export const WrappedTravelMap = withScriptjs(withGoogleMap(TravelMap));