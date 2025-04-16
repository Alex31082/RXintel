import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import rxlogo from '../Assets/rxlogo.png';
import './user.css';

export default function MedicalNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('All Medical Products');
  const [activeFilter, setActiveFilter] = useState('All Products');

  const menuItems = [
    'All Medical Products',
    'Healthcare Devices',
    'Medicines',
    'Supplements',
    'Personal Care'
  ];

  const filterOptions = [
    'All Products',
    'Prescription Required',
    'No Prescription Needed'
  ];

  return (
    <div className="medical-navbar">
      {/* Top Navbar */}
      <div className="top-nav">
        <div className="nav-left">
          <img src={rxlogo} alt="RXintel Logo" className="logo" />
          <span className="brand-name">RXIntel</span>
        </div>

        <div className="nav-center">
          <input
            type="text"
            className="search-bar"
            placeholder="Search medicines, supplements, healthcare products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="search-icon" />
        </div>

        <div className="nav-right">
          <FiShoppingCart className="nav-icon" />
          <button className="sign-in-btn">
            <FiUser /> <span className="btn-text">Sign In</span>
          </button>
        </div>
      </div>

      {/* Centered Main Menu */}
      <div className="main-menu-wrapper">
        <div className="main-menu">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`menu-item ${activeMenu === item ? 'active' : ''}`}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Centered Filter Section */}
      <div className="filter-section-wrapper">
        <div className="filter-section">
          <div className="filter-options">
            {filterOptions.map((option) => (
              <button
                key={option}
                className={`filter-option ${activeFilter === option ? 'active' : ''}`}
                onClick={() => setActiveFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="sort-options">
            <select className="sort-dropdown">
              <option>Sort By: Featured</option>
              <option>Sort By: Price (Low to High)</option>
              <option>Sort By: Price (High to Low)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}