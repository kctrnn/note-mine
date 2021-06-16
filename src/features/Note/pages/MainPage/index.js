import pageApi from 'api/pageApi';
import NoteList from 'features/Note/components/NoteList';
import NotePage from 'features/Note/components/NotePage';
import Sidebar from 'features/Note/components/Sidebar';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MainPage = () => {
  const { pageId, username } = useParams();
  const [pageList, setPageList] = useState([]);

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
      };

      return note;
    });

  const tags = pageList.map((page) => page.hashtag);
  const pid = pageList.find((page) => page.pageId === pageId)?.id;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar tagList={tags} />

      <NoteList noteList={noteList} />

      <NotePage pid={pid} pageId={pageId} />
    </div>
  );
};

export default MainPage;
