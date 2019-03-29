import React from 'react';
import Spot from './Spot';
import '../styles/Swimlane.css';


export default class Swimlane extends React.Component {
    render() {
      

      const spot = this.props.spots.map(spot => {
        return (
          <Spot
            key={spot.id}
            id={spot.id}
            name={spot.name}
            day={spot.day}
            url={spot.url}
            start='start time'
            end='end time'
          />
        );
      })
    if (spot.length > 0) {
      return (
        <div className="Swimlane-column">
          <div className="Swimlane-title">{this.props.name}</div>
          <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
            {spot}
          </div>
        </div>);
    }
    else return (
      <div ref={this.props.dragulaRef}></div>
    );
  }
}
