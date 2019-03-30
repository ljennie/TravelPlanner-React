import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import { Header} from "./Header"
import { Main } from "./Main"
import { TOKEN_KEY} from "../constants"


class App extends Component {

<<<<<<< HEAD
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  //renderPlanDetails() {
    //return (<Board/>);
  //}
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
      //case 'details':
        //return this.renderPlanDetails();
      case 'travelplan':
      return this.renderTravelPlan();
=======
    state = {
        isLoggedIn: Boolean(localStorage.getItem('TOKEN_KEY'))
    }

    handleLogin = (token) => {
        localStorage.setItem('TOKEN_KEY', token);
        this.setState({isLoggedIn: true});
>>>>>>> de14eec8764e2a547c00aeca6fd681821c2e8755
    }

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    }

    render() {
        return (
            <div className="App">
                <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
            </div>
        );
    }


}

export default App;
