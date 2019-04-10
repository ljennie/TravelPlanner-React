import React from 'react';
import {Dropdown} from './Dropdown';
import {AutoComplete} from 'antd'
import Autocomplete from "./Autocomplete";
import {API_ROOT} from "../constants"

//import 'antd/dist/antd.css';
//import './index.css';

export class TravelStartDayInput extends React.Component {

    startPoints = [];
    generatedPoints =[];
    prevDay = 0;

    /*showPlaceDetails = (place) => {
        //this.setState({ place });
        //console.log(place);
    }*/

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
        let updated = false;
        for (let i = 0; i < this.startPoints.length; i++) {
            if (this.startPoints[i].day === obj.day) {
                this.startPoints[i] = obj;
                updated = true;
                break;
            }
        }
        if (!updated) {
            this.startPoints.push(obj);
        }
    }

    handleDropdownClick = (day) => {
        this.updateStartPoints();

        // clear Autocomplete
        this.auto.autocompleteInput.current.value = "";

        this.prevDay = day;
        this.setState()
        // TODO: mark start point on map
    }

    handleGenerateButtonPressed = () => {
        this.updateStartPoints();

        // sort startPoints
        const compare = function (obj1, obj2) {
            const day1 = obj1.day;
            const day2 = obj2.day;
            if (day1 < day2) {
                return -1;
            } else if (day1 > day2) {
                return 1;
            } else {
                return 0;
            }
        }

        this.startPoints.sort(compare);

        // interpolation
        const allStartPoints = [this.startPoints[0]];
        for (let i = 1; i < this.props.totalDays; i++) {
            for (let j = 1; j < this.startPoints.length; j++) {
                if (i === this.startPoints[j].day) {
                    allStartPoints.push(this.startPoints[j]);
                } else {
                    allStartPoints.push(allStartPoints[i - 1]);
                }
            }
         }
        const endPoint = 'GeneratePaths';
        fetch(`${API_ROOT}/${endPoint}`, {
            method: 'POST',
            body: JSON.stringify({"userID": this.props.userID, "startPlaces": allStartPoints}),
            headers: {
                'Constent-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            this.generatedPoints = data.places;
            this.props.handleGenerateButtonPressed(this.generatedPoints);
        }).catch((e) => {
            console.log(e.message);
        })


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
            </div>

            <button onClick={this.handleGenerateButtonPressed}>GeneratePath</button>
        </div>
    );
  };
}



