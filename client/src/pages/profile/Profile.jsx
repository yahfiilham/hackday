/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ModalProfile from '../../components/modals/modalProfile/ModalProfile';
import Navbars from '../../components/navbar/Navbar';
import bgWave from '../../images/bg-wave.png';
import noPictures from '../../images/no-pictures.png';
import photos from '../../images/photos.png';
import saved from '../../images/saved.png';
import user from '../../images/user.png';
import './Profile.css';

const Profile = () => {
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [userPicture, setUserPicture] = useState('');
  const [pictures, setPictures] = useState([]);
  const [picturesId, setPicturesId] = useState([]);
  const [picturesIdShow, setPicturesIdShow] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [pictureShow, setPictureShow] = useState('');

  const navigate = useNavigate();
  let { userId } = useParams();

  useEffect(() => {
    refreshToken();
    getUser();
  }, [userId, picturesId]);

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/token');
      const decode = jwt_decode(res.data.accessToken);
      setId(decode.userId);
    } catch (error) {
      navigate('/login');
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/users/${userId}`);
      setFullName(res.data.data[0].fullname);
      setUsername(res.data.data[0].username);
      setUserPicture(res.data.data[0].user_picture);
      const pictures = res.data.data.map(picture => {
        return picture.picture_post;
      });
      setPictures(pictures);

      const picturesId = res.data.data.map(picture => {
        return picture.post_id;
      });
      setPicturesId(picturesId);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    try {
      axios.delete('http://localhost:5050/api/v1/logout');
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='profile'>
      <DropdownButton
        title={
          <span>
            <svg width='6' height='19' viewBox='0 0 6 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <ellipse cx='2.93481' cy='2.40699' rx='2.11938' ry='2.03699' fill='black' />
              <ellipse cx='2.93481' cy='9.58509' rx='2.11938' ry='2.03699' fill='black' />
              <ellipse cx='2.93481' cy='16.7631' rx='2.11938' ry='2.03699' fill='black' />
            </svg>
          </span>
        }
        id='input-group-dropdown-2'
        align='end'
        className='dropdown-bg position-absolute top-0 end-0 mt-4 me-4'>
        <Dropdown.Item as='button'>
          <Link to={`/profile/update/${userId}`} className='text-dark'>
            {id === Number(userId) ? 'update profile' : ''}
          </Link>
        </Dropdown.Item>
        <Dropdown.Item as='button' onClick={logout}>
          logout
        </Dropdown.Item>
      </DropdownButton>

      <img src={bgWave} className='bg-wave' alt='' />
      <Container className='mb-5 container-new'>
        <div className='profile-head text-center'>
          <img src={userPicture ? `http://localhost:5050/${userPicture}` : user} alt='' width={100} className=' userPicture img-fluid rounded-circle' />
          <h2 className='mt-3'>{fullName ? fullName : 'Full Name'}</h2>
          <p className='mb-3'>{username ? '@' + username : '@username'}</p>
        </div>

        <div className='profile-info d-flex justify-content-evenly align-items-center mt-5 pt-5'>
          <div className='profile-posts text-center '>
            <p className='text-secondary'>Posts</p>
            <h2>35</h2>
          </div>

          <h2>1,552</h2>

          <div className='profile-followers text-center'>
            <p className='text-secondary'>Follows</p>
            <h2>355</h2>
          </div>
        </div>

        <div className='profile-photos mt-5'>
          <div className='profile-photos-icon d-flex justify-content-evenly'>
            <img src={photos} alt='' />
            <img src={saved} alt='' />
          </div>
          <div className='photos-list mt-4 d-flex flex-row flex-wrap justify-content-start'>
            {pictures[0] !== null ? (
              <>
                {pictures.map((picture, index) => {
                  return (
                    <div className='img' key={index}>
                      <Button
                        onClick={() => {
                          setModalShow(true);
                          setPictureShow(picture);
                          setPicturesIdShow(picturesId[index]);
                        }}
                        className='btn-img '>
                        <img src={`http://localhost:5050/${picture}`} alt='' className='img-fluid' />
                      </Button>
                      <ModalProfile show={modalShow} onHide={() => setModalShow(false)} userpicture={pictureShow} pictureid={picturesIdShow} userid={id} paramsid={userId} />
                    </div>
                  );
                })}
              </>
            ) : (
              <img src={noPictures} alt='no pictures' className='img-flui mx-auto' width={120} />
            )}
          </div>
        </div>
      </Container>

      <Navbars userId={id} />
    </div>
  );
};

export default Profile;
