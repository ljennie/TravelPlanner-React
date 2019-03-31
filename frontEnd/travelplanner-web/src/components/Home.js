import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
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

    homeCallback = (pts, tds) => {
        console.log("home callback");
        this.points = pts;
        this.totalDays = tds;
        this.changeTab('travelplan');
    }

    renderOverview() {
        return (<TravelOverview homeCallback={this.homeCallback} />)
    }
    renderPlanDetails() {
        // return (<Board points={this.points} totalDays={this.totalDays}/>);
        return (<TestPage points={this.points} totalDays={this.totalDays}/>);
    }
    renderTravelPlan() {
       //return (<TravelPlan points={this.points} totalDays={this.totalDays}/>);
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