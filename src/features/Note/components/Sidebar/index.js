import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import PropTypes from 'prop-types';
import React from 'react';
import './Sidebar.scss';

const Sidebar = ({ tagList }) => {
  return (
    <div className='sidebar'>
      <h1 className='sidebar-brand'>Notemine</h1>

      <hr />

      <div className='sidebar-menu'>
        <div className='menu-main'>
          <a href='#' className='menu-link active'>
            <DeleteOutlineIcon fontSize='large' />
            Notes
          </a>

          <a href='#' className='menu-link'>
            <DeleteOutlineIcon fontSize='large' />
            Trash
          </a>
        </div>

        <hr />

        <div className='menu-list'>
          {tagList.map((tag) => (
            <a href='#' className='menu-link'>
              <DeleteOutlineIcon fontSize='large' />
              Notes
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  tagList: PropTypes.array,
};

Sidebar.defaultProps = {
  tagList: [],
};

export default Sidebar;
