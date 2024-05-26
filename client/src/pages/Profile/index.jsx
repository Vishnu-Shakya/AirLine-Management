import React, { useState } from 'react';
import './profile.css';
import axios from 'axios'

const Profile = ({SERVER_URL}) => {
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = '60c72b2f9b1e8b6f1d8e4d3c'; // Replace with dynamic ID as needed
        const response = await axios.get(`http://localhost:3000/profile/${userId}`);
        setProfile(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const token = localStorage.getItem('accessToken');
    FormData={
       name:profileInfo.name,
       email:profileInfo.email,
       gender:profileInfo.gender,
       maritalStatus:profileInfo.maritalStatus,
       address:{
          add:profileInfo.address,
          pincode:profileInfo.pincode,
          state:profileInfo.state
       },
       token
    }

    const response= await axios.post(SERVER_URL+'/profile',FormData);
    console.log(response);
    
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex w-4/5 mx-auto">
      <div className="left">
        <div className="flex flex-col justify-center items-center m-4">
          <img src="profile-placeholder.png" alt="" className='bg-green-400 w-36 h-36 rounded-lg' />
          <p>Vishnu Shakya</p>
        </div>

        <div className="flex flex-col items-start p-6">
          <p className='nav-link'>Profile</p>
          <p className='nav-link'>Login details</p>
          <p className='nav-link'>Save travelers</p>
          <p className='nav-link'>Booked ticket</p>
          <p className='nav-link'>Ticket history</p>
          <p className='nav-link'>Logout</p>
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
                <input type="text" name="name" value={profileInfo.name} onChange={handleInputChange}/>
              </div>
              <div className="profile-detail">
                <label>Birthday</label>
                <input type="text" name="birthday" value={profileInfo.birthday} onChange={handleInputChange}/>
              </div>
              <div className="profile-detail">
                <label>Gender</label>
                <input type="text" name="gender" value={profileInfo.gender} onChange={handleInputChange}/>
              </div>
              <div className="profile-detail">
                <label>Marital Status</label>
                <input type="text" name="maritalStatus" value={profileInfo.maritalStatus} onChange={handleInputChange}/>
              </div>
              <div className="profile-detail">
                <label>Your Address</label>
                <input type="text" name="address" value={profileInfo.address} onChange={handleInputChange}/>
              </div>
              <div className="profile-detail">
                <label>Pincode</label>
                <input type="text" name="pincode" value={profileInfo.pincode} onChange={handleInputChange}/>
              </div>
              <div className="profile-detail">
                <label>State</label>
                <input type="text" name="state" value={profileInfo.state} onChange={handleInputChange}/>
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
  );
};

export default Profile;
