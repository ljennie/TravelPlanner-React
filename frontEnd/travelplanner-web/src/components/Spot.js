import { Card, Collapse, Icon } from 'antd';
import React from 'react';
import '../styles/Spot.css';
const Panel = Collapse.Panel;
const customPanelStyle = {
  background: 'rgb(0, 160, 233)',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
};

export default class Spot extends React.Component {
  render() {
    return (
      <div id={this.props.id} key={Math.random()}>
        <Collapse
          className="intre-spots"
          bordered={false}
          defaultActiveKey={['0']}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          <Panel header={this.props.name} key="1" style={customPanelStyle}>
            <Card
              hoverable={true}
              title={'Spot No.' + this.props.id}
              style={{ width: '100%' }}
              headStyle={{ 'background-color': 'rgb(0, 160, 233)' }}
              bodyStyle={{
                'background-color': 'rgba(0, 160, 233, 0.7)',
                'font-size': '25px',                
              }}
            >
              <img src={this.props.url} alt={this.props.name} height='200px' width='250px' />
              <div classname='card-spot-name'><p>{this.props.name}</p></div>
              <p>{this.props.start + ' ~ ' + this.props.end}</p>
              <a href={`https://en.wikipedia.org/wiki/${this.props.name}`} target="_blank">Learn More</a>
            </Card>
          </Panel>
        </Collapse>


      </div>
    );
  }
}

