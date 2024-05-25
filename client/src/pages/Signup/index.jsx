import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



import './signup.css'

function Signup({ SERVER_URL }) {
    const navigate = useNavigate();
    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        let loadToast=null;
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
            try {
                console.log(SERVER_URL + '/signup');
                loadToast = toast.loading("please wait...");
                const response = await axios.post(SERVER_URL + '/signup', formData);
                console.log(response);
                if (response.status == 201) {
                    toast.dismiss(loadToast);
                    toast.success("Registration successfull");
                    navigate("/");
                }
                else {
                    toast.dismiss(loadToast);
                    toast.error('something went  wrong try again ', {
                        className: 'single-line-toast'
                    }
                    )
                }
            } catch (err) {
                toast.dismiss(loadToast);
                toast.error(err.response.data.msg);
                console.log(err);
            }
        }
        else {
            toast.error("please fill all feild");
        }

    }

    return (
        <div className="signup-bg">

            <div className="signup-container">
                <div className="signup-form">
                    <h2>Signup to SkyTrip</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" placeholder="eg. Vishnu" name='name' required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email </label>
                            <input type="email" id="email" placeholder=" abc@gmail.com" name='email' required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" id="password" placeholder="Enter Password" name='password' required />
                        </div>
                        <div className="form-group remember-me  justify-between">
                            <p>Already have Account</p>
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


