/*global google*/
import React from 'react';
//import $ from 'jquery'
//import { Tabs, Spin, Row, Col, Radio } from 'antd';
import { API_ROOT } from "../constants"
//import { DaysOptionsButton } from "./DaysOptionsButton";
//import { GeneratePathsButton } from "./GeneratePathsButton";

import { WrappedTravelMap } from "./TravelMap";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Input } from 'antd';
<<<<<<< HEAD
import {GOOGLE_GEOCODE_API, PLACE_API_KEY} from "../constants";
=======
import {GOOGLE_GEOCODE_API, PLACE_API_K} from "../constants";
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755

export class TravelOverview extends React.Component {

    testingPoints =  [
        {placeID: "ChIJgzD7uFVYwokRXCoEdvGu-av", type: "poi", lat: 40.7829, lon: -73.9654, name: "central park", image_url: "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", day:0, intradayIndex: -1},
        {placeID: "ChIJgzD7uFVYwoerwCoEdvGa-as", type: "poi", lat: 40.7794, lon: -73.9632, name: "The Metropolitan Museum of Art", image_url: "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", day: 0, intradayIndex: -1},
        {placeID: "ChIJavd7uFVYwokRXCoEdwsu-wA", type: "poi", lat: 40.7614, lon: -73.9776, name: "MoMa", image_url: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day: 1, intradayIndex: -1},
        {placeID: "ChIJgzD7uFVYwokRXCoEdvGc-re", type: "poi", lat: 40.7425, lon: -74.0061, name: "Chelsea Market", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day:1, intradayIndex: -1},
        {placeID: "ChIJgzD7uFVYwdtwXCosdfGu-sA", type: "poi", lat: 40.7308, lon: -73.9973, name: "Washington Square Park", image_url:"https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day:2, intradayIndex: -1},
        {placeID: "ChIJgzD7uFVYwokRXCoEdvds-zA", type: "poi", lat: 40.8296, lon: -73.9262, name: "Yankee Stadium", image_url: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day:2, intradayIndex: -1}
    ];

    testingStartPoints = [
<<<<<<< HEAD
        {placeID: "ChIJgzD7uFVYwokavdeEdvGu-wA", type: "start", lat: 40.7829, lon: -73.9654, name: "", image_url: "", day:0, index_in_the_day: 0},
        {placeID: "ChIJgzcdsFVYwokRXCoEdvGu-aA", type: "start", lat: 40.7829, lon: -73.9654, name: "", image_url: "", day:1, index_in_the_day: 0},
        {placeID: "ChIJgzD7uFfdskRXCoEdvGud-dv", type: "start", lat: 40.7829, lon: -73.9654, name: "", image_url: "", day:2, index_in_the_day: 0},
=======
        {placeID: "ChIJgzD7uFVYwokavdeEdvGu-wA", type: "start", lat: 40.7829, lon: -73.9654, name: "", image_url: "", day:0, intradayIndex: 0},
        {placeID: "ChIJgzcdsFVYwokRXCoEdvGu-aA", type: "start", lat: 40.7829, lon: -73.9654, name: "", image_url: "", day:1, intradayIndex: 0},
        {placeID: "ChIJgzD7uFfdskRXCoEdvGud-dv", type: "start", lat: 40.7829, lon: -73.9654, name: "", image_url: "", day:2, intradayIndex: 0},
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
    ];

    testingGeneratedPoints = [

    ]

    totalDays = 0;

    changedPoints = [];

    startPoints = [];

    generatedPoints=[];

    state = {
        // for testing
        points: [],
        isDayOptionsChosen : false,
        isInputEntered : false,
    }

    componentDidMount() {

    }

    onDayOptionsChosen = (e) => {
        this.totalDays = parseInt(e.key) + 1;
        const endPoint = 'initial_recommend';
        const username = 'John Smith'; // for testing
        /*
        fetch(`${API_ROOT}/${endPoint}?username=${username}&totalDays=${totalDays}`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            this.setState((prevState) => {
                return {
<<<<<<< HEAD
                    points: this.data.points, // what is the key?
=======
                    points: this.data.places,
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
                    isDayOptionsChosen: true
                }
            })

        }).catch((e) => {
            console.log(e.message);
        });
        */

        // for testing
        this.setState((prevState) => {
            return {
                points: this.testingPoints,
                isDayOptionsChosen: true
            };
        })
    }

<<<<<<< HEAD
    onSavePlacesButtonClick = () => {
        // Request
        const endPoint = 'update_places';
        /*fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
            body: JSON.stringify({"newSchedule": this.changedPoints}),
=======
    onSavePlacesButtonClick = (placeID, day, intradayIndex) => {
        // Request
        const endPoint = 'update_places';
        let obj = {placeID, day, intradayIndex};
        console.log(JSON.stringify({"newSchedule": [obj]}));
        /*fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
            body: JSON.stringify({"newSchedule": [obj]}),
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
            headers: {
                'Content-Type':'application/json'
            }
        }).catch((e) => {
            console.log(e.message);
        });
        */
<<<<<<< HEAD
        this.changedPoints =[];
=======
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755

    }

    onInputEntered = (day, e) => {
<<<<<<< HEAD

        //TODO convert address to place ID, lat, lon
        fetch(`${GOOGLE_GEOCODE_API}?address=${encodeURI(e.target.value)}&key=${PLACE_API_KEY}`, {
=======
        fetch(`${GOOGLE_GEOCODE_API}?address=${encodeURI(e.target.value)}&key=${PLACE_API_K}`, {
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            this.startPoints.push({
                placeID: data['results'][0]['place_id'],
                type: "start",
                lat: data['results'][0]['geometry']['location']['lat'],
                lon: data['results'][0]['geometry']['location']['lng'],
                name: "",
                image_url: "",
                day: day,
                intradayIndex: 0
            });
            console.log(this.startPoints);
            if (!this.state.isInputEntered) {
                this.setState((prevState) => {
                    return {
                        isInputEntered: true,
                    };
                });
            }
        }).catch((e) => {
            console.log(e.message);
        });

    }


    onGeneratePathsButtonPressed = () => {
        console.log("generate paths button pressed");
        const endPoint = 'generate_paths';
        console.log(JSON.stringify({"startPlaces": this.startPoints}));
        /*
        fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
<<<<<<< HEAD
            body: JSON.stringify({"newSchedule": this.changedPoints, "startPlaces": this.startPoints}),
=======
            body: JSON.stringify({"startPlaces": this.startPoints}),
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
            headers: {
                'Constent-Type':'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            // TODO: loading sign ?
            this.generatedPoints = data.places;

        }).catch((e) => {
            console.log(e.message);
        });

    }

    handleOnDayChange = (pointId, day) => {
        let dayNum = parseInt(day);
<<<<<<< HEAD
        this.changedPoints.push({placeID: pointId, day: dayNum});
=======
        //this.changedPoints.push({placeID: pointId, day: dayNum});
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
        var points = this.state.points;
        for (let i in points) {
            if (points[i]['placeID'] === pointId) {
                points[i]['day'] = dayNum;
                continue;
            }
        }

        this.setState((prevState) => {
            return {
<<<<<<< HEAD
                points:points.filter(pair => pair.day !== -1)
=======
                points:points.filter(point => point.day !== -1)
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
            };
        });

<<<<<<< HEAD
=======
        this.onSavePlacesButtonClick(pointId, day, -1);
    }

>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755

    render() {
        const dayOptionsMenu = (
            <Menu
                onClick={this.onDayOptionsChosen}
            >
                {
                    [...Array(15).keys()].map((i) =>
                        <Menu.Item key={i}>{`${i + 1} Days`}</Menu.Item>
                    )
                }
            </Menu>
        )

        return (
            <div>

                <WrappedTravelMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    points={this.state.points}
                    totalDays={this.totalDays}
                    handleOnDayChange={this.handleOnDayChange}
                />

                <div>

                    <Dropdown overlay={dayOptionsMenu} trigger={['click']}>
                        <button style={{ userSelect: 'none' }}>Day Options</button>
                    </Dropdown>


                    {this.state.isDayOptionsChosen ?
<<<<<<< HEAD
                        <button onClick={this.onSavePlacesButtonClick}>
                            Save Places
                        </button> : null
=======
                        [...Array(this.totalDays).keys()].map(i =>
                            <Input key={i} placeholder={`Day ${i+1} Start Address`} onPressEnter={(e) => this.onInputEntered(i, e)}/>)
                        : null
                    }

                    {//this.state.isInputEntered ?
                        <Link
                            onClick={this.onGeneratePathsButtonPressed}
                            to={{
                                pathname: "/detail",
                                state: {
                                    points: this.generatedPoints
                                }
                            }}>
                            Generate Paths
                        </Link> //: null
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
                    }
                </div>

<<<<<<< HEAD

                    {this.state.isDayOptionsChosen ?
                        [...Array(this.totalDays).keys()].map(i =>
                            <Input key={i} placeholder={`Day ${i+1} Start Address`} onPressEnter={(e) => this.onInputEntered(i, e)}/>)
                        : null
                    }

                    {this.state.isInputEntered ?
                        <Link
                            onClick={this.onGeneratePathsButtonPressed}
                            to={{
                                pathname: "/detail",
                                state: {
                                    points: this.generatedPoints
                                }
                            }}>
                            Generate Paths
                        </Link> : null
                    }
                </div>

=======
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
            </div>

        );
    }
}


