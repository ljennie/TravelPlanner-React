import React from 'react';
import {Dropdown} from './Dropdown';
import {Autocomplete} from "./Autocomplete";
import { API_ROOT } from "../constants"

//import 'antd/dist/antd.css';
//import './index.css';

export class TravelStartDayInput extends React.Component {

    startPoints = []; // with order
    generatedPoints =[];
    prevDay = 0;

    /*showPlaceDetails = (place) => {
        //this.setState({ place });
        //console.log(place);
    }*/

    componentWillMount() {
        if (this.props.totalDays > 0) {
            this.startPoints = Array(this.props.totalDays).fill({});

            for (let i = 0; i < this.props.startPoints.length; i++) {
                const startPoint = this.props.startPoints[i];
                const {day} = startPoint;
                this.startPoints[day] = startPoint;
            }
        }


    }

    componentWillUpdate() {
        if (this.props.totalDays > 0) {
            this.startPoints = Array(this.props.totalDays).fill({});

            for (let i = 0; i < this.props.startPoints.length; i++) {
                const startPoint = this.props.startPoints[i];
                const {day} = startPoint;
                this.startPoints[day] = startPoint;
            }
        }
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
        // console.log(obj);
        // update prev to startPoints
        this.startPoints[this.prevDay] = obj;

        // mark start point on map
        this.props.addStartPoint(obj);

        // do interpolation here to reduce the burden on generate paths
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

        // clear autocomplete input
        this.auto.autocompleteInput.current.value = "";

        this.prevDay = day;

    }

    handleGenerateButtonPressed = () => {
        //TODO: validation firstday

        this.updateStartPoints();

        const endPoint = 'GeneratePaths';
        //console.log(JSON.stringify({"userID": this.props.userID, "startPlaces": this.startPoints}));

        this.props.isGeneratingPath();

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
                              ref={(input) => { this.auto = input; }}
                              placeholder={
                                  (this.startPoints.length !== 0 && Object.keys(this.startPoints[this.prevDay]).length === 0) ?
                                      this.startPoints[this.prevDay].name :
                                      `Please enter start place for Day ${this.prevDay + 1}`}/>
                <button onClick={this.handleGenerateButtonPressed}>GeneratePath</button>
            </div>


        </div>
    );
  };
}



