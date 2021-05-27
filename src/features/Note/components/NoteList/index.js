import React from 'react';
import PropTypes from 'prop-types';
import './NoteList.scss';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';

const NoteList = ({ noteList }) => {
  return (
    <div className='note-list'>
      <div className='header'>
        <div className='header-search'>
          <SearchIcon fontSize='large' />
          <input type='text' placeholder='Search Notes' />
        </div>

        <CreateIcon className='header-create' fontSize='large' />
      </div>

      {noteList.map((note, index) => (
        <div className='note' key={index}>
          <span className='note-time'>{note.time}</span>

          <div className='note-content'>
            <p className='note-title'>{note.title}</p>
            <p className='note-text'>{note.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

NoteList.propTypes = {};

export default NoteList;
