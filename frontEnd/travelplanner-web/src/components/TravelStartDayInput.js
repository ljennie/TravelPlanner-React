import React from 'react';
import {Dropdown} from './Dropdown';
import {Autocomplete} from "./Autocomplete";
import { API_ROOT } from "../constants"
import {notification,Button} from  'antd'

//import 'antd/dist/antd.css';
//import './index.css';
const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Warning!',
      description: 'Please enter the start address!',
    });
  };
export class TravelStartDayInput extends React.Component {
    message= ""
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
       if(typeof(place) != "undefined"){
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
            console.log("obj" );
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
    } 
    


    handleDropdownClick = (day) => {
        //this.updateStartPoints();

        // clear Autocomplete
        this.auto.autocompleteInput.current.value = "";

        this.prevDay = day;

        // TODO: mark start point on map
    }

    handleGenerateButtonPressed = () => {
        //TODO: validation firstday

        this.updateStartPoints();
        if(this.startPoints[this.startPoints.length-1].name==null){
            console.log(this.startPoints);
            console.log(this.day);
            openNotificationWithIcon('warning')
        }
        else{
        
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

    }

    render () {
    return (
        <div className="div" style={{ margintop:"30px",textAlign:"left",display:"block"}}>
            <div className="Dropdown" style={{position:"absolute"}}>
                <Dropdown handleDropdownClick={this.handleDropdownClick}
                          totalDays={this.props.totalDays}/>
            </div>

            <div className="Address" style={{position:"absolute", marginTop:"50px"}} >
                <Autocomplete onPlaceChanged={this.showPlaceDetails}
                              handleGenerateButtonPressed={this.handleGenerateButtonPressed}
                              ref={(input) => { this.auto = input; }}/>
                <Button   className="button-font generate" style={{position:"absolute", marginTop:"50px"}} onClick={this.handleGenerateButtonPressed}>GeneratePath</Button>
               
            </div>

        </div>
    );
  };
}



