import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import config from './config';

import React from 'react';

import contextFactory from '../../util/contextFactory';

firebase.initializeApp(config);
const googleLoginProvider = new firebase.auth.GoogleAuthProvider();

const defaultValue = {
  auth: firebase.auth(),
  provider: {...googleLoginProvider}
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