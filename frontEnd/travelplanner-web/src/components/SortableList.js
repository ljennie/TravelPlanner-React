import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import { List, Typography } from 'antd';
import React from 'react';
import arrayMove from 'array-move';
import { API_ROOT } from "../constants";

const SortableItem = SortableElement(({value, index}) =>
 <List.Item><Typography.Text>{<span><b> Stop {index+1}</b></span>}</Typography.Text> {value}</List.Item>
);

const SortableList = SortableContainer(({items}) => {
  return (
     items&&<List  header={<h1><b>Day{items[0].day}</b></h1>} bordered>
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
     
    <div>
      {
        <SortableList items={this.props.items} onSortEnd={this.onSortEnd}/>
      }
    </div>
  )

}
}