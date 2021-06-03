import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import React from 'react';
import './ActionMenu.scss';

const MENU_WIDTH = 150;
const MENU_HEIGHT = 40;

const ActionMenu = ({ deleteBlock, openSelectMenu, position }) => {
  const x = position.x - MENU_WIDTH / 2;
  const y = position.y - MENU_HEIGHT - 10;

  return (
    <div
      className='action-menu'
      style={{
        top: y,
        left: x,
      }}
    >
      <span className='turn-into' onClick={openSelectMenu}>
        Turn into
      </span>

      <span className='delete' onClick={deleteBlock}>
        <DeleteOutlineIcon fontSize='large' />
      </span>
    </div>
  );
};

ActionMenu.propTypes = {};

export default ActionMenu;
