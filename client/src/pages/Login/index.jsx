import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import userimg from "../../assets/person.png";
import emailimg from "../../assets/email.png";
import passimg from "../../assets/password.png";
import { toast } from 'react-toastify';
import axios from 'axios';
import "./login.css";

function Login({ SERVER_URL,handleStateChange }) {
    const navigate = useNavigate();
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        console.log(e.target.form)
        let loadToast = null;
        let email = e.target.form.email.value
        let password = e.target.form.password.value
        if (email.length > 0 && password.length > 0) {
            const formData = {
                email: email,
                password: password
            };
            console.log(formData);
            if (e.target.form.email.validity.valid == false) {
                toast.error('Enter a Valid Email');
            }
            else {

                try {
                    loadToast = toast.loading("please wait...");
                    console.log(SERVER_URL + '/login')
                    const response = await axios.post(SERVER_URL + '/login', formData);
                    console.log(response);
                    if (response.status == 200) {
                        toast.dismiss(loadToast);
                        localStorage.setItem('accessToken', response.data.token);
                        localStorage.setItem('userId', response.data.user._id);
                        handleStateChange(localStorage.getItem('accessToken',true));
                        navigate("/");
                        toast.success(response.data.msg);
                    }
                    else {
                        toast.error('Try Again')
                    }
                } catch (err) {

                    if (err.response && (err.response.status == 401 || err.response.status == 500)) {
                        toast.dismiss(loadToast);
                        toast.error(err.response.data.msg, {
                            className: 'single-line-toast'
                        }
                        )
                    }
                    else {
                        toast.dismiss(loadToast);
                        toast.error('problem with the fetch operation');
                        console.log(err);
                    }

                }
            }
        }
        else {
            toast.error("please fill all feild");
        }
    }
    return (
        <div className="login-bg">
            <div className="login-container">
                <div className="login-form">
                    <h2>Login to SkyTrip</h2>
                    <form>
                        <div className="login-form-group">

                            <img src={emailimg} alt="" />
                            <input type="email" placeholder="Email-id" name="email" />

                        </div>
                        <div className="login-form-group">

                            <img src={passimg} alt="" />
                            <input type="password" placeholder="Password" name="password" />

                        </div>
                        <div className="login-remember-me  justify-between">
                            <p>Don't have an account? </p>
                            <Link to="/signup" className=' mr-1 text-blue-600 text-[1.1rem] hover:underline'> Sign Up </Link>
                        </div>
                        <button className="login-button" onClick={handleLoginSubmit}>Login</button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;