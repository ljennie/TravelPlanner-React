import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a className={"nav-link " + (this.props.selectedTab === 'home' ? 'active': '')} onClick={() => this.props.onClick("home")}
            id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected={this.props.selectedTab === 'home'}>Home</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + (this.props.selectedTab === 'travelplan' ? 'active': '')} onClick={() => this.props.onClick("travelplan")}
          id="travelplan-tab" data-toggle="tab" href="#travelplan" role="tab" aria-controls="travelplan" aria-selected={this.props.selectedTab === 'travelplan'}>TravelPlan</a>
        </li>
        <li className="nav-item">
          <a className={"nav-link " + (this.props.selectedTab === 'details' ? 'active': '')} onClick={() => this.props.onClick("details")}
          id="details-tab" data-toggle="tab" href="#details" role="tab" aria-controls="details" aria-selected={this.props.selectedTab === 'details'}>PlanDetail</a>
        </li>
      </ul>
    );
  }
}