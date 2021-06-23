import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import userApi from 'api/userApi';
import Logo from 'components/Logo';
import Images from 'constants/images';
import UpdateUserForm from 'features/Auth/components/UpdateUserForm';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  large: {
    width: '10rem',
    height: '10rem',
    margin: '5rem auto 0',
  },
}));

const UpdateUserPage = () => {
  const [userCurrent, setUserCurrent] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const getUserCurrent = async () => {
      try {
        const res = await userApi.getMe();
        console.log(res);

        setUserCurrent(res);
      } catch (error) {
        console.log(error);
      }
    };

    getUserCurrent();
  }, []);

  return (
    <div className='auth-reset' style={{ paddingTop: '5rem' }}>
      <Logo />
      <Avatar alt='' src={Images.NIAL_AVT} className={classes.large} />

      <UpdateUserForm />

      <p style={{ fontWeight: '400', textAlign: 'center' }}>
        <Link to='/notes' tabIndex='-1' style={{ color: 'rgb(41, 43, 44)' }}>
          Back to all notes
        </Link>
      </p>
    </div>
  );
};

export default UpdateUserPage;
