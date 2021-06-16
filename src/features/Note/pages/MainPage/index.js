import pageApi from 'api/pageApi';
import React, { useEffect, useState } from 'react';

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
    <div className='note-main'>
      {/* <Sidebar tagList={tags} />
      <NoteList noteList={noteList} userId={loggedInUser.id} /> */}

      {/* <NotePage pid={pid} pageId={pageId} userId={loggedInUser.id} /> */}
    </div>
  );
};

export default MainPage;
