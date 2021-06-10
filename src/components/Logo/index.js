import PanToolIcon from '@material-ui/icons/PanTool';
import React from 'react';
import { useHistory } from 'react-router';
import './Logo.scss';

const Logo = () => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/');
  };

  return (
    <div className='logo' onClick={handleLogoClick}>
      <PanToolIcon className='logo-icon' color='action' />
      <span className='logo-text'>
        Note<strong>Mine</strong>
      </span>
    </div>
  );
};

export default Logo;
