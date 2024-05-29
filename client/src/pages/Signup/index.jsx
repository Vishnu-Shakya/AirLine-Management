import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import userimg from "../../assets/person.png";
import emailimg from "../../assets/email.png";
import passimg from "../../assets/password.png";

import './signup.css'

function Signup({ SERVER_URL }) {
    const navigate = useNavigate();
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        let loadToast = null;
        let name = e.target.form.name.value;
        let email = e.target.form.email.value
        let password = e.target.form.password.value
        if (name.length > 0 && email.length > 0 && password.length > 0) {


            const formData = {
                name: name,
                email: email,
                password: password
            };
            console.log(formData);
            if (e.target.form.email.validity.valid==false) {
                toast.error('Enter a Valid Email');
            }
            else {

                try {
                    console.log(SERVER_URL + '/signup');
                    loadToast = toast.loading("please wait...");
                    const response = await axios.post(SERVER_URL + '/signup', formData);
                    console.log(response);
                    if (response.status == 201) {
                        toast.dismiss(loadToast);
                        localStorage.setItem('accessToken', response.data.token);
                        localStorage.setItem('userId', response.data.newUser._id);
                        toast.success("Registration successfull",{className: 'single-line-toast'});
                        navigate("/");
                    }
                    else {
                        toast.dismiss(loadToast);
                        toast.error('something went  wrong try again ',{className: 'single-line-toast'})
                    }
                } catch (err) {
                    toast.dismiss(loadToast);
                    toast.error(err.response.data.msg);
                    console.log(err);
                }
            }
        }
        else {
            toast.error("please fill all feild",{className:'single-line-toast'});
        }


    }

    return (
        <div className="signup-bg">

            <div className="signup-container">
                <div className="signup-form">
                    <h2>Signup to SkyTrip</h2>
                    <form>
                        <div className="form-group">
                        <img src={userimg} alt="" />
                            <input type="text" id="name" placeholder="Your Name" name='name' required />
                        </div>
                        <div className="form-group">
                        <img src={emailimg} alt="" />
                            <input type="email" id="email" placeholder="Your Email" name='email' required />
                        </div>
                        <div className="form-group">
                        <img src={passimg} alt="" />
                            <input type="password" id="password" placeholder="Enter Password" name='password' required />
                        </div>
                        <div className="remember-me  justify-between">
                            <p>Already have an account? </p>
                            <Link to="/login" className=' mr-1 text-blue-600 text-[1.1rem] hover:underline'> Login </Link>
                        </div>
                        <button onClick={handleSignUpSubmit} className="signup-button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default Signup


