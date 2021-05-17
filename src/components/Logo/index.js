import PanToolIcon from '@material-ui/icons/PanTool';
import React from 'react';
import './Logo.scss';

const Logo = () => {
  return (
    <div className='logo'>
      <PanToolIcon className='logo-icon' color='action' />
      <span className='logo-text'>
        Note<strong>Mine</strong>
      </span>
    </div>
  );
};

export default Logo;
