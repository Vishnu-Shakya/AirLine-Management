import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label" htmlFor="login-email">Email:</label>
        <input
          type="email"
          id="login-email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="login-label" htmlFor="login-password">Password:</label>
        <input
          type="password"
          id="login-password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="login-text">
        Don't have an account? <Link to="/signup" className="login-link">Sign up here</Link>
      </p>
    </div>
  );
}

export default Login;
