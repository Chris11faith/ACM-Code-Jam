import firebase from "firebase/app";
import "firebase/database";
import config from './config';
import React from 'react';
import contextFactory from '../util/contextFactory';

firebase.initializeApp(config);

const DatabaseContext = React.createContext(firebase.database());

export const DatabaseContextProvider = ({children}) => {
  return (
    <DatabaseContext.Provider value={{...defaultValue}}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = contextFactory(DatabaseContext, 'DatabaseContext');

export default DatabaseContextProvider;