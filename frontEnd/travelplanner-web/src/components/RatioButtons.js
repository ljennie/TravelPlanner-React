import React from 'react';
import { Button, Radio, Icon } from 'antd';
const totalDays=6;
export default class RatioButtons extends React.Component {
    render() {
        return(
            <Radio.Group>
                  {
                   [...Array(totalDays).keys()].map(i =>
                      <Radio.Button value={i+1}>Day{i+1}</Radio.Button>
                   )
                   }
            </Radio.Group>
        );
    }
}