import React from 'react';
import Card from './Card';
import '../styles/Swimlane.css';


export default class Swimlane extends React.Component {
    render() {
      const cards = this.props.spots.map(spot => {
        return (
          <Card
            key={spot.id}
            id={spot.id}
            name={spot.name}
            day={spot.day}
          />
        );
      })
      return (
        <div className="Swimlane-column">
          <div className="Swimlane-title">{this.props.name}</div>
          <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
            {cards}
          </div>
        </div>);
    }
  }
  