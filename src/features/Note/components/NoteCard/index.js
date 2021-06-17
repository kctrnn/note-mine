import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { Link } from 'react-router-dom';
import './NoteCard.scss';
import { IconButton } from '@material-ui/core';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const NoteCard = ({ title, text, date, pageId }) => {
  const formattedDate = `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  return (
    <div className='note-card'>
      <div className='card-image'>
        <img
          src='https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1067&q=80'
          alt=''
        />
      </div>
      <div className='card-content'>
        <p className='card-date'>{formattedDate}</p>
        <h3 className='card-title'>{title}</h3>
        <div className='card-desc'>
          {text.map((blockHtml, index) => (
            <ContentEditable disabled html={blockHtml} key={index} />
          ))}
        </div>

        <div className='card-actions'>
          <Link to={`/notes/${pageId}`} className='card-edit'>
            Edit
          </Link>

          <IconButton color='default'>
            <DeleteTwoToneIcon className='card-delete' />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {};

export default NoteCard;
