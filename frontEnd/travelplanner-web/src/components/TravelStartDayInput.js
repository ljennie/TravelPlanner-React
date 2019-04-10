import React from 'react';
import {Dropdown} from './Dropdown';
import {AutoComplete} from 'antd'
import Autocomplete from "./Autocomplete";

//import 'antd/dist/antd.css';
//import './index.css';
const AddressDetails = (props) => {
  return (
    <div></div>
  )
};

export class TravelStartDayInput extends React.Component {
    state = {
        place: {}
    };

    startPoints = [];
    generatedPoints =[];
    prevDay = 0;

    showPlaceDetails = (place) => {
        this.setState({ place });
        console.log(place);
    }

    handleDropdownClick = (day) => {
        const obj = {
            placeID:"",
            type: "start",
            lat:"",
            lon:"",
            name: this.auto.autocompleteInput.current.value,
            imageURL: "",
            day: this.prevDay,
            intradayIndex: 0

        }
        console.log(obj)
        // TODO: push prev to startPoints

        // TODO: clear Autocomplete
        this.auto.autocompleteInput.current.value = "";
        // TODO: mark start point on map
        this.prevDay = day;
    }

    handleGenerateButtonPressed = () => {
        this.props.handleGenerateButtonPressed(this.generatedPoints);
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
                <AddressDetails place={this.state.place} />
            </div>
        </div>
    );
  };
}



