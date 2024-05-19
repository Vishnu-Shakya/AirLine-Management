import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Check from './pages/Check';

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<Signup />} />

          <Route path='/dashboard' element={<Dashboard />} />

          <Route path="/login" element={<Login/>} />
  
          <Route path="/check" element={<Check />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' toastClassName="single-line-toast" />

    </>

  )
}

export default App
