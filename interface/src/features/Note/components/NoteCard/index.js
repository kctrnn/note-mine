import { IconButton, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import blockApi from 'api/blockApi';
import pageApi from 'api/pageApi';
import React from 'react';
import ContentEditable from 'react-contenteditable';
import { useHistory } from 'react-router-dom';
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

    cursor: 'pointer',
    position: 'relative',

    '&:hover': {
      boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.1);',

      '& > .card-actions': {
        opacity: '1',
        transform: 'scale(1)',
      },
    },
  },

  btnDelete: {
    fontSize: '2.4rem',
  },
}));

const NoteCard = ({ title, text, date, pageId, pid, imageUrl }) => {
  const formattedDate = `${
    MONTHS[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  const classes = useStyles();
  const history = useHistory();

  const handleDeleteCardClick = async (e) => {
    try {
      e.stopPropagation();

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

  const handleCardClick = () => {
    history.push(`/notes/${pageId}`);
  };

  return (
    <Paper
      className={classes.noteCard}
      variant='outlined'
      onClick={handleCardClick}
    >
      {imageUrl && (
        <div className='card-image'>
          <img src={imageUrl} alt='' />
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
      </div>

      {pid !== 59 && (
        <div className='card-actions'>
          <IconButton color='default' onClick={handleDeleteCardClick}>
            <DeleteOutlineIcon className={classes.btnDelete} />
          </IconButton>
        </div>
      )}
    </Paper>
  );
};

NoteCard.propTypes = {};

export default NoteCard;
