import axios from 'axios';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ModalProfile = props => {
  //   console.log(props);

  const navigate = useNavigate();

  const handleDelete = () => {
    try {
      axios({
        method: 'DELETE',
        url: 'http://localhost:5050/api/v1/post',
        data: {
          postId: props.pictureid,
        },
      });

      props.onHide();
      navigate(`/profile/${props.paramsid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal {...props} size='md' aria-labelledby='contained-modal-title-vcenter' centered>
      <img src={`http://localhost:5050/${props.userpicture}`} alt='' className='w-100 img-show' />
      <Modal.Footer className='bg-light'>
        {props.userid === Number(props.paramsid) ? (
          <>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        ) : (
          ''
        )}

        <Button
          onClick={() => {
            props.onHide();
          }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProfile;
