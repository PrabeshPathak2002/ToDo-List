// src/pages/Todos.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import '../styles/Home.css';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const { data } = await api.get('/todo');
      setTodos(data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1 className="todo-app-title">My Todos</h1>
      <TodoForm fetchTodos={fetchTodos} />
      {loading ? (
        <p className="loading">Loading todos...</p>
      ) : todos.length > 0 ? (
        <TodoList todos={todos} fetchTodos={fetchTodos} />
      ) : (
        <div className="empty-state">
          <p>No tasks found. Add your first task!</p>
        </div>
      )}
    </div>
  );
}

export default Todos;