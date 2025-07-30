import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './Components/AuthForm';
import Dashboard from './Components/Dashboard';
import MySessions from './Components/MySessions';
import SessionEditor from './Components/SessionEditor';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={<AuthForm setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/my-sessions" element={isAuthenticated ? <MySessions /> : <Navigate to="/login" />} />
          <Route path="/session/:id?" element={isAuthenticated ? <SessionEditor /> : <Navigate to="/login" />} />
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;