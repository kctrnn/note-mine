import pageApi from 'api/pageApi';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import uid from 'utils/uid';
import NoteCard from '../../components/NoteCard';
import UserBar from '../../components/UserBar';

const MainPage = () => {
  const [pageList, setPageList] = useState([]);
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
        pageId: page.pageId,
        date: new Date(page.updated_at),
        title: blocks[0].html,
        text: blocks
          .filter((block, index) => index !== 0)
          .map((block) => block.html),
      };

      return note;
    });

  console.log(noteList);

  return (
    <div className='note-main' style={{ maxWidth: '50vw', margin: '0 auto' }}>
      <UserBar />

      <h1 style={{ marginBottom: '4rem', fontWeight: '600' }}>Notes</h1>

      {noteList &&
        noteList.map((note, index) => (
          <NoteCard
            key={index}
            title={note.title}
            text={note.text}
            date={note.date}
            pageId={note.pageId}
          />
        ))}
    </div>
  );
};

export default MainPage;
