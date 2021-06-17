import NotePage from 'features/Note/components/NotePage';
import UserBar from 'features/Note/components/UserBar';
import React from 'react';
import { useParams } from 'react-router-dom';

const EditPage = () => {
  const { pageId } = useParams();

  return (
    <div className='note-edit' style={{ maxWidth: '50vw', margin: '0 auto' }}>
      <UserBar />

      <NotePage pageId={pageId} />
    </div>
  );
};

EditPage.propTypes = {};

export default EditPage;
