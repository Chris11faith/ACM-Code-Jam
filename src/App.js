import React from 'react';
import config from './contexts/Firebase/config';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';

// Firebase Initialize
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

export firebase;

import LoginScreen from './components/LoginScreen';
import IdentityContextProvider from './contexts/IdentityContext';

const App = () => {
  return (
    <IdentityContextProvider>
      <Router>
        <Switch>
          <Route path='/login'>
            <LoginScreen />
          </Route>
          <Route path='/'>
            <Icon name='sticky note outline' />
          </Route>
        </Switch>
      </Router>
    </IdentityContextProvider>
  );
}

export default App;
