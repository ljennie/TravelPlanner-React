import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation';
import Board from './Board';
import { TravelPlan } from './TravelPlan';
import '../styles/App.css';
import {TravelOverview} from "./TravelOverview"
import {TestPage} from './TestPage';


export class Home extends React.Component{

    state = {
        selectedTab: 'traveloverview',

    };

    points = [];
    totalDays = 0;

    homeCallback = (pts, tds, routeToTravelPlan=true) => {
        console.log("home callback");
        this.points = pts;
        this.totalDays = tds;
        if (routeToTravelPlan) {
            this.changeTab('travelplan');
        }

    }

    renderOverview() {
        console.log(this.props)
        return (<TravelOverview homeCallback={this.homeCallback} userID={this.props.userID}/>)
    }
    renderPlanDetails() {
        return (
                 <Board points={this.points} totalDays={this.totalDays} userID={this.props.userID}/> 
               );
        //return (<TestPage points={this.points} totalDays={this.totalDays}/>);
    }
    renderTravelPlan() {
       return (<TravelPlan points={this.points} totalDays={this.totalDays} userID={this.props.userID}/>);
    }
    renderNavigation() {
      return (<Navigation
        onClick={(tabName) => this.changeTab(tabName)}
        selectedTab={this.state.selectedTab}
      />);
    }

    renderTabContent() {
      switch (this.state.selectedTab) {
        case 'traveloverview':
        default:
          return this.renderOverview();
        case 'details':
          return this.renderPlanDetails();
        case 'travelplan':
        return this.renderTravelPlan();
      }
    }

    changeTab(tabName) {
      this.setState((prevState) => {
          return {
              selectedTab: tabName,
          };
      });
    }

    render() {
      return (
        <div className="App">
          {this.renderNavigation()}
          <div className="App-body">
            {this.renderTabContent()}
          </div>
        </div>
      );
    }
}