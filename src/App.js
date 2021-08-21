import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import pageApi from 'api/pageApi';
import Home from 'components/Home';
import NotFound from 'components/NotFound';
import Preloader from 'components/Preloader';
import PrivateRoute from 'components/PrivateRoute';
import LoginPage from 'features/Auth/pages/LoginPage';
import SignupPage from 'features/Auth/pages/SignupPage';
import UpdateUserPage from 'features/Auth/pages/UpdateUserPage';
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  circularProgress: {
    marginLeft: '50%',
    marginTop: '5rem',
  },
}));

// Lazy load - Code splitting
const Note = React.lazy(() => import('./features/Note'));

function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  // Because the server is created by Heroku, it will sleep after 30 minutes of inactivity.
  //So before the App comes out, we call an api to wake up the server
  useEffect(() => {
    const awakeServer = async () => {
      try {
        await pageApi.get(59);

        await new Promise((resolve) => {
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        });
      } catch (error) {
        console.log(error);
      }
    };

    awakeServer();
  }, []);

  return (
    <div className='note-mine-app'>
      {loading && <Preloader />}

      <Suspense
        fallback={
          <CircularProgress size='3rem' className={classes.circularProgress} />
        }
      >
        <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/login'>
            <LoginPage />
          </Route>

          <Route path='/signup'>
            <SignupPage />
          </Route>

          <PrivateRoute path='/notes'>
            <Note />
          </PrivateRoute>

          <PrivateRoute path='/:username'>
            <UpdateUserPage />
          </PrivateRoute>

          {/* <Route path='/forgot-password' component={ForgotPasswordPage} />
          <Route path='/reset-password' component={ResetPasswordPage} /> */}

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
