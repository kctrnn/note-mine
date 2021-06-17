import PanToolIcon from '@material-ui/icons/PanTool';
import React from 'react';
import { useHistory } from 'react-router';
import './Logo.scss';
import classNames from 'classnames';

const Logo = ({ size }) => {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push('/');
  };

  const logoClass = classNames('logo', {
    [`logo--small`]: size === 'small',
  });

  return (
    <div className={logoClass} onClick={handleLogoClick}>
      <PanToolIcon className='logo-icon' color='action' />
      <span className='logo-text'>
        Note<strong>Mine</strong>
      </span>
    </div>
  );
};

export default Logo;
