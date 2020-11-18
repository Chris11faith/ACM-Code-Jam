import React from 'react';

import contextFactory from '../util/contextFactory';

const defaultValue = {
};

const IdentityContext = React.createContext(defaultValue);

export const IdentityContextProvider = ({children}) => {
  return (
    <IdentityContext.Provider value={{ ...defaultValue }}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentityContext = contextFactory(IdentityContext, 'IdentityContext');

export default IdentityContextProvider;
