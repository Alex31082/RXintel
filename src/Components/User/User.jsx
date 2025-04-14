import React, { useState } from 'react';
import { FiBell, FiLogOut } from 'react-icons/fi';
import './user.css';
import rxlogo from '../Assets/rxlogo.png';

export default function UserDashboard() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`user-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="brand">
            <img src={rxlogo} alt="RXintel Logo" className="logo" />
            <h1 className="title">RXintel</h1>
          </div>
        </div>

        <div className="navbar-right">
          <FiBell className="icon" />
          <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
          <div className="profile">
            <span className="username">User</span>
            <img
              src=" "
              alt="profile"
              className="avatar"
            />
          </div>
          <FiLogOut className="icon" />
        </div>
      </nav>
      
     


      <main className="content">
        <h2>Welcome to the User Dashboard</h2>
        
      </main>
    </div>
  );
}
