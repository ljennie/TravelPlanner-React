import React from 'react';
import {
    Marker,
    InfoWindow
} from "react-google-maps";

import blueMarkerUrl from '../assets/images/blue-marker.svg';
import blackMarkerUrl from '../assets/images/black-marker.png';

export class TravelMarker extends React.Component {
    state = {
        isOpen:false,
        isOptionOpen:false
    }
    onToggleOpen = () => {
        this.setState((prevState) => {
            return {
                isOpen: !prevState.isOpen,
            }
        });

    }

    onOptionOpen = () => {
        this.setState({isOptionOpen: true});
        console.log("open option");
    }

    render() {
        //const {location, url, message, user, type} = this.props.post;
        //const {lat, lon} = location;
        let icon;
        switch (this.props.day) {
            case 1:
                icon = undefined;
                break;
            case 2:
                icon = {
                    url: blueMarkerUrl,
                    scaledSize: new window.google.maps.Size(26, 41),
                }
                break;
            case 3:
                icon = {
                    url: blackMarkerUrl,
                    scaledSize: new window.google.maps.Size(26, 41),
                }
                break;
            default:
                icon = undefined;
        }


        return (
            <Marker
                position={{ lat: this.props.lat, lng: this.props.lng }}
                onMouseOver={ this.onToggleOpen}
                onMouseOut={this.onToggleOpen}
                onClick={this.onToggleOpen}
                onRightClick={this.onOptionOpen}
                icon={icon}
            >
                {this.state.isOpen ?
                    <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>
                            {
                                <img src={this.props.url} alt={this.props.name} className="travel-marker-image"/>

                            }
                            <p>{`Day ${this.props.day}: ${this.props.name}`}</p>
                            <a class="btn btn-success" href={`https://en.wikipedia.org/wiki/${this.props.name}`} target ="_blank">Learn More</a>
                        </div>
                    </InfoWindow> : null
                }

            </Marker>
        );
    }
}