import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Clinic from './components/Clinic';
import Staff from './components/Staff';
import Login from './components/Login';
import './style.css';

function App() {
  const isAuthenticated = !!localStorage.getItem("token");


console.log("isAuthenticated", isAuthenticated);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // simple page reload to reset state
  };

  return (
    <Router>
      {isAuthenticated && (
        <nav className="navbar">
          <ul>
            <li><Link to="/clinic">Clinic</Link></li>
            <li><Link to="/staff">Staff</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clinic" element={isAuthenticated ? <Clinic /> : <Navigate to="/login" />} />
        <Route path="/staff" element={isAuthenticated ? <Staff /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
