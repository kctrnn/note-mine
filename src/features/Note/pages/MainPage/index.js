import NoteList from 'features/Note/components/NoteList';
import NotePage from 'features/Note/components/NotePage';
import Sidebar from 'features/Note/components/Sidebar';
import React from 'react';
import uid from 'utils/uid';

const MainPage = () => {
  const user = {
    userName: 'kctrnn',
    avatar: '',
  };

  // sample data
  const pages = [
    {
      blocks: [
        { _id: uid(), html: 'Welcome to Note Mine', tag: 'h1' },
        { _id: uid(), html: '<i>This is paragraph</i>', tag: 'p' },
      ],

      hashtag: 'welcome',
      user: {
        userName: 'kctrnn',
      },
    },

    {
      blocks: [
        { _id: uid(), html: 'Welcome to Note Mine', tag: 'h1' },
        { _id: uid(), html: 'I am <b>kctrnn</b>', tag: 'h2' },
      ],

      hashtag: 'music',
      user: {
        userName: 'kctrnn',
      },
    },

    {
      blocks: [
        { id: uid(), html: 'Welcome to Note Mine', tag: 'h1' },
        {
          id: uid(),
          html: 'Welcome and welcome welcome and welcome welcome and welcome welcome and welcome welcome and welcome welcome and welcome welcome and welcome',
          tag: 'p',
        },
        { id: uid(), html: 'I am <b>kctrnn</b>', tag: 'h2' },
        { id: uid(), html: '<i>This is paragraph</i>', tag: 'p' },
      ],

      hashtag: 'code',
      user: {
        userName: 'kctrnn',
      },
    },
  ];

  const tags = pages.map((page) => page.hashtag);

  const notes = pages.map((page) => {
    const note = {
      title: page.blocks[0].html,
      htmlBlocks: page.blocks.map((block) => block.html),
      time: '21d',
    };

    return note;
  });

  const blocks = pages[2].blocks;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar tagList={tags} user={user} />

      <NoteList noteList={notes} />

      <NotePage id='213' fetchedBlocks={blocks} />
    </div>
  );
};

export default MainPage;
