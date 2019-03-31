import React from 'react';
import { Marker, InfoWindow, OverlayView } from "react-google-maps";
import { Menu, Dropdown } from 'antd';

import blueMarkerUrl from '../assets/images/blue-marker.svg';
import blackMarkerUrl from '../assets/images/black-marker.png';
import rightClickIconUrl from '../assets/images/rightClickIcon.png';

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
        console.log('click', e);
        this.props.onDayChange(this.props.point.placeID, e.key);
    }

    render() {
        const {type, lat, lon, name, imageURL, day} = this.props.point;
        console.log(name);
        const totalDays = this.props.totalDays;

        const menu = (
            <Menu
                onClick={this.onOptionClick}
            >
                <Menu.Item key={-1}>Delete</Menu.Item>
                {
                    [...Array(totalDays).keys()].filter((i) => i !== parseInt(day)).map((i)=>
                        <Menu.Item key={i}>{`Change to Day ${i + 1}`}</Menu.Item>)

                }
            </Menu>
        )

        let icon;
        switch (parseInt(day)) {
            case 0:
                icon = undefined;
                break;
            case 1:
                icon = {
                    url: blueMarkerUrl,
                    scaledSize: new window.google.maps.Size(26, 41),
                }
                break;
            case 2:
                icon = {
                    url: blackMarkerUrl,
                    scaledSize: new window.google.maps.Size(26, 41),
                }
                break;
            default:
                icon = undefined;
        }

        return (
            <div>
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
                                <img src={imageURL} alt={name} className="travel-marker-image"/>
                                <p>{`Day ${day}: ${name}`}</p>
                                <a className="btn btn-success" href={`https://en.wikipedia.org/wiki/${name}`} target ="_blank">Learn More</a>
                            </div>
                        </InfoWindow> : null
                    }

                    <OverlayView
                        position = { {lat: lat, lng: lon} }
                        mapPaneName={ OverlayView.OVERLAY_MOUSE_TARGET }
                        //getPixelPositionOffset={getPixelPositionOffset}
                    >
                        <Dropdown overlay={menu} trigger={['contextMenu']}>
                            <img src={rightClickIconUrl} style={{ userSelect: 'none'}} className="right-click-icon"/>
                        </Dropdown>
                    </OverlayView>

                </Marker>

            </div>
        );
    }
}