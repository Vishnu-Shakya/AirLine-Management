import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoutes = ({ SERVER_URL,auth }) => {
  
  // Show a loading message or spinner while auth is null
  console.log(auth);
  if (auth === null) {
    return <div>Loading...</div>;
  }
  else {
    return auth ? <Outlet /> : <Navigate to="/login" />;
  };
}



export default PrivateRoutes;
