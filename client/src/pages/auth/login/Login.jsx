import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../../../images/Hero-img.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const auth = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`http://localhost:5050/api/v1/login`, {
        email,
        password,
      });

      setLoading(false);
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className='form-auth'>
      <div className='text-center mt-3 mb-4'>
        <p className='text-secondary mb-0 pb-0'>Welcome to</p>
        <h1 className='mt-0 pt-0'>Simple Social Media</h1>
        <img src={heroImg} className='img-fluid w-75' alt='Hero img' />
      </div>
      <Form className='form' onSubmit={auth}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Control type='email' className='shadow-none' placeholder='Email' required value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Control type='password' className='shadow-none' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>

        {/* errors message */}
        <p className='text-danger mb-3'>{msg}</p>

        {loading && !msg ? (
          <Button variant='primary' disabled>
            <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
            Loading...
          </Button>
        ) : (
          <Button type='submit' className='btnSignUp'>
            Login
          </Button>
        )}
      </Form>

      <p className='mb-3 link-login'>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
