import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import axios from "axios";
import avatar from "../../assets/avatar.jpeg";
import { toast } from "react-toastify";
import FlightCard from "../../components/FlightCard.jsx";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Profile = ({ SERVER_URL, handleStateChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        name: "Vishnu Shakya",
        birthday: "9/4/2003",
        gender: "Male",
        maritalStatus: "Single",
        address: "VIDHYAVATI COLLEDGE ",
        pincode: "477001",
        state: "Madhya Pradesh",
    });
    const [bookedTicket, setBookedTicket] = useState(null);
    
    const maxDate = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.get(`${SERVER_URL}/profile/${userId}`);
                const userProfile = response.data.foundUser;

                if (response.status === 200) {
                    const { bookedTicket } = response.data.foundUser;
                    const response2 = await axios.post(SERVER_URL + "/ticketInfo", bookedTicket);
                    console.log("response2:", response2);
                    setProfileInfo({
                        name: userProfile.name,
                        birthday: userProfile.birthday,
                        gender: userProfile.gender,
                        maritalStatus: userProfile.maritalStatus,
                        address: userProfile.address.add,
                        pincode: userProfile.address.pincode,
                        state: userProfile.address.state,
                    });
                    setBookedTicket(response2.data);
                } else {
                    console.error("Something went wrong");
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchProfile();
    }, [SERVER_URL]);

<<<<<<< HEAD
    const cancelFilghtHandle = async (e) => {
        e.preventDefault()
        const formData={
            id:"eJzTd9f38nCM8PAFAAs%2BAmY%3D"
        };
        const response2 = await axios.post(SERVER_URL + "/ticketCancel", formData);
        console.log(response2);


    };
=======
    
>>>>>>> d9c9604 (Added payment Form)

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
        const token = localStorage.getItem("accessToken");
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
            if (response.status == 200) {
                toast.success(response.data.msg);
            } else {
                toast.error("Try Again");
            }
        } catch (error) {
            toast.error("Internal Server Error");
        }
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    const printDocument = () => {
        const input = document.getElementById("divToPrint");

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");

            // Calculate the width and height in PDF units (mm)
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
            pdf.save("ticket.pdf");
        });
    };

    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        handleStateChange(null, false);
        navigate("/");
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center w-4/5 mx-auto">
                <div className="right">
                    <div className="profile-info">
                        <h3 className="text-[2rem]">My Profile</h3>
                        {isEditing ? (
                            <div className="profile-form">
                                <div className="profile-detail">
                                    <label>Name</label>
                                    <input type="text" name="name" value={profileInfo.name} onChange={handleInputChange} />
                                </div>
                                <div className="profile-detail">
                                    <label>Birthday</label>
                                    <input type="date" name="birthday" value={profileInfo.birthday} onChange={handleInputChange} max={maxDate} />
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
                                    <button className="save-button" onClick={handleSaveClick}>
                                        Save
                                    </button>
                                    <button className="cancel-button" onClick={handleCancelClick}>
                                        Cancel
                                    </button>
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
                                <button className="edit-button" onClick={handleEditClick}>
                                    {" "}
                                    Edit{" "}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="right">
                    <div className="bg-white p-5 rounded-[5px] ">
                        <h3 className="text-[2rem]">Your Booked Ticket</h3>
                        {bookedTicket ? <p>design to ticket history </p> : <p>No Booked ticket</p>}
                        <button onClick={cancelFilghtHandle}>cancel ticket</button>
                        <div className=" w-[90%] h-96"></div>
                    </div>
                    <div className="flex w-[90%] h-[400px]"></div>
                </div>
            </div>
            <div className="flex flex-col w-2/3 ml-[200px]"></div>
        </div>
    );
};

export default Profile;
