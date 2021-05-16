import Home from 'components/Home';
import NotFound from 'components/NotFound';
import Login from 'features/Auth/pages/Login';
import Signup from 'features/Auth/pages/Signup';
import Note from 'features/Note';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className='note-mine-app'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />

          <Route path='/:username' component={Note} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
