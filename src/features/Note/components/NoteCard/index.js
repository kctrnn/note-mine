import React from 'react';
import PropTypes from 'prop-types';
import './NoteCard.scss';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';

const NoteCard = () => {
  return (
    <div className='note-card'>
      <div className='card-image'>
        <img
          src='https://images.unsplash.com/photo-1623180253479-3eaed9dda118?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80'
          alt=''
        />
      </div>
      <div className='card-content'>
        <p className='card-date'>JUN 21, 2020</p>
        <h3 className='card-title'>Welcome to NoteMine</h3>
        <p className='card-desc'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
          cupiditate, eius illo sapiente repellat recusandae quo tempora totam
          corrupti.
        </p>

        <div className='card-actions'>
          <EditIcon fontSize='large' />
          <DeleteOutlineIcon fontSize='large' />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {};

export default NoteCard;
