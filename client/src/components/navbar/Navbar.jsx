import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import addPhoto from '../../images/add-photo.png';
import './Navbar.css';

const Navbars = props => {
  return (
    <Navbar bg='ligth' className=' shadow-sm bg-body navbar'>
      <Container>
        <Link to='/'>
          <h3 className='logo text-dark'>Socially</h3>
        </Link>
        <Nav className='w-100 p-0 m-0 gy-0 d-flex justify-content-end align-items-center navbar-bottom'>
          <Nav.Item className=''>
            <Link to='/'>
              <svg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1.61084 7.43296L9.88179 1L18.1527 7.43296V17.5419C18.1527 18.0294 17.9591 18.4969 17.6144 18.8415C17.2697 19.1862 16.8022 19.3799 16.3147 19.3799H3.44883C2.96136 19.3799 2.49386 19.1862 2.14917 18.8415C1.80448 18.4969 1.61084 18.0294 1.61084 17.5419V7.43296Z'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M7.12488 19.3799V10.1899H12.6388V19.3799' stroke='black' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
            </Link>
          </Nav.Item>
          <Nav.Item className=''>
            <Link to='#'>
              <svg width='19' height='19' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg' className='comments'>
                <path
                  d='M17.8843 12.3576C17.8843 12.8322 17.6958 13.2874 17.3602 13.623C17.0246 13.9586 16.5694 14.1472 16.0948 14.1472H5.35729L1.77814 17.7263V3.40969C1.77814 2.93507 1.96668 2.47988 2.30229 2.14427C2.6379 1.80866 3.09309 1.62012 3.56771 1.62012H16.0948C16.5694 1.62012 17.0246 1.80866 17.3602 2.14427C17.6958 2.47988 17.8843 2.93507 17.8843 3.40969V12.3576Z'
                  stroke='black'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Link>
          </Nav.Item>
          <Nav.Item className='mx-0'>
            <Button variant='primary' className='btn-add-photo'>
              <img src={addPhoto} className='add-photo' alt='' />
            </Button>
          </Nav.Item>
          <Nav.Item className=''>
            <Link to='#'>
              <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M16.5 3.88599C14.76 3.88599 13.09 4.69599 12 5.97599C10.91 4.69599 9.24 3.88599 7.5 3.88599C4.42 3.88599 2 6.30599 2 9.38599C2 13.166 5.4 16.246 10.55 20.926L12 22.236L13.45 20.916C18.6 16.246 22 13.166 22 9.38599C22 6.30599 19.58 3.88599 16.5 3.88599ZM12.1 19.436L12 19.536L11.9 19.436C7.14 15.126 4 12.276 4 9.38599C4 7.38599 5.5 5.88599 7.5 5.88599C9.04 5.88599 10.54 6.87599 11.07 8.24599H12.94C13.46 6.87599 14.96 5.88599 16.5 5.88599C18.5 5.88599 20 7.38599 20 9.38599C20 12.276 16.86 15.126 12.1 19.436Z'
                  fill='black'
                />
              </svg>
            </Link>
          </Nav.Item>
          <Nav.Item className=''>
            <Link to={`/profile/${props.userId}`}>
              <svg width='21' height='21' viewBox='0 0 21 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M4.31561 14.2085L4.31327 14.3637L4.3992 14.4929C5.77791 16.5664 8.14112 17.9361 10.8156 17.9361C13.49 17.9361 15.8532 16.5664 17.2319 14.4929L17.3178 14.3637L17.3155 14.2085C17.3053 13.531 16.9566 12.9696 16.4868 12.5301C16.019 12.0926 15.3976 11.7419 14.7433 11.4685C13.4369 10.9226 11.879 10.6361 10.8156 10.6361C9.74729 10.6361 8.18934 10.9225 6.88387 11.4686C6.23012 11.742 5.60955 12.0928 5.14256 12.5305C4.67346 12.9701 4.32582 13.5314 4.31561 14.2085ZM1.31555 10.2361C1.31555 4.99223 5.57169 0.736084 10.8156 0.736084C16.0594 0.736084 20.3156 4.99223 20.3156 10.2361C20.3156 15.4799 16.0594 19.7361 10.8156 19.7361C5.57169 19.7361 1.31555 15.4799 1.31555 10.2361ZM14.3156 6.23608C14.3156 4.29994 12.7517 2.73608 10.8156 2.73608C8.87941 2.73608 7.31555 4.29994 7.31555 6.23608C7.31555 8.17223 8.87941 9.73608 10.8156 9.73608C12.7517 9.73608 14.3156 8.17223 14.3156 6.23608Z'
                  fill='black'
                  stroke='black'
                />
              </svg>
            </Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbars;
