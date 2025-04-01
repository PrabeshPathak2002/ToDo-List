import React, { useState } from 'react';
import api from '../utils/api';
import '../styles/components/TodoForm.css';

function TodoForm({ fetchTodos }) {
  const [task, setTask] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    
    try {
      setIsSubmitting(true);
      await api.post('/todo', { 
        task, 
        status: 'pending',
        deadline: new Date(Date.now() + 86400000).toISOString() // Tomorrow by default
      });
      setTask('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="todo-form-card">
      <form onSubmit={handleSubmit} className="todo-input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="add-task-btn"
          disabled={isSubmitting || !task.trim()}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;