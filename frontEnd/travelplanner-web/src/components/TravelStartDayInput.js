import React from 'react';
import {Dropdown} from './Dropdown';
import {Autocomplete} from "./Autocomplete";
import { API_ROOT } from "../constants"

//import 'antd/dist/antd.css';
//import './index.css';

export class TravelStartDayInput extends React.Component {

    startPoints = []; // with order
    prevDay = 0;
    curObj = {};

    componentWillMount() {
        console.log("TravelStartDayInput will mount");
        if (this.props.totalDays > 0) {
            this.startPoints = Array(this.props.totalDays).fill({});

            for (let i = 0; i < this.props.startPoints.length; i++) {
                const startPoint = this.props.startPoints[i];
                const {day} = startPoint;
                this.startPoints[day] = startPoint;
                if (day === 0) {
                    this.curObj = startPoint;
                }

            }
        }


    }

    componentDidMount() {
        console.log("TravelStartDayInput did mount");

    }

    componentWillUpdate() {
        console.log("TravelStartDayInput will update");
        if (this.props.totalDays > 0) {
            this.startPoints = Array(this.props.totalDays).fill({});

            for (let i = 0; i < this.props.startPoints.length; i++) {
                const startPoint = this.props.startPoints[i];
                const {day} = startPoint;
                this.startPoints[day] = startPoint;
                if (day === 0) {
                    this.curObj = startPoint;
                }
            }
        }
    }

    componentWillUnmount() {
        console.log("TravelStartDayInput will unmount");
    }

    handlePlaceChanged = (place) => {
        const obj = {
            placeID: place.place_id,
            type: "start",
            lat: place.geometry.location.lat(),
            lon: place.geometry.location.lng(),
            name: place.name,
            imageURL: "",
            day: this.prevDay,
            intradayIndex: 0
        }
        // console.log(obj);
        // update prev to startPoints
        this.startPoints[this.prevDay] = obj;
        this.curObj = obj;

        // mark start point on map
        this.props.onPlaceChanged(obj);
    }

    handleDropdownClick = (day) => {
        this.curObj = this.startPoints[day];

        for (let i = this.prevDay + 1; i < this.props.totalDays; i++) {
            if (Object.keys(this.startPoints[i]).length === 0) {
                this.startPoints[i] = this.startPoints[i - 1];
            } else {
                break;
            }
        }

        // clear autocomplete input
        this.auto.autocompleteInput.current.value = "";

        this.prevDay = day;

    }

    handleGenerateButtonPressed = () => {
        //TODO: validation firstday

        this.props.onGenerateButtonPressed();

        for (let i = this.prevDay + 1; i < this.props.totalDays; i++) {
            if (Object.keys(this.startPoints[i]).length === 0) {
                this.startPoints[i] = this.startPoints[i - 1];
            } else {
                break;
            }
        }

        const endPoint = 'GeneratePaths';
        //console.log(JSON.stringify({"userID": this.props.userID, "startPlaces": this.startPoints}));

        fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
            body: JSON.stringify({"userID": this.props.userID, "startPlaces": this.startPoints}),
            headers: {
                'Constent-Type': 'text/plain'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            this.props.onGeneratePathsObtained(data.places);
        }).catch((e) => {
            console.log(e.message);
        })


        //TODO: validation all days


    }


    render () {
    return (
        <div className="div">
            <div className="Dropdown">
                <Dropdown onDropdownClick={this.handleDropdownClick}
                          totalDays={this.props.totalDays}/>
            </div>


            <div className="Address">
                <Autocomplete onPlaceChanged={this.handlePlaceChanged}
                              ref={(input) => { this.auto = input; }}
                />
                <button onClick={this.handleGenerateButtonPressed}>GeneratePath</button>
            </div>


        </div>
    );
  };
}



