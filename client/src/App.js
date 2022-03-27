/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import './App.css';
import Home from './pages/home/Home';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import Profile from './pages/profile/Profile';
import UpdateProfile from './pages/updateProfile/UpdateProfile';

const App = () => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, [token]);

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/token');
      setToken(res.data.accessToken);

      const decode = jwt_decode(res.data.accessToken);
      setUserId(decode.userId);
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={userId ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={userId ? <Navigate to='/' /> : <Signup />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/profile/update/:userId' element={<UpdateProfile />} />
      </Routes>
    </div>
  );
};

export default App;
