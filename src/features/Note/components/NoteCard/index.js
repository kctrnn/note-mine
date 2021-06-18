import { IconButton, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import pageApi from 'api/pageApi';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { Link, useHistory } from 'react-router-dom';
import './NoteCard.scss';

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

const useStyles = makeStyles((theme) => ({
  noteCard: {
    padding: '1.5rem',
    marginBottom: '3rem',
    borderRadius: '1rem',
  },
}));

const NoteCard = ({ title, text, date, pageId, pid }) => {
  const formattedDate = `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const classes = useStyles();
  const history = useHistory();

  const handleDeleteCardClick = async () => {
    try {
      const response = await pageApi.delete(pid);
      console.log('Deleted page: ', response);
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper className={classes.noteCard} variant='outlined'>
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
          <IconButton color='default' onClick={handleDeleteCardClick}>
            <DeleteOutlineIcon className='card-delete' />
          </IconButton>

          <Link to={`/notes/${pageId}`} className='card-edit'>
            Edit
          </Link>
        </div>
      </div>
    </Paper>
  );
};

NoteCard.propTypes = {};

export default NoteCard;
