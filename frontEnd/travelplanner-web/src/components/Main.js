import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import {TravelPlan} from "./TravelPlan";
import {TravelOverview} from "./TravelOverview";
import {TestPage} from "./TestPage";


export class Main extends React.Component {
    getHome = () => {
        return this.props.isLoggedIn ? <Home userID={this.props.userID}/> : <Redirect to="/login"/>;
    }

    getLogin = () => {
        //console.log('get login')
        //console.log(this.props.userID)
        //console.log(this.props.isLoggedIn)
        let userID = this.props.userID
        return this.props.isLoggedIn ? <Redirect to= '/home' />
            : <Login handleLogin={this.props.handleLogin}/>
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