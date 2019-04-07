import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './Navigation';
import Board from './Board';
import { TravelPlan } from './TravelPlan';
import '../styles/App.css';
import {TravelOverview} from "./TravelOverview"
import {TestPage} from './TestPage';
import {API_ROOT} from "../constants"


export class Home extends React.Component{

    state = {
        selectedTab: 'traveloverview',
        isDone: false
    };

    points = [];
    totalDays = 0;
    isDayOptionsChosen = false;

    componentWillMount() {
        const endPoint = 'GeneratePaths';
        fetch(`${API_ROOT}/${endPoint}?userID=${this.props.userID}}`, {
            method: 'GET',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            console.log(data);
            console.log(data.places);
            if (typeof(data.places) === "undefined") {
                this.setState((prev) => {
                    return {
                        isDone: true
                    };
                });
            }
            else {

                const savedPoints = data.places.filter(place => place['type'] === "poi");
                const startPoints = data.places.filter(place => place['type'] === "start");
                if (startPoints.length > 0) {
                    // TODO: add address to input form
                    }
                else {
                    // TODO: disable tab
                }
                this.totalDays = Math.max.apply(Math, savedPoints.map((o) => {
                    return o.day
                })) + 1;
                this.homeCallback(data.places, this.totalDays, false);
                this.isDayOptionsChosen = true;
                this.setState((prev) => {
                    return {
                        isDone: true
                    };
                });
            }

        }).catch((e) => {
            console.log(e.message);
        });

    }

    homeCallback = (pts, tds, routeToTravelPlan=true) => {
        console.log("home callback");
        this.points = pts;
        this.totalDays = tds;
        if (routeToTravelPlan) {
            this.changeTab('travelplan');
        }

    }

    homeTravelPlanCallback = (backendObjArray) => {
        console.log("home-travelplan callback");
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < backendObjArray.length; j++) {
                if (this.points[i].placeID === backendObjArray[j].placeID) {
                    this.points[i].day = backendObjArray[j].day;
                    this.points[i].intradayIndex = backendObjArray[i].intradayIndex;
                }
            }
        }
    }

    homeBoardCallback = (backendObjArray) => {
        console.log("home-board callback");
        for (let i = 0; i < this.points.length; i++) {
            for (let j = 0; j < backendObjArray.length; j++) {
                if (this.points[i].placeID === backendObjArray[j].placeID) {
                    this.points[i].day = backendObjArray[j].day;
                    this.points[i].intradayIndex = backendObjArray[i].intradayIndex;
                }
            }
        }
    }

    renderOverview() {
        console.log(this.props)
        return (<TravelOverview points={this.points} totalDays={this.totalDays} userID={this.props.userID} homeCallback={this.homeCallback} isDayOptionsChosen={this.isDayOptionsChosen}/>)
    }
    renderPlanDetails() {
        return (
                 <Board points={this.points} totalDays={this.totalDays} userID={this.props.userID} homeBoardCallback={this.homeBoardCallback}/>
               );
        //return (<TestPage points={this.points} totalDays={this.totalDays}/>);
    }
    renderTravelPlan() {
       return (<TravelPlan points={this.points} totalDays={this.totalDays} userID={this.props.userID} homeTravelPlanCallback={this.homeTravelPlanCallback}/>);
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
            {this.state.isDone ?
                <div className="App-body">
                    {this.renderTabContent()}
                </div>
                : null
            }
        </div>
      );
    }
}