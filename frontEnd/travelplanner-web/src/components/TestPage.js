import React from 'react';
import { GoogleMap } from "react-google-maps";
import { Link } from "react-router-dom";

export class TestPage extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.location.state);
    }
    render() {
        return (
            <div>
                <h1>TEST</h1>
                <Link to="/">Overview</Link>
            </div>
        );
    }
}