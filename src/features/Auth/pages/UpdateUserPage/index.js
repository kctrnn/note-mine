import { Box, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import blockApi from 'api/blockApi';
import userApi from 'api/userApi';
import Logo from 'components/Logo';
import UpdateUserForm from 'features/Auth/components/UpdateUserForm';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  large: {
    width: '10rem',
    height: '10rem',
    margin: '5rem auto 0',
  },

  uploadBtn: {
    fontFamily: `'Poppins', sans-serif`,
    textTransform: 'none',
    fontSize: '1.2rem',
  },
}));

const UpdateUserPage = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const classes = useStyles();
  const inputEl = useRef(null);
  const [progress, setProgress] = useState(0);

  const { enqueueSnackbar } = useSnackbar();

  const loggedInUser = useSelector((state) => state.user.current);
  const userId = loggedInUser.id;

  useEffect(() => {
    const getAvatarUrl = async (id) => {
      try {
        const { avatarUrl } = await userApi.getUser(id);

        setAvatarUrl(avatarUrl);
      } catch (error) {
        console.log(error);
      }
    };

    getAvatarUrl(userId);
  }, [userId]);

  const handleUploadBtnClick = () => {
    inputEl.current.click();
  };

  const handleUploadAvatar = async () => {
    if (inputEl.current && inputEl.current.files[0]) {
      const avatarFile = inputEl.current.files[0];
      const formData = new FormData();
      formData.append('files', avatarFile);

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.round((loaded * 100) / total);

          if (percent < 100) {
            setProgress(percent);
          }
        },
      };

      try {
        const response = await blockApi.uploadImage(formData, options);
        const { url } = response[0];

        setAvatarUrl(url);

        setProgress(100);
        setTimeout(() => {
          setProgress(0);
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        avatarUrl: avatarUrl,
      };

      const res = await userApi.updateAccount(userId, updatedData);

      enqueueSnackbar('Update account successfully 😊😊', {
        variant: 'success',
      });
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <div className='auth-reset' style={{ padding: '5rem 1rem 3rem' }}>
      <Logo />

      <Avatar alt='' src={avatarUrl} className={classes.large} />

      <input
        name='avatar'
        type='file'
        id='uploadAvatarInput'
        ref={inputEl}
        hidden
        onChange={handleUploadAvatar}
      />

      {progress === 0 && (
        <Box textAlign='center' mt={3}>
          <Button
            variant='contained'
            color='secondary'
            size='small'
            className={classes.uploadBtn}
            onClick={handleUploadBtnClick}
          >
            Change avatar
          </Button>
        </Box>
      )}

      {progress > 0 && (
        <Box textAlign='center' mt={3}>
          <CircularProgress variant='determinate' value={progress} />
        </Box>
      )}

      <UpdateUserForm onSubmit={handleSubmit} />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        <Link to='/notes' tabIndex='-1' style={{ color: 'rgb(41, 43, 44)' }}>
          Back to all notes
        </Link>
      </p>
    </div>
  );
};

export default UpdateUserPage;
