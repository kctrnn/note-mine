import { IconButton, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import blockApi from 'api/blockApi';
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

const NoteCard = ({ title, text, date, pageId, pid, image }) => {
  const formattedDate = `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const classes = useStyles();
  const history = useHistory();

  const handleDeleteCardClick = async () => {
    try {
      const deletedPage = await pageApi.get(pid);
      const deletedBlockIds = deletedPage.blocks.map((block) => block.id);

      await pageApi.delete(pid);

      if (deletedBlockIds > 0) {
        deletedBlockIds.forEach((id) => {
          blockApi.delete(id);
        });
      }

      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper className={classes.noteCard} variant='outlined'>
      {image && (
        <div className='card-image'>
          <img
            src={process.env.REACT_APP_API_URL + image.replace('small_', '')}
            alt=''
          />
        </div>
      )}
      <div className='card-content'>
        <p className='card-date'>
          <span>Create at</span>
          {formattedDate}
        </p>
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
