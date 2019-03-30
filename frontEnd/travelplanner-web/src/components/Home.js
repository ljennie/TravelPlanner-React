import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import { TravelPlan } from './TravelPlan';
import '../styles/App.css';
import {TravelOverview} from "./TravelOverview"

export class Home extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'home',
      };
    }
    renderOverview(){
        return (<HomeTab/>)
    }
    renderPlanDetails() {
      return (<Board/>);
    }
    renderTravelPlan() {
      return (<TravelPlan/>);
    }
    renderNavigation() {
      return (<Navigation
        onClick={(tabName) => this.changeTab(tabName)}
        selectedTab={this.state.selectedTab}
      />);
    }

    renderTabContent() {
      switch (this.state.selectedTab) {
        case 'home':
        default:
          return this.renderOverview();
        case 'details':
          return this.renderPlanDetails();
        case 'travelplan':
        return this.renderTravelPlan();
      }
    }

    changeTab(tabName) {
      this.setState({
        selectedTab: tabName,
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