import React from 'react';
import {Dropdown} from './Dropdown';
import {Autocomplete} from "./Autocomplete";
import { API_ROOT } from "../constants"

//import 'antd/dist/antd.css';
//import './index.css';

export class TravelStartDayInput extends React.Component {

    startPoints = null;
    generatedPoints =[];
    prevDay = 0;

    /*showPlaceDetails = (place) => {
        //this.setState({ place });
        //console.log(place);
    }*/
    componentDidUpdate() {
        if (this.startPoints === null && this.props.totalDays > 0) {
            this.startPoints = Array(this.props.totalDays).fill({});
        }
        console.log("totalDays", this.props.totalDays);
    }
    updateStartPoints = () => {
        const place = this.auto.autocomplete.getPlace();
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
        console.log(obj);
        // update prev to startPoints
        this.startPoints[this.prevDay] = obj;
        for (let i = this.prevDay + 1; i < this.props.totalDays; i++) {
            if (Object.keys(this.startPoints[i]).length === 0) {
                this.startPoints[i] = this.startPoints[i - 1];
            } else {
                break;
            }
        }

    }

    handleDropdownClick = (day) => {
        this.updateStartPoints();

        // clear Autocomplete
        this.auto.autocompleteInput.current.value = "";

        this.prevDay = day;

        // TODO: mark start point on map
    }

    handleGenerateButtonPressed = () => {
        //TODO: validation firstday

        this.updateStartPoints();

        const endPoint = 'GeneratePaths';
        console.log(JSON.stringify({"userID": this.props.userID, "startPlaces": this.startPoints}));
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
            this.generatedPoints = data.places;
            // TODO: 跳转动画
            this.props.handleGenerateButtonPressed(this.generatedPoints);
        }).catch((e) => {
            console.log(e.message);
        })

        //TODO: validation all days


    }

    render () {
    return (
        <div className="div">
            <div className="Dropdown">
                <Dropdown handleDropdownClick={this.handleDropdownClick}
                          totalDays={this.props.totalDays}/>
            </div>

            <div className="Address">
                <Autocomplete onPlaceChanged={this.showPlaceDetails}
                              handleGenerateButtonPressed={this.handleGenerateButtonPressed}
                              ref={(input) => { this.auto = input; }}/>
                <button onClick={this.handleGenerateButtonPressed}>GeneratePath</button>
            </div>


        </div>
    );
  };
}



