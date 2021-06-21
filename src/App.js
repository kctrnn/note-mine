import { Box, LinearProgress, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import pageApi from 'api/pageApi';
import Home from 'components/Home';
import NotFound from 'components/NotFound';
import ForgotPasswordPage from 'features/Auth/pages/ForgotPasswordPage';
import LoginPage from 'features/Auth/pages/LoginPage';
import ResetPasswordPage from 'features/Auth/pages/ResetPasswordPage';
import SignupPage from 'features/Auth/pages/SignupPage';
import React, { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  progress: {
    maxWidth: '50vw',
    margin: '0 auto',
    marginTop: '30rem',

    '& > p': {
      marginBottom: '1rem',
    },
  },

  circularProgress: {
    marginLeft: '50%',
    left: '-1.5rem',
    marginTop: '5rem',
  },
}));

// Lazy load - Code splitting
const Note = React.lazy(() => import('./features/Note'));

function App() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;

  // Because the server is created by Heroku, it will sleep after 30 minutes of inactivity.
  //So before the App comes out, we call an api to wake up the server
  useEffect(() => {
    const awakeServer = async () => {
      try {
        const res = await pageApi.getAll({
          [`creator.username`]: 'kctrnn',
        });
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };

    awakeServer();
  }, []);

  return (
    <div className='note-mine-app' style={{ position: 'relative' }}>
      {data.length === 0 && !isLoggedIn && (
        <Box className={classes.progress}>
          <p>Server is waking up...</p>
          <LinearProgress />
        </Box>
      )}

      {data.length > 0 && (
        <Suspense
          fallback={
            <CircularProgress
              size='3rem'
              className={classes.circularProgress}
            />
          }
        >
          <Switch>
            <Route exact path='/' component={Home} />

            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/forgot-password' component={ForgotPasswordPage} />
            <Route path='/reset-password' component={ResetPasswordPage} />

            <Route path='/notes' component={Note} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      )}
    </div>
  );
}

export default App;
