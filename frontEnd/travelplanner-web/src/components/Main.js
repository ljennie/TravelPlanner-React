import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import {TravelPlan} from "./TravelPlan"
import {TravelOverview} from "./TravelOverview"


export class Main extends React.Component {
    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>
    }

    getRoot = () => {
        return <Redirect to="/login"/>
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/register" component={Register}/> //router has one props(history)
                    <Route path="/home" render={this.getHome}/>
                    <Route exact path="/home"  component={TravelOverview} />
                    <Route exact path="/detail" component={TravelPlan} />
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}