import React, { Component } from 'react';

import { TravelOverview } from "./TravelOverview"
import {TravelPlan} from "./TravelPlan"
import { TestPage } from "./TestPage" // for testing
import {Register} from "./Register"
import {Login} from "./Login"
import { POS_KEY} from "../constants"

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class HomeTab extends Component {

    getLogin = () => {
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path = "/register" component={Register}/>
                    <Route path = "/login" component={Login} />
                    <Route exact path="/home"  component={TravelOverview} />
                    <Route exact path="/detail" component={TestPage} />

                </Switch>
            </BrowserRouter>
        );
    }
}

export default HomeTab;