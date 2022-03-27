/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModalPost = props => {
  const [name, setName] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [saveImage, setSaveImage] = useState('https://fakeimg.pl/300/');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showFileName = e => {
    setName(e.target.files[0].name);
    setUserPicture(e.target.files[0]);
    setSaveImage(URL.createObjectURL(e.target.files[0]));
  };

  const post = async () => {
    let formData = new FormData();
    formData.append('userId', props.userid);
    formData.append('image', userPicture);

    try {
      await axios.post(`http://localhost:5050/api/v1/post/${props.userid}`, formData);
      setLoading(false);
      props.onHide();

      navigate(`/profile/${props.userid}`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
      <div className='row py-4'>
        <div className='col-lg-8 mx-auto'>
          <picture>
            <img src={saveImage} className='img-fluid img-preview' alt='' />
          </picture>

          <div className='input-group my-3 px-2 rounded-pill bg-light shadow-sm'>
            <input id='upload' type='file' onChange={showFileName} className='form-control border-0 bg-light shadow-none' required />
          </div>

          <p className='text-danger mb-3 ms-4'>{msg}</p>
        </div>
      </div>
      <Modal.Footer>
        {loading && !msg ? (
          <Button variant='primary' disabled>
            <Spinner as='span' animation='grow' size='sm' role='status' aria-hidden='true' />
            Loading...
          </Button>
        ) : (
          <Button
            onClick={() => {
              post();
              setLoading(true);
            }}>
            Upload
          </Button>
        )}
        <Button
          onClick={() => {
            props.onHide();
            setMsg('');
            setLoading(false);
            setSaveImage('https://fakeimg.pl/300/');
          }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPost;
