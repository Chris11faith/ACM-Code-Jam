import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {Icon} from 'semantic-ui-react';

import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import IdentityContextProvider from './contexts/IdentityContext';
import AuthContextProvider from './contexts/Firebase/AuthContext';

const App = () => {
  return (
    <AuthContextProvider>
      <IdentityContextProvider>
        <Router>
          <Switch>
            <Route path='/login'>
              <LoginScreen />
            </Route>
            <Route path='/signUp'>
              <SignUpScreen />
            </Route>
            <Route path='/'>
              <Icon name='sticky note outline' />
            </Route>
          </Switch>
        </Router>
      </IdentityContextProvider>
    </AuthContextProvider>
  );
}

const LoggedInRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth ? <Component {...props} />
          : <Redirect to='/login'/>
  )} />
)

export default App;
