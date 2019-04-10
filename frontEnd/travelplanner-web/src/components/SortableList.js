import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { List, Typography } from 'antd';
import React from 'react';
import arrayMove from 'array-move';
import { API_ROOT } from "../constants";


const SortableItem = SortableElement(({value, index}) =>
 <List.Item style={{color:"636363"}}><Typography.Text>{<span style={{color:"636363"}}><b> Stop {index+1}</b></span>}</Typography.Text> {value}</List.Item>
);

const SortableList = SortableContainer(({items, start}) => {
  var startname=start[0].type;
  return (
     items&&<List  header={<h1 style={{color:"636363"}}><b>Day{items[0].day+1}</b></h1>} bordered>
      <List.Item><Typography.Text>{<span style={{color:"636363"}}><b> Start Point:  </b></span>}</Typography.Text>{startname}</List.Item>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.name} />
      ))}
    </List>
  );
});

  
  export class SortableComponent extends React.Component {
    onSortEnd = ({oldIndex, newIndex}) => {
       var temp1= arrayMove(this.props.items, oldIndex, newIndex);
       //temp1=temp1.concat(this.props.start);
       this.props.change(temp1);
    };
  render() {
    return (
     
    <div className="font-white">
      {
        <SortableList items={this.props.items} onSortEnd={this.onSortEnd} start={this.props.start}/>
      }
    </div>
  )

}
}