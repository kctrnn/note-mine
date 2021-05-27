import NoteList from 'features/Note/components/NoteList';
import NotePage from 'features/Note/components/NotePage';
import Sidebar from 'features/Note/components/Sidebar';
import React from 'react';

const MainPage = () => {
  const tags = ['welcome', 'code', 'music'];
  const user = {
    userName: 'kctrnn',
    avatar: '',
  };

  const notes = [
    {
      title: 'Welcome to the notemine',
      content:
        'Welcome and welcome welcome and welcome welcome and welcome welcome and welcome welcome and welcome welcome and welcome welcome and welcome',
      time: '5d',
    },
    {
      title: 'Welcome 2',
      content:
        'Welcome and welcome welcome and welcome welcome and welcome welcome and welcome welcome and welcome',
      time: '4d',
    },
    {
      title: 'Welcome 3',
      content: 'Welcome and welcome welcome and welcome welcome and welcome',
      time: '2d',
    },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar tagList={tags} user={user} />

      <NoteList noteList={notes} />

      <NotePage />
    </div>
  );
};

export default MainPage;
