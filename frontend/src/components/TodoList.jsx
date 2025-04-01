import React from 'react';
import TodoItem from './TodoItem';
import '../styles/components/TodoItem.css';

function TodoList({ todos, fetchTodos }) {
  return (
    <div className="todo-list-container">
      {todos.length > 0 ? (
        todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} fetchTodos={fetchTodos} />
        ))
      ) : (
        <div className="empty-state">
          <p>No tasks found. Add your first task!</p>
        </div>
      )}
    </div>
  );
}

export default TodoList;