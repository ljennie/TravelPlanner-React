import React from 'react';
import { Button, Radio, Icon } from 'antd';
//const totalDays=6;


export default class RatioButtons extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Radio.Group onChange={this.props.filtermarkers} totalDays={this.props.totalDays}>
                  {
                   [...Array(this.props.totalDays).keys()].map(i =>
                      <Radio.Button value={(i+1).toString()}>Day{i+1}</Radio.Button>
                   )
                   }
            </Radio.Group>
        );
    }
}