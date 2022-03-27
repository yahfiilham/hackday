/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import FormData from 'form-data';
import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import frame from '../../images/Frame.png';
import './UpdateProfile.css';

const UpdateProfile = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [saveImage, setSaveImage] = useState('https://fakeimg.pl/300/');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/users/${userId}`);
      setFullName(res.data.data[0].fullname);
      setUsername(res.data.data[0].username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = e => {
    setUserPicture(e.target.files[0]);
    setSaveImage(URL.createObjectURL(e.target.files[0]));
  };

  const updateProfile = async e => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append('image', userPicture);
    formData.append('username', username);
    formData.append('fullName', fullName);

    try {
      await axios.put(`http://localhost:5050/api/v1/users/${userId}`, formData);
      setLoading(false);

      navigate(`/profile/${userId}`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className='updateProfile pt-4'>
      <span className='align-self-start ms-4'>
        <Link to={`/profile/${userId}`}>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M19.7118 8.62391L4.71851 8.62391L11.6053 1.7371L9.8559 0L0 9.8559L9.8559 19.7118L11.593 17.9747L4.71851 11.0879L19.7118 11.0879V8.62391Z' fill='black' />
          </svg>
        </Link>
      </span>
      <div className='d-flex flex-column justify-content-center align-items-center pt-4'>
        <div className='text-center'>
          <h1 className='mb-3'>Socially</h1>
          <img src={frame} className='img-fluid' alt='' />
        </div>
        <Form className='form' onSubmit={updateProfile}>
          <Form.Group className='mb-3'>
            <Form.Control type='text' name='username' className='shadow-none' placeholder='Username' required value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control type='text' name='fullName' className='shadow-none' placeholder='Full Name' required value={fullName} onChange={e => setFullName(e.target.value)} />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control type='file' name='userPicture' className='shadow-none' required onChange={handleUploadImage} />
          </Form.Group>

          <picture>
            <img src={saveImage} className='img-fluid img-preview' alt='' />
          </picture>

          <p className='text-danger mb-3'>{msg}</p>

          {loading && !msg ? (
            <Button variant='primary' disabled>
              <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
              Loading...
            </Button>
          ) : (
            <Button type='submit' className='btnSignUp'>
              Update
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
