import { makeStyles, Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import blockApi from 'api/blockApi';
import pageApi from 'api/pageApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import uid from 'utils/uid';
import NoteCard from '../../components/NoteCard';
import UserBar from '../../components/UserBar';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '50vw',
    margin: '0 auto 8rem',

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

  addPageBtn: {
    marginTop: '3rem',
    fontFamily: `'Poppins', sans-serif`,
    fontSize: '1.4rem',
    textTransform: 'none',
  },

  paper: {
    backgroundColor: '#fffaf0',
    color: '#975a16',
    padding: '2rem',
    borderRadius: '1rem',

    '& > h3': {
      fontSize: '1.8rem',
      fontWeight: '600',
      marginBottom: '2rem',
    },

    '& > p': {
      fontWeight: '400',
      fontSize: '1.6rem',
    },
  },

  helloUser: {
    display: 'none',

    '@media screen and (max-width: 575px)': {
      display: 'block',
      textAlign: 'right',
    },
  },
}));

const MainPage = () => {
  const [pageList, setPageList] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const [noteList, setNoteList] = useState([]);

  const loggedInUser = useSelector((state) => state.user.current);
  const userId = loggedInUser.id;

  useEffect(() => {
    const fetchPageList = async () => {
      try {
        const response = await pageApi.getAll({
          [`creator.id`]: userId,
        });

        const cardList = response.map((page) => {
          const blocks = page.blocks;
          blocks.sort((a, b) =>
            a.position > b.position ? 1 : b.position > a.position ? -1 : 0
          );

          const note = {
            pid: page.id,
            pageId: page.pageId,
            date: new Date(page.updated_at),
            title: blocks[0]?.html || 'Page title',
            text: blocks
              .filter((block, index) => index !== 0)
              .map((block) => block.html),
            imageUrl: blocks.find((block) => !!block.imageUrl)?.imageUrl,
          };

          return note;
        });

        setPageList(response);
        setNoteList(cardList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPageList();
  }, [userId]);

  const handleNewPageClick = async () => {
    const newBlock = {
      blockId: uid(),
      tag: 'h1',
      html: '',
      imageUrl: '',
      creator: userId,
    };

    const { id } = await blockApi.add(newBlock);

    const newPage = {
      pageId: uid(),
      creator: userId,
      blocks: [{ id: id }],
    };

    const { pageId } = await pageApi.add(newPage);

    if (pageId) {
      history.push(`/notes/${pageId}`);
    }
  };

  return (
    <div className={classes.root}>
      {!!userId && <UserBar />}

      <p
        className={classes.helloUser}
      >{`🚀 Hello, ${loggedInUser.username} `}</p>

      <h1 style={{ marginBottom: '4rem', fontWeight: '600' }}>Notes</h1>

      {noteList.length === 0 && (
        <Paper elevation={0} className={classes.paper}>
          <h3>Let's go!</h3>
          <p>Seems like you haven't created any pages so far</p>
          <p>Click the button below to get started 🎬🎬</p>
        </Paper>
      )}

      {noteList.length > 0 &&
        noteList.map((note, index) => <NoteCard key={index} {...note} />)}

      <Button
        variant='contained'
        color='primary'
        size='large'
        className={classes.addPageBtn}
        onClick={handleNewPageClick}
      >
        New page
      </Button>
    </div>
  );
};

export default MainPage;
