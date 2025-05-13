import React, { useState } from 'react';
import LoginForm from './Login';
import RegisterForm from './Register';

const LoginRegister = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className={`wrapper ${isRegistering ? 'active' : ''}`}>
      {isRegistering ? (
        <RegisterForm onSwitch={() => setIsRegistering(false)} />
      ) : (
        <LoginForm onSwitch={() => setIsRegistering(true)} />
      )}
    </div>
  );
};

export default LoginRegister;
