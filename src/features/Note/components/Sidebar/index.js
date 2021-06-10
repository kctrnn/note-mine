import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CodeIcon from '@material-ui/icons/Code';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import NotesIcon from '@material-ui/icons/Notes';
import { logout } from 'app/userSlice';
import classNames from 'classnames';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = ({ tagList }) => {
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const history = useHistory();

  const isLoggedIn = !!loggedInUser.id;

  const handleDropdownToggleClick = () => {
    setActive((x) => !x);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);

    history.push('/login');
  };

  const dropdownToggleClass = classNames('menu-link dropdown-toggle', {
    show: active,
  });

  const dropdownMenuClass = classNames('dropdown-menu', { show: active });

  return (
    <nav className='sidebar'>
      <h1 className='sidebar-brand'>Notemine</h1>

      <div className='sidebar-menu'>
        <div className='dropdown'>
          <Link to='#' className={dropdownToggleClass}>
            <NotesIcon fontSize='large' />
            Notes
            <ArrowForwardIosIcon onClick={handleDropdownToggleClick} />
          </Link>

          <div className={dropdownMenuClass}>
            <Link to='#' className='dropdown-item'>
              <NotesIcon fontSize='large' />
              Untagged
            </Link>
            <Link to='#' className='dropdown-item'>
              <NotesIcon fontSize='large' />
              Todo
            </Link>
            <Link to='#' className='dropdown-item'>
              <NotesIcon fontSize='large' />
              Locked
            </Link>
          </div>
        </div>

        <Link to='#' className='menu-link active'>
          <DeleteOutlineIcon fontSize='large' />
          Trash
        </Link>
      </div>

      <div className='sidebar-menu'>
        {tagList.map((tag, index) => (
          <Link key={index} className='menu-link' to='#'>
            <CodeIcon fontSize='large' />
            {tag}
          </Link>
        ))}
      </div>

      {isLoggedIn && (
        <div className='sidebar-user'>
          <img src={Images.CIRO_AVT} alt='' className='user-avatar' />
          <p className='user-username'>{loggedInUser.username}</p>
          <span className='user-logout' onClick={handleLogoutClick}>
            Log out
          </span>
        </div>
      )}
    </nav>
  );
};

Sidebar.propTypes = {
  tagList: PropTypes.array,
};

Sidebar.defaultProps = {
  tagList: [],
};

export default Sidebar;
