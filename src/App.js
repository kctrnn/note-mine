import CircularProgress from '@material-ui/core/CircularProgress';
import pageApi from 'api/pageApi';
import Home from 'components/Home';
import NotFound from 'components/NotFound';
import ForgotPasswordPage from 'features/Auth/pages/ForgotPasswordPage';
import LoginPage from 'features/Auth/pages/LoginPage';
import ResetPasswordPage from 'features/Auth/pages/ResetPasswordPage';
import SignupPage from 'features/Auth/pages/SignupPage';
import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// Lazy load - Code splitting
const Note = React.lazy(() => import('./features/Note'));

function App() {
  useEffect(() => {
    const awakeServer = async () => {
      try {
        const res = await pageApi.getAll();
        if (res) {
          console.log('The server has awakened!');
        }
      } catch (error) {
        console.log(error);
      }
    };

    awakeServer();
  }, []);

  return (
    <div className='note-mine-app'>
      <Suspense fallback={<CircularProgress />}>
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
    </div>
  );
}

export default App;
