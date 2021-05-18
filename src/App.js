import Home from 'components/Home';
import NotFound from 'components/NotFound';
import ForgotPasswordPage from 'features/Auth/pages/ForgotPasswordPage';
import LoginPage from 'features/Auth/pages/LoginPage';
import SignupPage from 'features/Auth/pages/SignupPage';
import Note from 'features/Note';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className='note-mine-app'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />

          <Route path='/:username' component={Note} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
