import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../auth.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`http://localhost:5050/api/v1/users`, {
        username,
        fullName,
        email,
        password,
      });

      setLoading(false);
      navigate('/login');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className='form-auth'>
      <div className='form-auth-header'>
        <h1>Simple Social Media</h1>
        <p>
          Sign up to see photos and videos <br /> from your friends.
        </p>
      </div>
      <Form className='form' onSubmit={register} encType='multipart/form-data'>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Control type='text' className='shadow-none' placeholder='Username' required value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='fullName'>
          <Form.Control type='text' className='shadow-none' placeholder='Full Name' required value={fullName} onChange={e => setFullName(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Control type='email' className='shadow-none' placeholder='Email' required value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Control type='password' className='shadow-none' placeholder='Password' required value={password} onChange={e => setPassword(e.target.value)} />
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
            Sign up
          </Button>
        )}
      </Form>

      <p className='link-login mb-3'>
        Don't have an account? <Link to='/login'>login</Link>
      </p>
    </div>
  );
};

export default Signup;
