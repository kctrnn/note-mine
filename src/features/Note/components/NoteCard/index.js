import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import React from 'react';
import './NoteCard.scss';

const NoteCard = () => {
  return (
    <div className='note-card'>
      <div className='card-image'>
        <img
          src='https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1067&q=80'
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
          <EditTwoToneIcon fontSize='large' />
          <DeleteTwoToneIcon fontSize='large' />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {};

export default NoteCard;
