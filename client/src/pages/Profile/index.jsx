import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './profile.css';
import axios from 'axios';
import avatar from '../../assets/avatar.jpeg'
import { toast } from 'react-toastify';
import FlightCard from "../../components/FlightCard.jsx"

const Profile = ({ SERVER_URL }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [profileInfo, setProfileInfo] = useState({
    name: 'Vishnu Shakya',
    birthday: '9/4/2003',
    gender: 'Male',
    maritalStatus: 'Single',
    address: 'VIDHYAVATI COLLEDGE KE SAMANE',
    pincode: '477001',
    state: 'Madhya Pradesh',
  });
 
  const maxDate = (new Date()).toISOString().split('T')[0];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${SERVER_URL}/profile/${userId}`);
        const userProfile = response.data.foundUser;
        if (response.status === 200) {
          setProfileInfo({
            name: userProfile.name,
            birthday: userProfile.birthday,
            gender: userProfile.gender,
            maritalStatus: userProfile.maritalStatus,
            address: userProfile.address.add,
            pincode: userProfile.address.pincode,
            state: userProfile.address.state,
          });
        } else {
          console.error('Something went wrong');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [SERVER_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const token = localStorage.getItem('accessToken');
    const formData = {
      name: profileInfo.name,
      email: profileInfo.email,
      gender: profileInfo.gender,
      birthday: profileInfo.birthday,
      maritalStatus: profileInfo.maritalStatus,
      address: {
        add: profileInfo.address,
        pincode: profileInfo.pincode,
        state: profileInfo.state,
      },
      token,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/profileUpdate`, formData);
      console.log(response);
      if(response.status==200){
         toast.success(response.data.msg);
      }
      else{
        toast.error('Try Again');
      }
      
    } catch (error) {
      toast.error('Internal Server Error')
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const navActiveLinkHandle=(e)=>{
    e.preventDefault();

    document.querySelectorAll('.nav-link').forEach((p)=>{
      p.classList.remove('nav-active');
    })
    e.currentTarget.classList.add('nav-active')

  }


  const navigate=useNavigate();
  const handleLogoutClick=async ()=>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    navigate('/');
  }

  return (
    <div>
    <div className="flex w-4/5 mx-auto">
      <div className="left">
        <div className="flex flex-col justify-center items-center m-4">
          <img src={avatar}alt="" className='bg-green-400 w-36 h-36 rounded-lg' />
          <p>{profileInfo.name}</p>
        </div>

        <div className="flex flex-col items-start p-6">
          <p className='nav-link flex nav-active' onClick={navActiveLinkHandle}>Profile</p>
          <p className='nav-link flex' onClick={navActiveLinkHandle}>Login details</p>
          <p className='nav-link flex' onClick={navActiveLinkHandle}>Save travelers</p>
          <p className='nav-link flex' onClick={navActiveLinkHandle}>Booked ticket</p>
          <p className='nav-link flex' onClick={navActiveLinkHandle}>Ticket history</p>
          <p className='nav-link flex' onClick={handleLogoutClick}>Logout</p>
        </div>
      </div>
      <div className="right">
        <div className="profile-info">
          <h3>Profile</h3>
          <p>Basic info, for a faster booking experience</p>
          {isEditing ? (
            <div className="profile-form">
              <div className="profile-detail">
                <label>Name</label>
                <input type="text" name="name" value={profileInfo.name} onChange={handleInputChange} />
              </div>
              <div className="profile-detail">
                <label>Birthday</label>
                <input type="date" name="birthday" value={profileInfo.birthday} onChange={handleInputChange}  max={maxDate} />
              </div>
              <div className="profile-detail">
                <label>Gender</label>
                <select name="gender" value={profileInfo.gender} onChange={handleInputChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="profile-detail">
                <label>Marital Status</label>
                <select name="maritalStatus" value={profileInfo.maritalStatus} onChange={handleInputChange}>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div className="profile-detail">
                <label>Your Address</label>
                <input type="text" name="address" value={profileInfo.address} onChange={handleInputChange} />
              </div>
              <div className="profile-detail">
                <label>Pincode</label>
                <input type="text" name="pincode" value={profileInfo.pincode} onChange={handleInputChange} />
              </div>
              <div className="profile-detail">
                <label>State</label>
                <input type="text" name="state" value={profileInfo.state} onChange={handleInputChange} />
              </div>
              <div className="form-buttons">
                <button className="save-button" onClick={handleSaveClick}>Save</button>
                <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="profile-details">
              <div className="profile-detail">
                <span>Name</span>
                <span>{profileInfo.name}</span>
              </div>
              <div className="profile-detail">
                <span>Birthday</span>
                <span>{profileInfo.birthday}</span>
              </div>
              <div className="profile-detail">
                <span>Gender</span>
                <span>{profileInfo.gender}</span>
              </div>
              <div className="profile-detail">
                <span>Marital Status</span>
                <span>{profileInfo.maritalStatus}</span>
              </div>
              <div className="profile-detail">
                <span>Your Address</span>
                <span>{profileInfo.address}</span>
              </div>
              <div className="profile-detail">
                <span>Pincode</span>
                <span>{profileInfo.pincode}</span>
              </div>
              <div className="profile-detail">
                <span>State</span>
                <span>{profileInfo.state}</span>
              </div>
              <button className="edit-button" onClick={handleEditClick}> Edit </button>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="booked-heading">
        Your Previous Bookings
      </div>

          <FlightCard></FlightCard>
    </div>
  );
};

export default Profile;
