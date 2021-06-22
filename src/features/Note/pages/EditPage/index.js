import { Button, makeStyles } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NotePage from 'features/Note/components/NotePage';
import UserBar from 'features/Note/components/UserBar';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  backIcon: {
    position: 'absolute',
    top: '5rem',
    right: '5rem',
    fontSize: '1.6rem',
    textTransform: 'none',
    color: '#555',

    '@media screen and (max-width: 767px)': {
      top: '8rem',
      right: '3rem',
    },

    '@media screen and (max-width: 575px)': {
      // top: '10rem',
      right: '1rem',
    },
  },

  root: {
    maxWidth: '50vw',
    margin: '0 auto',

    '@media screen and (max-width: 991px)': {
      maxWidth: '60vw',
    },

    '@media screen and (max-width: 767px)': {
      maxWidth: '70vw',
    },

    '@media screen and (max-width: 575px)': {
      maxWidth: '90vw',
    },
  },
}));

const EditPage = () => {
  const { pageId } = useParams();

  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <UserBar />

      <NotePage pageId={pageId} />

      <Button
        className={classes.backIcon}
        onClick={() => {
          history.push('/notes');
        }}
      >
        <ArrowBackIosIcon fontSize='large' />
        Back
      </Button>
    </div>
  );
};

EditPage.propTypes = {};

export default EditPage;
