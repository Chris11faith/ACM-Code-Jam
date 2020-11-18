import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import NotesContextProvider from './contexts/NotesContext';
import CornellNotes from './components/CornellNotes';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import LoadingComponent from './components/Loading';
import IdentityContextProvider from './contexts/IdentityContext';
import AuthContextProvider, { useAuthContext } from './contexts/Firebase/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';

const App = () => {
  const { auth } = useAuthContext();
  const [user, loading] = useAuthState(auth);

  const LoggedInRoute = ({children, ...rest}) => {
    return (<Route {...rest} render={() => {
      if (loading) {
        return (<LoadingComponent/>);
      } else if (user) {
        return (children);
      } else {
        return (<Redirect to='/login'/>);
      }
    }} />)
  }

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
            <LoggedInRoute path='/'>
              <NotesContextProvider>
                <CornellNotes />
              </NotesContextProvider>
            </LoggedInRoute>
          </Switch>
        </Router>
      </IdentityContextProvider>
    </AuthContextProvider>
  );
}


export default App;
