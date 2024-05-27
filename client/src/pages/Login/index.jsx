import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userimg from "../../assets/person.png";
import emailimg from "../../assets/email.png";
import passimg from "../../assets/password.png";


import './login.css';

function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Login:', { email, password });
  

  return (
    <div className='first'>
     <div className = "login-container">
        <h1 className='h1'>Sign in</h1>
        <div className="inputs">
          <div className="input">
            <img src={userimg} alt="" />
            <input type="text" placeholder='Name' />
          </div>

          <div className="input">
            <img src={emailimg} alt="" />
            <input type="email" placeholder='Email Id' />
          </div>

          <div className="input">
            <img src={passimg} alt="" />
            <input type="password" placeholder='Password' />
          </div>
        </div>
        
        <div className="submit">
          <button className="sub">Sign in</button>
          <Link to='/signup' className="sub">Sign up</Link>
        </div>

        

        </div>
        
    </div>
  );
}

export default Login;
