import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {
    const [action, setAction] = useState('');


    const registerLink = () => {
        setAction('active'); 
    };

    const loginLink = () => {
        setAction(''); 
    };
    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login form submitted");
        
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log("Registration form submitted");
        
    };




    return (
        <div className={`wrapper ${action}`}>
            {/* Login Form */}
            <div className='form-box login'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>

                    <div className='input-box'>
                        <input type='text' placeholder='Username'  />
                        <FaUser className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='password' placeholder='Password'  />
                        <FaLock className='icon' />
                    </div>

                    
                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <a href='#' onClick={registerLink}>Register</a></p>
                    </div>
                </form>
            </div>

            {/* Registration Form */}
            <div className='form-box register'>
            
                <form onSubmit={handleRegister}>

                    <h1>Registration</h1>

                    <div className='input-box'>
                        <input type='text' placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='email' placeholder='Email' required />
                        <FaEnvelope className='icon' />
                    </div>

                    <div className='input-box'>
                        <input type='password' placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label htmlFor="terms">
                            <input type='checkbox' id="terms" required /> I agree to the terms & conditions
                        </label>
                    </div>

                    <button type="submit">Register</button>

                    <div className="register-link">
                        <p>Already have an account? <a href='#' onClick={loginLink}>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
