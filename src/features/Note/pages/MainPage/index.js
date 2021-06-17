import pageApi from 'api/pageApi';
import React, { useEffect, useState } from 'react';
import NoteCard from '../../components/NoteCard';
import UserBar from '../../components/UserBar';

const MainPage = () => {
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

  return (
    <div className='note-main' style={{ maxWidth: '50vw', margin: '0 auto' }}>
      <UserBar />

      <h1 style={{ marginBottom: '4rem', fontWeight: '600' }}>Notes</h1>

      <NoteCard />
      <NoteCard />
      <NoteCard />
    </div>
  );
};

export default MainPage;
