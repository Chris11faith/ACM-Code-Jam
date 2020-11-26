import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NotesContextProvider from './contexts/NotesContext';
import CornellNotes from './components/CornellNotes';
import LoginScreen from './components/LoginScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <LoginScreen />
        </Route>
        <Route path='/'>
          <NotesContextProvider>
            <CornellNotes />
          </NotesContextProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
