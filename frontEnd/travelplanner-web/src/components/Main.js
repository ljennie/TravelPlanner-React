import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import {TravelPlan} from "./TravelPlan"
import {TravelOverview} from "./TravelOverview"


export class Main extends React.Component {
    userID="";

    handleUserID = (userID) => {
        this.userID = userID;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to={{ pathname: '/home', state: {userID: this.userID}}} />
            : <Login handleLogin={this.props.handleLogin} handleUserID={this.handleUserID}/>
    }

    getRoot = () => {
        return <Redirect to="/login"/>
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/register" component={Register}/> //router has one props(history)
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}