import React from 'react';
//import $ from 'jquery'
//import { Tabs, Spin, Row, Col, Radio } from 'antd';
import { API_ROOT } from "../constants"
//import { DaysOptionsButton } from "./DaysOptionsButton";
//import { GeneratePathsButton } from "./GeneratePathsButton";

import { WrappedTravelMap } from "./TravelMap";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Input } from 'antd';

export class TravelOverview extends React.Component {

    testingPoints =  [
        {pointId: 0, type: "poi", lat: 40.7829, lon: -73.9654, poi_name: "central park", image_url: "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", day:1, index_in_the_day: -1},
        {pointId: 1, type: "poi", lat: 40.7794, lon: -73.9632, poi_name: "The Metropolitan Museum of Art", image_url: "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", day: 2, index_in_the_day: -1},
        {pointId: 2, type: "poi", lat: 40.7614, lon: -73.9776, poi_name: "MoMa", image_url: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day: 2, index_in_the_day: -1},
        {pointId: 3, type: "poi", lat: 40.7425, lon: -74.0061, poi_name: "Chelsea Market", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day:3, index_in_the_day: -1},
        {pointId: 4, type: "poi", lat: 40.7308, lon: -73.9973, poi_name: "Washington Square Park", image_url:"https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day:3, index_in_the_day: -1},
        {pointId: 5, type: "poi", lat: 40.8296, lon: -73.9262, poi_name: "Yankee Stadium", image_url: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day:3, index_in_the_day: -1}
    ];

    totalDays = 0;

    changedPoints = [];

    start_points = [
        {pointId: 1000, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day:1, index_in_the_day: 0},
        {pointId: 1001, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day:3, index_in_the_day: 0},
        {pointId: 1002, type: "start", lat: 40.7829, lon: -73.9654, poi_name: "", image_url: "", day:2, index_in_the_day: 0},
    ];

    state = {
        // for testing
        points: [],
        isDayOptionsChosen : false,
        isInputEntered : false,
        totalDays : 0
    }

    componentDidMount() {

    }

    onPointsChange(data) {
        this.setState({points: data ? data : []});
    }


     // /initial_recommend
     // response json:
     // { "points" : [
     //     {pointId: 0, type: "poi", lat: 40.7829, lon: -73.9654, poi_name: "central park", image_url: "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", day:1, index_in_the_day: -1},
     //     {pointId: 1, type: "poi", lat: 40.7794, lon: -73.9632, poi_name: "The Metropolitan Museum of Art", image_url: "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", day: 2, index_in_the_day: -1},
     //     {pointId: 2, type: "poi", lat: 40.7614, lon: -73.9776, poi_name: "MoMa", image_url: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day: 2, index_in_the_day: -1},
     //     {pointId: 3, type: "poi", lat: 40.7425, lon: -74.0061, poi_name: "Chelsea Market", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day:3, index_in_the_day: -1},
     //     {pointId: 4, type: "poi", lat: 40.7308, lon: -73.9973, poi_name: "Washington Square Park", image_url:"https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day:3, index_in_the_day: -1},
     //     {pointId: 5, type: "poi", lat: 40.8296, lon: -73.9262, poi_name: "Yankee Stadium", image_url: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day:3, index_in_the_day: -1}
     // ]}



    onDayOptionsChosen = (e) => {
        this.totalDays = parseInt(e.key);
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
            this.onPointsChange(data.points);

        }).catch((e) => {
            this.setState({isLoadingPosts: false, error: e.message})
        });
        */

        this.onPointsChange(this.testingPoints); // for testing

