import React from 'react';
import { Marker, InfoWindow, OverlayView } from "react-google-maps";
import { Menu, Dropdown } from 'antd';

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

    onOptionClick = (e) => {
        console.log('click', e)
        this.props.onDayChange(this.props.point.pointId, e.key);
    }

    render() {
        //const {location, url, message, user, type} = this.props.post;
        //const {lat, lon} = location;
        const {type, lat, lon, poi_name, image_url, day} = this.props.point;
        console.log(poi_name);
        const totalDays = 3;

        const menu = (
            <Menu
                onClick={this.onOptionClick}
            >
                <Menu.Item key="0">Delete</Menu.Item>

                {
                    [...Array(totalDays).keys()].filter((i) => (i + 1) !== day).map((i)=>
                    <Menu.Item key={i + 1}>{`Change to Day ${i + 1}`}</Menu.Item>)

                }
            </Menu>
        )

        let icon;
        switch (day) {
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
                position={{ lat: lat, lng: lon }}
                onMouseOver={ this.onToggleOpen}
                onMouseOut={this.onToggleOpen}
                onClick={this.onToggleOpen}
                onRightClick={this.onOptionOpen}
                icon={icon}
            >
                {this.state.isOpen ?
                    <InfoWindow onCloseClick={this.onToggleOpen}>
                        <div>
                            <img src={image_url} alt={poi_name} className="travel-marker-image"/>
                            <p>{`Day ${day}: ${poi_name}`}</p>
                            <a className="btn btn-success" href={`https://en.wikipedia.org/wiki/${poi_name}`} target ="_blank">Learn More</a>
                        </div>
                    </InfoWindow> : null
                }

                <OverlayView
                    position = { {lat: lat, lng: lon} }
                    mapPaneName={ OverlayView.OVERLAY_MOUSE_TARGET }
                    //getPixelPositionOffset={getPixelPositionOffset}
                >
                    <Dropdown overlay={menu} trigger={['contextMenu']}>
                        <span style={{ userSelect: 'none' }}>Right Click on Me</span>
                    </Dropdown>
                </OverlayView>


            </Marker>
        );
    }
}