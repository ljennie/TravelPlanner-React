import {Form, Input, Select} from 'antd';
import React from 'react';
import '../styles/Downdown.css';
import {formItemLayout} from '../constants';
const { Option } = Select;

export class Dropdown extends React.Component {
  render () {
    return (

        <div className="Day">
          <Form {...formItemLayout}>
          <Form.Item
            label="Choose Day"
          >
            <Select className="Day" defaultValue="1">
              <Option value="1">Day 1</Option>
              <Option value="2">Day 2</Option>
              <Option value="3">Day 3</Option>
              <Option value="4">Day 4</Option>
              <Option value="5">Day 5</Option>
              <Option value="6">Day 6</Option>
              <Option value="7">Day 7</Option>
              <Option value="8">Day 8</Option>
              <Option value="9">Day 9</Option>
            </Select>
          </Form.Item>
        </Form>
        </div>


    );
  }
}

