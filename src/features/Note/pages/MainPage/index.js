import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'features/Note/components/Sidebar';
import NoteList from 'features/Note/components/NoteList';
import NotePage from 'features/Note/components/NotePage';

const MainPage = (props) => {
  const tags = ['welcome', 'code', 'music'];
  const user = {
    userName: 'kctrnn',
    avatar: '',
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar tagList={tags} user={user} />

      <NoteList />

      <NotePage />
    </div>
  );
};

MainPage.propTypes = {};

export default MainPage;