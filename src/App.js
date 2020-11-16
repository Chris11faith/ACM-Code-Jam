import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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
          <CornellNotes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
