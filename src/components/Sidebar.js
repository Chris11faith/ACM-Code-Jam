import React from 'react'
import { Sidebar, Menu, Button } from 'semantic-ui-react';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

const SidebarComponent = ({children}) => {
  const { auth } = useAuthContext();
  const [ user ] = useAuthState(auth);
  const history = useHistory();

  const logout = () => {
    auth.signOut()
      .then(_ => {
        history.push('/login');
      });
  }

  return (
    <Sidebar.Pushable direction="left" style={{height: "100vh", display:"flex", flexDirection: "row"}}>
      <Sidebar style={{position: "relative", display: "flex", flexDirection: "column"}} width="wide" inverted as={Menu} vertical visible
        animation="push">
        <Menu.Item style={{flexShrink: 1}}>
          Add
        </Menu.Item>
        <div style={{flexGrow: 1, display: "flex", flexDirection: "column", overflowY: "auto"}}>
          <Menu.Item>
            Test
          </Menu.Item>
          <Menu.Item>
            Test
          </Menu.Item>
          <Menu.Item>
            Test
          </Menu.Item>
        </div>
        <Menu.Item as="a" onClick={logout} style={{flexShrink: 1, wordBreak:'break-word'}}>
          Log out {user.email}
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher style={{transform: 'none'}}>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarComponent;
