import Home from 'components/Home';
import NotFound from 'components/NotFound';
import ForgotPasswordPage from 'features/Auth/pages/ForgotPasswordPage';
import LoginPage from 'features/Auth/pages/LoginPage';
import SignupPage from 'features/Auth/pages/SignupPage';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Lazy load - Code splitting
const Note = React.lazy(() => import('./features/Note'));

function App() {
  return (
    <div className='note-mine-app'>
      <Suspense fallback={<div>Loading ...</div>}>
        <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />

          <Route path='/notes' component={Note} />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
