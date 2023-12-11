import React from 'react';
import TodoItem from './TodoItem';
import { MSG_NO_ITEMS } from '../../assets/text/en_US';

export default function FilteredList(props) {
  const { items, changeStatus, deleteItem } = props;

  if (items.length === 0) {
    return <p className="alert alert-info">{MSG_NO_ITEMS}</p>;
  }

  return (
    <ul className="list-unstyled scrollbar">
      {items.map(item => (
        <TodoItem
          key={item._id}
          data={item}
          changeStatus={changeStatus}
          deleteItemById={deleteItem}
        />
      ))}
    </ul>
  );
}
