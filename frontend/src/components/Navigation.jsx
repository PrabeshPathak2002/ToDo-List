// src/components/Navigation.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/components/Navigation.css';

export function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="nav-container">
      {isLoggedIn ? (
        <>
          <NavLink to="/todos" className="nav-card">Todos</NavLink>
          <button className="nav-card" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="nav-card">Login</NavLink>
          <NavLink to="/register" className="nav-card">Register</NavLink>
        </>
      )}
    </div>
  );
}