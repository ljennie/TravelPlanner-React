import React from 'react';
import '../styles/Card.css';

export default class Card extends React.Component {
  render() {
    let className = ['Card'];
    return (
      <div className={className.join(' ')} data-id={this.props.id} data-day={this.props.day}>
        <div className="Card-title">{this.props.name}</div>
      </div>
    );
  }
}