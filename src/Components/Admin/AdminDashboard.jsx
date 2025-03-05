import React, { useState } from 'react';
import { FiUsers, FiShoppingBag, FiDatabase, FiSettings, FiDollarSign, FiLogOut, FiBarChart2 } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';

const sampleData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 700 },
  { name: 'Mar', sales: 300 },
  { name: 'Apr', sales: 500 },
  { name: 'May', sales: 800 },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
        </div>

        <ul className="sidebar-menu">
          <li><FiUsers /><span className={sidebarOpen ? 'show' : 'hide'}> Users</span></li>
          <li><FiShoppingBag /><span className={sidebarOpen ? 'show' : 'hide'}>Vendors</span></li>
          <li><FiDatabase /><span className={sidebarOpen ? 'show' : 'hide'}>Inventory</span></li>
          <li><FiDollarSign /><span className={sidebarOpen ? 'show' : 'hide'}>Transactions</span></li>
          <li><FiBarChart2 /><span className={sidebarOpen ? 'show' : 'hide'}>Reports</span></li>
          <li><FiSettings /><span className={sidebarOpen ? 'show' : 'hide'}>Settings</span></li>
          <li className="logout"><FiLogOut /><span className={sidebarOpen ? 'show' : 'hide'}>Logout</span></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <nav className="navbar">
          <h1 className="navbar-title">Admin Dashboard</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="dark-mode-toggle">
            {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
          </button>
        </nav>

        {/* Sales Analytics */}
        <div className="dashboard-content">
          <h2>Sales Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
