import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/home/Home';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
