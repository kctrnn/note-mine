import { IconButton, makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import { logout } from 'app/userSlice';
import Logo from 'components/Logo';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './UserBar.scss';

const useStyles = makeStyles((theme) => ({
  list: {
    '& > *': {
      fontSize: '1.4rem',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: '500',
    },
  },
}));

const UserBar = (props) => {
  const loginInUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);

    history.push('/');
  };

  return (
    <div className='user-bar'>
      <Logo size='small' />

      <p className='user-bar-text'>{`🚀 Hello, ${loginInUser.username}`}</p>

      <IconButton
        color='inherit'
        onClick={handleClick}
        className='user-bar-account'
      >
        <AccountCircleTwoToneIcon />
      </IconButton>

      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
        classes={{
          list: classes.list,
        }}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

UserBar.propTypes = {};

export default UserBar;
