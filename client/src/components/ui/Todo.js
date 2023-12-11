import React from 'react';
import StateProvider from '../wrappers/StateProvider';
import KeyStrokeHandler from '../wrappers/KeyStrokeHandler';
import TodoList from '../ui/TodoList';

export default function Todo(props) {
  return (
    <div>
      <StateProvider token={props.token}>
        <KeyStrokeHandler>
          <TodoList />
        </KeyStrokeHandler>
      </StateProvider>
    </div>
  );
}
