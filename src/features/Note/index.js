import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import EditPage from './pages/EditPage';
import MainPage from './pages/MainPage';

const Note = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.path} component={MainPage} />
      <Route path={`${match.path}/:pageId`} component={EditPage} />
    </Switch>
  );
};

export default Note;
