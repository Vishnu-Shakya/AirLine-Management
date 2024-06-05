import { useState,useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';



import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import Check from './pages/Check';
import Profile from './pages/Profile';


import PrivateRoutes from './utils/privateRoutes';

function App() {
  
  const SERVER_URL=import.meta.env.VITE_SERVER_URL
  console.log(SERVER_URL);
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken')); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formData = { token };
        const response = await axios.post(SERVER_URL + '/auth', formData);
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
  });
  const handleStateChange = (newToken,newAuth) => {
    setAuth(newAuth);
    setToken(newToken);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home SERVER_URL={SERVER_URL} auth={auth} />} />
          <Route element={<PrivateRoutes SERVER_URL={SERVER_URL} auth={auth} />}>
                <Route element={< Profile SERVER_URL={SERVER_URL} handleStateChange={handleStateChange} />} path="/profile"/>
          </Route>
          <Route path="/signup" element={<Signup SERVER_URL={SERVER_URL}  handleStateChange={handleStateChange} />} />

          <Route path='/search' element={<Search SERVER_URL={SERVER_URL} token={token} />} />

          <Route path="/login" element={<Login SERVER_URL={SERVER_URL}  handleStateChange={handleStateChange} />} />
  
          <Route path="/check" element={<Check />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position='top-center' toastClassName="single-line-toast" />
    </>
  )
}

export default App
