import React, { useState } from 'react';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">
                            <i className="fas fa-user"></i> Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Type your username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">
                            <i className="fas fa-lock"></i> Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type your password"
                            required
                        />
                    </div>
                    <a href="/forgot-password" className="forgot-password">Forgot password?</a>
                    <button type="submit" className="login-button">LOGIN</button>
                </form>
                <p>Or Sign Up Using</p>
                <div className="social-login">
                    <button className="social-button facebook"><i className="fab fa-facebook-f"></i></button>
                    <button className="social-button twitter"><i className="fab fa-twitter"></i></button>
                    <button className="social-button google"><i className="fab fa-google"></i></button>
                </div>
                <p>Or Sign Up Using</p>
                <a href="/signup" className="signup-link">SIGN UP</a>
            </div>
        </div>
    );
};

export default Login;
