import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';  // Added useNavigate from react-router-dom
import './Login.css';

const Login = ({ onSwitch }) => {
  // State for storing form input and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Using useNavigate hook to handle redirection
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT in localStorage
        localStorage.setItem("token", data.access_token);

        // Redirect based on role
        if (data.role === "admin") {
          navigate("/admin");
        } else if (data.role === "vendor") {
          navigate("/vendor");
        } else {
          navigate("/User");
        }
      } else {
        // Handle different error responses
        if (data.detail) {
          setError(data.detail); // Show error message if any
        } else {
          setError('Something went wrong, please try again later.');
        }
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <div className='form-box login'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
        <div className='input-box'>
          <input 
            type='email' 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input 
            type='password' 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <FaLock className='icon' />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? 
          {/* Use Link to navigate to the Register page */}
          <Link to="/register" onClick={onSwitch}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;