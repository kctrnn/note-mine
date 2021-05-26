import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CodeIcon from '@material-ui/icons/Code';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import NotesIcon from '@material-ui/icons/Notes';
import classNames from 'classnames';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = ({ tagList, user }) => {
  const [active, setActive] = useState(false);

  const handleDropdownToggleClick = () => {
    setActive((x) => !x);
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
          <Link className={dropdownToggleClass}>
            <NotesIcon fontSize='large' />
            Notes
            <ArrowForwardIosIcon onClick={handleDropdownToggleClick} />
          </Link>

          <div className={dropdownMenuClass}>
            <Link className='dropdown-item'>
              <NotesIcon fontSize='large' />
              Untagged
            </Link>
            <Link className='dropdown-item'>
              <NotesIcon fontSize='large' />
              Todo
            </Link>
            <Link className='dropdown-item'>
              <NotesIcon fontSize='large' />
              Locked
            </Link>
          </div>
        </div>

        <Link className='menu-link active'>
          <DeleteOutlineIcon fontSize='large' />
          Trash
        </Link>
      </div>

      <div className='sidebar-menu'>
        {tagList.map((tag) => (
          <Link className='menu-link'>
            <CodeIcon fontSize='large' />
            {tag}
          </Link>
        ))}
      </div>

      <div className='sidebar-user'>
        <img src={Images.CIRO_AVT} alt='' className='user-avatar' />
        <p className='user-username'>{user.userName}</p>
        <ArrowForwardIosIcon className='user-icon' />
      </div>
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
