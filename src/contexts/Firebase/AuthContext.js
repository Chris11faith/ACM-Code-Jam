import firebase from './config';
import React from 'react';
import contextFactory from '../../util/contextFactory';

const defaultValue = {
  auth: firebase.auth(),
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

const AuthContext = React.createContext(defaultValue);

export const AuthContextProvider = ({children}) => {
  return (
    <AuthContext.Provider value={{...defaultValue}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = contextFactory(AuthContext, 'AuthContext');

export default AuthContextProvider;
