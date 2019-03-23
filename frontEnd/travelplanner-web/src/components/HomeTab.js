import React, { Component } from 'react';

import { TravelOverview } from "./TravelOverview"
import { TestPage } from "./TestPage" // for testing

import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class HomeTab extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"  component={TravelOverview} />
                    <Route path="/detail" component={TestPage} />

                </Switch>
            </BrowserRouter>
        );
    }
}

export default HomeTab;