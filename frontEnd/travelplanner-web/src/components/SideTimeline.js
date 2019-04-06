import { Timeline, Icon } from 'antd';
import React from 'react';
import '../styles/SideTimeline.css';

export default class SideTimeline extends React.Component {
    render() {
        return (
            <div className='timeline'>
                <Timeline>
                    <Timeline.Item>Day1 Start Hotal 2015-09-01</Timeline.Item>
                    <Timeline.Item>Day1 ..... 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />} color="red">Day2 ........ 2015-09-01</Timeline.Item>
                    <Timeline.Item>No bug pls 2015-09-01</Timeline.Item>
                </Timeline>
            </div>
        );

    }
}