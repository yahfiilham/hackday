/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Navbars from '../../components/navbar/Navbar';
import bgWave from '../../images/bg-wave.png';
import noPictures from '../../images/no-pictures.png';
import userPicture from '../../images/user.png';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUsers();
  }, [token]);

  const refreshToken = async () => {
    try {
      const res = await axios.get('http://localhost:5050/api/v1/token');
      setToken(res.data.accessToken);

      const decode = jwt_decode(res.data.accessToken);
      setUserId(decode.userId);
      setExpire(decode.exp);
    } catch (error) {
      navigate('/login');
    }
  };

  const axiosJWT = axios.create();

  // memanggil endpoint refresh token tanpa haru reload dengan axios intecepter
  axiosJWT.interceptors.request.use(
    async config => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const res = await axios.get('http://localhost:5050/api/v1/token');
        config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        setToken(res.data.accessToken);
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const getUsers = async () => {
    const res = await axiosJWT.get('http://localhost:5050/api/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(res.data.data);
  };

  return (
    <div className='home pt-5'>
      <img src={bgWave} alt='' className='bg-feed' />
      <Container className='mb-5 pb-5'>
        <div className='d-flex justify-content-between px-3'>
          <p className='fw-bold'>Socially</p>
          <svg width='17' height='20' viewBox='0 0 17 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M8.29761 19.75C9.39761 19.75 10.2976 18.85 10.2976 17.75H6.29761C6.29761 18.85 7.18761 19.75 8.29761 19.75ZM14.2976 13.75V8.75C14.2976 5.68 12.6576 3.11 9.79761 2.43V1.75C9.79761 0.92 9.12761 0.25 8.29761 0.25C7.46761 0.25 6.79761 0.92 6.79761 1.75V2.43C3.92761 3.11 2.29761 5.67 2.29761 8.75V13.75L0.297607 15.75V16.75H16.2976V15.75L14.2976 13.75Z'
              fill='black'
            />
          </svg>
        </div>
        <div className='feed mt-5 px-3 mb-4'>
          <h3 className='fw-bold'>Feed</h3>
          {users.length > 0 ? (
            <>
              {users.map((user, i) => {
                return (
                  <Card className='feed-card text-white shadow mt-4' key={i}>
                    <Card.Img src={`http://localhost:5050/${user.picture_post}`} alt='Card image' height={300} className='img-bg' />
                    <Card.ImgOverlay>
                      <div className='d-flex flex-column justify-content-between h-100'>
                        <div className='card-head d-flex align-items-center mt-1'>
                          <Link to={`/profile/${user.id}`}>
                            <img src={user.user_picture ? `http://localhost:5050/${user.user_picture}` : userPicture} alt='' width={40} className='rounded-circle' />
                          </Link>
                          <div className='card-info ms-3'>
                            <Link to={`/profile/${user.id}`}>
                              <p className='text-white'>{user.fullname}</p>
                            </Link>
                            <p className='text-gray'>{new Date(users[0].created_at).toString().substring(0, 10)}</p>
                          </div>
                          <svg width='6' height='19' viewBox='0 0 6 19' fill='none' xmlns='http://www.w3.org/2000/svg' className='ms-auto'>
                            <ellipse cx='2.93481' cy='2.40699' rx='2.11938' ry='2.03699' fill='white' />
                            <ellipse cx='2.93481' cy='9.58509' rx='2.11938' ry='2.03699' fill='white' />
                            <ellipse cx='2.93481' cy='16.7631' rx='2.11938' ry='2.03699' fill='white' />
                          </svg>
                        </div>

                        <div className='d-flex justify-content-evenly'>
                          <Button className='bg-button-card d-flex rounded-pill px-3'>
                            <svg width='19' height='18' viewBox='0 0 19 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <g clipPath='url(#clip0_27_678)'>
                                <path
                                  d='M12.5723 2.71252C11.2553 2.71252 9.9912 3.3018 9.16616 4.23299C8.34111 3.3018 7.07705 2.71252 5.76 2.71252C3.42868 2.71252 1.59692 4.47307 1.59692 6.71376C1.59692 9.4637 4.17046 11.7044 8.06862 15.1091L9.16616 16.0621L10.2637 15.1018C14.1619 11.7044 16.7354 9.4637 16.7354 6.71376C16.7354 4.47307 14.9036 2.71252 12.5723 2.71252ZM9.24185 14.0251L9.16616 14.0979L9.09046 14.0251C5.48751 10.8896 3.11077 8.81622 3.11077 6.71376C3.11077 5.25876 4.24616 4.16752 5.76 4.16752C6.92566 4.16752 8.06105 4.88774 8.46222 5.88441H9.87766C10.2713 4.88774 11.4066 4.16752 12.5723 4.16752C14.0862 4.16752 15.2215 5.25876 15.2215 6.71376C15.2215 8.81622 12.8448 10.8896 9.24185 14.0251Z'
                                  fill='white'
                                />
                              </g>
                              <defs>
                                <clipPath id='clip0_27_678'>
                                  <rect width='18.1662' height='17.4599' fill='white' transform='translate(0.0830688 0.530029)' />
                                </clipPath>
                              </defs>
                            </svg>

                            <p className='ms-2'>1.1K</p>
                          </Button>

                          <Button className='bg-button-card d-flex rounded-pill px-3'>
                            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <path
                                d='M14.7323 10.1967C14.7323 10.5798 14.5801 10.9472 14.3092 11.2181C14.0383 11.489 13.6709 11.6411 13.2879 11.6411H4.62119L1.7323 14.53V2.97447C1.7323 2.59138 1.88448 2.22398 2.15537 1.9531C2.42625 1.68221 2.79365 1.53003 3.17674 1.53003H13.2879C13.6709 1.53003 14.0383 1.68221 14.3092 1.9531C14.5801 2.22398 14.7323 2.59138 14.7323 2.97447V10.1967Z'
                                stroke='white'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                              />
                            </svg>

                            <p className='ms-2'>5.2K</p>
                          </Button>

                          <Button className='bg-button-card d-flex rounded-pill px-3'>
                            <svg width='11' height='15' viewBox='0 0 11 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                              <path
                                d='M5.0738 9.87242L1.7323 12.7962V1.25C1.7323 1.11166 1.84396 1 1.9823 1H9.4823C9.62064 1 9.7323 1.11166 9.7323 1.25V12.7962L6.3908 9.87242L5.7323 9.29623L5.0738 9.87242Z'
                                stroke='white'
                                strokeWidth='2'
                              />
                            </svg>

                            <p className='ms-2'>322</p>
                          </Button>
                        </div>
                      </div>
                    </Card.ImgOverlay>
                  </Card>
                );
              })}
            </>
          ) : (
            <figure className='text-center mt-5'>
              <img src={noPictures} alt='no pictures' className='img-fluid' width={120} />
            </figure>
          )}
        </div>
      </Container>

      <Navbars userId={userId} />
    </div>
  );
};

export default Home;
