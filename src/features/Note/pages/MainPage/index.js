import pageApi from 'api/pageApi';
import NoteList from 'features/Note/components/NoteList';
import NotePage from 'features/Note/components/NotePage';
import Sidebar from 'features/Note/components/Sidebar';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MainPage = () => {
  const { pageId, username } = useParams();
  const [pageList, setPageList] = useState([]);

  const loggedInUser = useSelector((state) => state.user.current);

  useEffect(() => {
    const fetchPageList = async () => {
      try {
        const response = await pageApi.getAll();
        setPageList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPageList();
  }, []);

  const noteList = pageList
    .filter((page) => page.creator.username === username)
    .map((page) => {
      const note = {
        title: page.blocks[0].html,
        htmlBlocks: page.blocks.map((block) => block.html),
        time: '21d',
        pageId: page.pageId,
      };

      return note;
    });

  const tags = pageList.map((page) => page.hashtag);

  const pid = pageList.find((page) => page.pageId === pageId)?.id || 0;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar tagList={tags} />

      <NoteList noteList={noteList} userId={loggedInUser.id} />

      <NotePage pid={pid} pageId={pageId} userId={loggedInUser.id} />
    </div>
  );
};

export default MainPage;
