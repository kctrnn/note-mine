import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));

  return (
    <Route
      {...rest}
      render={() => (isLoggedIn ? children : <Redirect to='/login' />)}
    />
  );
};

export default PrivateRoute;
