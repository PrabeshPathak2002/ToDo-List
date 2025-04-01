import React, { useState } from 'react';
import { MdEdit, MdDelete, MdCalendarToday } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import api from '../utils/api';
import '../styles/components/TodoItem.css';

function TodoItem({ todo, fetchTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    task: todo.task || todo.todo,
    status: todo.status,
    deadline: todo.deadline ? todo.deadline.slice(0, 16) : ''
  });

  const handleUpdate = async () => {
    try {
      await api.put(`/todo/${todo._id}`, {
        task: editData.task,
        status: editData.status,
        deadline: editData.deadline
      });
      setIsEditing(false);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/todo/${todo._id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className={`todo-card ${todo.status}`}>
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editData.task}
            onChange={(e) => setEditData({...editData, task: e.target.value})}
            className="form-control"
            placeholder="Task description"
          />
          <select
            value={editData.status}
            onChange={(e) => setEditData({...editData, status: e.target.value})}
            className="form-control"
            style={{ margin: '0.5rem 0' }}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="datetime-local"
            value={editData.deadline}
            onChange={(e) => setEditData({...editData, deadline: e.target.value})}
            className="form-control"
          />
          <div className="todo-actions" style={{ marginTop: '1rem' }}>
            <button onClick={() => setIsEditing(false)} className="todo-btn">
              Cancel
            </button>
            <button onClick={handleUpdate} className="todo-btn edit">
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <div className={`todo-text ${todo.status === 'completed' ? 'completed' : ''}`}>
              {todo.task || todo.todo}
            </div>
            <div className="todo-meta">
              <span className="todo-status">
                <FaCircle className={`status-badge ${todo.status}`} />
                {todo.status}
              </span>
              {todo.deadline && (
                <span className="todo-deadline">
                  <MdCalendarToday size={14} />
                  {new Date(todo.deadline).toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="todo-actions">
            <button 
              onClick={() => setIsEditing(true)} 
              className="todo-btn edit"
              aria-label="Edit"
            >
              <MdEdit size={18} />
            </button>
            <button 
              onClick={handleDelete} 
              className="todo-btn delete"
              aria-label="Delete"
            >
              <MdDelete size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;