        this.setState((prevState) => {
            return {
                isDayOptionsChosen: true
            };
        })
    }


    // /generate_paths
    // request json:
    // {
    //     "pointId_day_array": [[1, 2],[3, 1],[5, 2]],
    //     "start_points": [
    //         {pointId: 1000, type: "start", lat: x, lon: x, poi_name: "", image_url: "", day:1, index_in_the_day: 0},
    //         {pointId: 1001, type: "start", lat: x, lon: x, poi_name: "", image_url: "", day:3, index_in_the_day: 0},
    //         {pointId: 1002, type: "start", lat: x, lon: x, poi_name: "", image_url: "", day:2, index_in_the_day: 0}
    //     ]
    // }
    //
    //
    // response json:
    // {
    //     "points" : [
    //         {pointId: 0, type: "poi", lat: 40.7829, lon: -73.9654, poi_name: "central park", image_url: "https://thenypost.files.wordpress.com/2018/07/central-park-conservancy.jpg?quality=90&strip=all&w=618&h=410&crop=1", day:2, index_in_the_day: 4},
    //         {pointId: 1, type: "poi", lat: 40.7794, lon: -73.9632, poi_name: "The Metropolitan Museum of Art", image_url: "https://cdn.getyourguide.com/img/tour_img-210854-148.jpg", day: 2, index_in_the_day: 2},
    //         {pointId: 2, type: "poi", lat: 40.7614, lon: -73.9776, poi_name: "MoMa", image_url: "https://images.musement.com/cover/0001/31/moma-museum-of-modern-art-tickets-tours-jpg_header-30520.jpeg?&q=60&fit=crop&lossless=true&auto=format&w=412&h=250", day: 2, index_in_the_day: 1},
    //         {pointId: 3, type: "poi", lat: 40.7425, lon: -74.0061, poi_name: "Chelsea Market", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Chelsea_Market.jpg/350px-Chelsea_Market.jpg", day:1, index_in_the_day: 2},
    //         {pointId: 4, type: "poi", lat: 40.7308, lon: -73.9973, poi_name: "Washington Square Park", image_url:"https://media.cntraveler.com/photos/55f6f83ef36883a0540d6845/4:5/w_767,c_limit/Washington-Square-Park-cr-getty.jpg", day:3, index_in_the_day: 1},
    //         {pointId: 5, type: "poi", lat: 40.8296, lon: -73.9262, poi_name: "Yankee Stadium", image_url: "https://www.wheretraveler.com/sites/default/files/styles/wt17_promoted_large/public/images/YANKEE%20STADIUM_OVE%23747D12.jpg?itok=KHnOsPcI&timestamp=1451406398", day:2, index_in_the_day: 3}
    //         {pointId: 1000, type: "start", lat: x, lon: x, poi_name: "", image_url: "", day:1, index_in_the_day: 0},
    //         {pointId: 1001, type: "start", lat: x, lon: x, poi_name: "", image_url: "", day:3, index_in_the_day: 0},
    //         {pointId: 1002, type: "start", lat: x, lon: x, poi_name: "", image_url: "", day:2, index_in_the_day: 0}
    //     ],
    //
    //     "steps" : [
    //         {},
    //         {},
    //         {},
    //         {},
    //         {},
    //         ...
    //     ]
    // }


    onGeneratePathsButtonPressed = () => {
        console.log("generate paths button pressed");
        /*
        const endPoint = 'generate_paths';
        fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
            body: JSON.stringify({"points": this.changedPoints, "start_points": this.start_points}),
            headers: {
                'Constent-Type':'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            // TODO: loading sign ?
            // TODO: route to detail with data
            //data.points



        }).catch((e) => {
            this.setState({isLoadingPosts: false, error: e.message})
        });
        */

    }

    handleOnDayChange = (pointId, day) => {
        let day_num = parseInt(day) === 0 ? -1 : parseInt(day);
        this.changedPoints.push([pointId, day]);
        var points = this.state.points;
        for (let i in points) {
            if (points[i]['pointId'] === pointId) {
                points[i]['day'] = day_num;
                continue;
            }
        }
        this.setState((prevState) => {
            return {
                points:points.filter(pair => pair.day !== -1)
            };
        });
    }

    handleStartPoints = () => {
        //TODO: change address to lat, lon
        //TODO: store starting points, add to points and setState

    }

    onSavePlacesButtonClick = () => {
        // Request
        const endPoint = 'update_places';
        /*fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
            body: JSON.stringify({"pointId_day_array": this.changedPoints}),
            headers: {
                'Content-Type':'application/json'
            }
        }).catch((e) => {
            this.setState({isLoadingPosts: false, error: e.message})
        });
        */

    }

    onInputEntered = (day) => {
        this.setState((prevState) => {
            return {
                isInputEntered : true
                // TODO start_points
            };
        });
    }

    render() {
        const dayOptionsMenu = (
            <Menu
                onClick={this.onDayOptionsChosen}
            >
                {
                    [...Array(15).keys()].map((i) =>
                        <Menu.Item key={i + 1}>{`${i + 1} Days`}</Menu.Item>
                    )
                }
             </Menu>
        )
        const { TextArea } = Input;
        return (
            <div>

                <WrappedTravelMap

                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `600px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    points={this.state.points}
                    handleOnDayChange={this.handleOnDayChange}
                    //loadNearbyPosts={this.loadNearbyPosts}
                />

                <div>
                    {this.state.isInputEntered ?
                        <Link
                            onClick={this.onGeneratePathsButtonPressed}
                            to={{
                                pathname: "/detail",
                                state: {
                                    points: this.state.points
                                }
                            }}>
                            Generate Paths
                        </Link> : null
                    }

                    <Dropdown overlay={dayOptionsMenu} trigger={['contextMenu']}>
                        <button style={{ userSelect: 'none' }}>Day Options</button>
                    </Dropdown>


                    {this.state.isDayOptionsChosen ?
                        <button onClick={this.onSavePlacesButtonClick}>
                            Save Places
                        </button> : null
                    }

                    {this.state.isDayOptionsChosen ?
                        [...Array(this.totalDays).keys()].map(i =>
                            <Input key={i+1} placeholder={`Day ${i+1} Start Address`} onPressEnter={() => this.onInputEntered(i)}/>)
                        : null
                    }

                    </div>
            </div>
        );
    }
}

