import React from 'react';
import {Dropdown} from './Dropdown';
import {AutoComplete} from 'antd'
import Autocomplete from "./Autocomplete";

//import 'antd/dist/antd.css';
//import './index.css';
const AddressDetails = props => {
  return (
    <div></div>
  )
};
export class TravelStartDayInput extends React.Component {
  state = {
    place: {}
  };


  showPlaceDetails(place) {
    this.setState({ place });
  }
  render () {
    return (
      <div className="div">
        <div className="Dropdown">
          <Dropdown/>
        </div>
        <div className="Address">
          <Autocomplete onPlaceChanged={this.showPlaceDetails.bind(this)} />
          <AddressDetails place={this.state.place} />
        </div>
      </div>
    );
  };
}



