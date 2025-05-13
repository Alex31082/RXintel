import React, { useState } from 'react';
import { FiUsers, FiShoppingBag, FiDatabase, FiDollarSign, FiLogOut, FiBarChart2, FiPlus } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './AdminDashboard.css';
import AddMed from './AddMed.jsx';
import Inventory from './Inventory.jsx';  // Importing the Inventory component
  // Importing the AddMed component
/**import Users from './Users.jsx';  // Importing the Users component
import Vendors from './Vendors.jsx';  // Importing the Vendors component
import Transactions from './Transactions.jsx';  // Importing the Transactions component
import Reports from './Reports.jsx';  // Importing the Reports component**/

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

  // States to control visibility of different components
  const [currentComponent, setCurrentComponent] = useState(''); // State to control which component is displayed
  
  // Function to handle displaying the selected component
  const handleSidebarClick = (componentName) => {
    setCurrentComponent(componentName); // Set the current component to show
  };

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
          <li onClick={() => handleSidebarClick('Users')}>
            <FiUsers />
            <span className={sidebarOpen ? 'show' : 'hide'}> Users</span>
          </li>
          <li onClick={() => handleSidebarClick('Vendors')}>
            <FiShoppingBag />
            <span className={sidebarOpen ? 'show' : 'hide'}> Vendors</span>
          </li>
          <li onClick={() => handleSidebarClick('Inventory')}>
            <FiDatabase />
            <span className={sidebarOpen ? 'show' : 'hide'}> Inventory</span>
          </li>
          <li onClick={() => handleSidebarClick('Transactions')}>
            <FiDollarSign />
            <span className={sidebarOpen ? 'show' : 'hide'}> Transactions</span>
          </li>
          <li onClick={() => handleSidebarClick('Reports')}>
            <FiBarChart2 />
            <span className={sidebarOpen ? 'show' : 'hide'}> Reports</span>
          </li>
          <li onClick={() => handleSidebarClick('AddMed')}>
            <FiPlus />
            <span className={sidebarOpen ? 'show' : 'hide'}> Add Medicine</span>
          </li>
          <li className="logout">
            <FiLogOut />
            <span className={sidebarOpen ? 'show' : 'hide'}>Logout</span>
          </li>
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

        {/* Dynamic Component Rendering */}
        <div className="dashboard-content">
          {currentComponent === 'AddMed' && <AddMed />}
          {currentComponent === 'Inventory' && <Inventory />}

          {/*{currentComponent === 'Users' && <Users />}
          {currentComponent === 'Vendors' && <Vendors />}
          {currentComponent === 'Transactions' && <Transactions />}
          {currentComponent === 'Reports' && <Reports />}*/}

          {/* Default view if no component is selected */}
          {currentComponent === '' && (
            <div>
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
          )}
        </div>
      </main>
    </div>
  );
}
