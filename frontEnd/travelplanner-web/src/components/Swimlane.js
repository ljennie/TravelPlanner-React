import React from 'react';
import Spot from './Spot';
import '../styles/Swimlane.css';


export default class Swimlane extends React.Component {
    render() {
      

      const spot = this.props.spots.map(spot => {
        return (
          <Spot
            key={spot.placeID}
            id={spot.intradayIndex + 1}
            name={spot.name}
            day={spot.day}
            url={spot.url}
            start='start time'
            end='end time'
          />
        );
      })
    if (spot.length >= 0) {
      return (
        <div className="Swimlane-column">
          <div className="Swimlane-title">{this.props.name}</div>
          <div className="Swimlane-dragColumn" id={this.props.id} ref={this.props.dragulaRef} key={Math.random()}>
            {spot}
          </div>
        </div>);
    }
    else return (
      <div ref={this.props.dragulaRef}></div>
    );
  }
  
}
