import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import HomeTab from './HomeTab';
import Navigation from './Navigation';
import Board from './Board';
import { TravePlan } from './TravelPlan';
import '../styles/App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  renderPlanDetails() {
    return (<Board/>);
  }
  renderTravelPlan() {
    return (<TravePlan/>);
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
        return <HomeTab />;
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

export default App;
