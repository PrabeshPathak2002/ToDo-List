// app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navigation} from './components/Navigation.jsx'
import Login from './components/Login.jsx'; // Your Login component
import Register from './components/Register.jsx'; // Your Register component
import Todos from './pages/Todos.jsx';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
      <Navigation/>
      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;