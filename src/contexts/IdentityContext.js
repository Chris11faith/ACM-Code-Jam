import React from 'react';

import firebase, { db } from './Firebase/config';
import contextFactory from '../util/contextFactory';
import { useAuthContext } from './Firebase/AuthContext';

export class UserDoc {
  constructor(id, name, groups, createdDate=null, profileComplete=false) {
    this.id = id;
    this.name = name;
    this.groups = groups;
    this.createdDate = createdDate;
    this.profileComplete = profileComplete;
  }
}

export const userConverter = {
  toFirestore: function(user) {
    let createdDate;
    if (this.createdDate === null){
      createdDate = firebase.firestore.Timestamp.now()
    } else (
      createdDate = firebase.firestore.Timestamp.fromDate(createdDate)
    )

    return {
      name: this.name,
      groups: this.groups,
      createdDate: createdDate,
      profileComplete: this.profileComplete
    }
  },
  fromFirestore: function(snapshot, options){
    const id = snapshot.id;
    const data = snapshot.data(options);
    return new UserDoc(id, data.name, data.groups, data.createdDate?.toDate(), data.profileComplete);
  }
}

const defaultValue = {
  user: null,
  setUser: () => {}
};

const IdentityContext = React.createContext(defaultValue);

export const IdentityContextProvider = ({children}) => {
  const [ user, setUser ] = React.useState(null)

  const { auth } = useAuthContext();

  React.useEffect(() => {
    return auth.onAuthStateChanged((u) => {
      db.collection('users')
        .doc(u.uid)
        .withConverter(userConverter)
        .onSnapshot(d => {
          setUser(d.data())
        })
    })
  } , []);

  return (
    <IdentityContext.Provider value={{ ...defaultValue, user, setUser }}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentityContext = contextFactory(IdentityContext, 'IdentityContext');

export default IdentityContextProvider;
