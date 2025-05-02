import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaHome, FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';  // Using useNavigate for redirecting after successful registration
import './Register.css';

const Register = ({ onSwitch }) => {
  // State to handle form data
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();  // Use navigate to redirect

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.firstName || !formData.lastName || !formData.address ||
        !formData.phone || !formData.email || !formData.gender || !formData.age || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Register response:", JSON.stringify(data, null, 2));



      if (response.ok) {
        // Store JWT token in localStorage if registration is successful
        localStorage.setItem("token", data.access_token);

        // Redirect based on role after registration
        if (data.role === "admin") {
          navigate("/AdminDashboard");
        } else if (data.role === "vendor") {
          navigate("/VendorDashboard");
        } else {
          navigate("/User");
        }
      }else{
        if (Array.isArray(data.detail)) {
          const combined = data.detail.map(err => err.msg).join(', ');
          setError(combined);
        } else {
          setError(data.detail || 'Registration failed, please try again.');
        }
        
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong, please try again later.');
    }
  };

  return (
    <div className="form-box register">
      <form onSubmit={handleRegister}>
        <h1>Registration</h1>

        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}

        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <FaHome className="icon" />
        </div>

        <div className="input-box">
          <input
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <FaPhone className="icon" />
        </div>

        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-box">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="input-box">
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>

        <div>
          <label>
            <input type="checkbox" required /> I agree to the terms & conditions
          </label>
          <button type="submit">Register</button>
        </div>

        <p>
          Already have an account?{" "}
          <a href="/login" onClick={onSwitch}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
