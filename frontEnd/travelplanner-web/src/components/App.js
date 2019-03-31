import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import { Header} from "./Header"
import { Main } from "./Main"
import { TOKEN_KEY} from "../constants"
import {TravelPlan} from "./TravelPlan"
import {SortableComponent} from "./SortableList"
import { TravelOverview } from './TravelOverview';
    


class App extends Component {

    state = {
        //isLoggedIn: Boolean(localStorage.getItem('TOKEN_KEY'))
        isLoggedIn:true // for testing
    }

    handleLogin = (token) => {
        localStorage.setItem('TOKEN_KEY', token);
        this.setState({isLoggedIn: true});
    }

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({isLoggedIn: false});
    }

    render() {
        return (

            <div className="App">
                <Header />
                <Main isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
            </div>

        );
    }


}

export default App;
