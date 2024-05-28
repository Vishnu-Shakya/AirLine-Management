import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoutes = ({SERVER_URL}) => {
  const [auth, setAuth] = useState(null); // Changed initial state to null to indicate loading

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const formData = { token };
        const response = await axios.post(SERVER_URL+'/auth', formData);
        if (response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        console.log(err);
        setAuth(false); 
      }
    };
    fetchData();
  }, []);

  // Show a loading message or spinner while auth is null
  if (auth === null) {
    return <div>Loading...</div>;
  }

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
