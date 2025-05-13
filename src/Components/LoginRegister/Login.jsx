import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate input
    if (!username || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        if (data.role === "admin") {
          navigate("/AdminDashboard");
        } else if (data.role === "vendor") {
          navigate("/VendorDashboard");
        } else {
          navigate("/User");
        }
      } else {
        if (data && data.detail && typeof data.detail === "string") {
          setError(data.detail); // Error message from backend
        } else if (data && data.msg) {
          setError(data.msg); // Fallback error message
        } else {
          setError('Something went wrong, please try again later.');
        }
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-form'>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        {error && <p className="error-message">{String(error)}</p>} {/* Display error */}
        
        <div className='input-box'>
          <input 
            type='text' 
            placeholder='Username' 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>

        <div className='input-box'>
          <input 
            type='email' 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <div className='input-box'>
          <input 
            type='password' 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account? 
          <Link to="/register" onClick={onSwitch}>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
