import NotePage from 'features/Note/components/NotePage';
import UserBar from 'features/Note/components/UserBar';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './EditPage.scss';

const EditPage = () => {
  const { pageId } = useParams();
  const history = useHistory();

  return (
    <div className='note-edit' style={{ maxWidth: '50vw', margin: '0 auto' }}>
      <UserBar />

      <NotePage pageId={pageId} />

      <ArrowBackIosIcon
        className='note-edit-back'
        onClick={() => {
          history.push('/notes');
        }}
      />
    </div>
  );
};

EditPage.propTypes = {};

export default EditPage;
