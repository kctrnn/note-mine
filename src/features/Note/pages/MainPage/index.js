import pageApi from 'api/pageApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import uid from 'utils/uid';
import NoteCard from '../../components/NoteCard';
import UserBar from '../../components/UserBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import blockApi from 'api/blockApi';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  addPageBtn: {
    marginTop: '3rem',
    fontFamily: `'Poppins', sans-serif`,
    fontSize: '1.4rem',
    textTransform: 'none',
  },
}));

const MainPage = () => {
  const [pageList, setPageList] = useState([]);
  const classes = useStyles();
  const history = useHistory();

  const loggedInUser = useSelector((state) => state.user.current);
  const userId = loggedInUser.id;

  useEffect(() => {
    const fetchPageList = async () => {
      try {
        const response = await pageApi.getAll({
          [`creator.id`]: userId,
        });
        setPageList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPageList();
  }, [userId]);

  const noteList =
    !!pageList.length &&
    pageList.map((page) => {
      const blocks = page.blocks;
      const note = {
        pid: page.id,
        pageId: page.pageId,
        date: new Date(page.updated_at),
        title: blocks[0].html || 'Page title',
        text: blocks
          .filter((block, index) => index !== 0)
          .map((block) => block.html),
      };

      return note;
    });

  console.log(noteList);

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
    <div
      className='note-main'
      style={{ maxWidth: '50vw', margin: '0 auto 8rem' }}
    >
      {!!userId && <UserBar />}

      <h1 style={{ marginBottom: '4rem', fontWeight: '600' }}>Notes</h1>

      {noteList &&
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
