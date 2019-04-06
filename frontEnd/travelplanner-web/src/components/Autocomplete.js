/* global google */

import React from "react";
import {Form, Select} from 'antd'
import {formItemLayout} from '../constants';
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      { types: ["geocode"] }
    );
    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.props.onPlaceChanged(place);
  }

  render() {
    return (
      <div>
        <span className="Autocomplete">
          <input className="input"
            ref={this.autocompleteInput}
            id="autocomplete"
            placeholder="Enter your start point"
            type="text"
          />
        </span>
        <span className="Autocomplete">
          <input className= "Generate" type="submit"  value="Generate" role="button">
          </input>
        </span>
      </div>
    );
  }
}

export default Autocomplete;

