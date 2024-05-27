import React, { useState } from "react";
import { Link } from "react-router-dom";
import userimg from "../../assets/person.png";
import emailimg from "../../assets/email.png";
import passimg from "../../assets/password.png";

import "./login.css";

function Login() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Login:', { email, password });

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-form">
              <h2>Login to SkyTrip</h2>
              <form>
                  <div className="login-form-group">
                    
                      <img src={emailimg} alt="" />
                      <input type="email" placeholder="Email-id" />
                    
                  </div>
                  <div className="login-form-group">
                      
                        <img src={passimg} alt="" />
                        <input type="password" placeholder="Password" />
                      
                  </div>
                  <div className="login-remember-me  justify-between">
                            <p>Don't have an account? </p>
                            <Link to="/signup" className=' mr-1 text-blue-600 text-[1.1rem] hover:underline'> Sign Up </Link>
                  </div>
                  <button  className="login-button">Login</button>

                  {/* <div className="submit">
                    <button className="sub">Sign in</button>
                    <button className="sub">Sign up</button>
                  </div> */}
              </form>
        </div>
      </div>
    </div>
  );
}

export default Login;