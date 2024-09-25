import React from 'react';
//import LoginForm from '../components/LoginForm';



const LoginPage = () => {
  const handleLogin = (email, password) => {
    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
    <div className="login-page">
      <img src={Logo} alt="Logo" className="login-logo" />
      <div className="login-container">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
