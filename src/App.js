import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';
import SideNav from './components/SideNav';

import LoginScreen from './components/LoginScreen';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <LoginScreen />
        </Route>
        <Route path='/'>
          <SideNav/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
