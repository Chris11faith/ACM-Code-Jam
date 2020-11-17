import firebase from "firebase/app";
import React from 'react';
import contextFactory from '../util/contextFactory';

const DatabaseContext = React.createContext(firebase.firestore());

export const DatabaseContextProvider = ({children}) => {
  return (
    <DatabaseContext.Provider value={{...defaultValue}}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabaseContext = contextFactory(DatabaseContext, 'DatabaseContext');

export default DatabaseContextProvider;
