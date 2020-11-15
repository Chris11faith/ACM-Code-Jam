import React from 'react';

import contextFactory from '../util/contextFactory';

const defaultValue = {
  user: null,
  setUser: () => {},
};

const IdentityContext = React.createContext(defaultValue);

export const IdentityContextProvider = ({children}) => {
  const [user, setUser] = React.useState(null);
  console.log(`${setUser}-- from IdentityContextProvider`)
  return (
    <IdentityContext.Provider value={{...defaultValue, user, setUser}}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentityContext = contextFactory(IdentityContext, 'IdentityContext');

export default IdentityContextProvider;