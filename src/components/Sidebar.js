import React from 'react'
import { toDate, db, noteConverter } from '../contexts/Firebase/config';
import { Sidebar, Label, Accordion, Icon, Header, Loader, Menu, Button } from 'semantic-ui-react';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import { useHistory } from 'react-router-dom';
import { useIdentityContext } from '../contexts/IdentityContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';
import GroupListItem from './GroupItem';

const SidebarComponent = ({children}) => {
  const { user } = useIdentityContext();
  const { auth } = useAuthContext();
  const [ {uid, email} ] = useAuthState(auth);

  const [ userNotes, userNotesLoading ] = useCollectionOnce(
    db.collection('users')
      .doc(uid)
      .collection('notes')
      .withConverter(noteConverter)
      .orderBy('createdDate')
  );

  const [userListExpanded, setUserListExpanded] = React.useState(true);
  const toggleUserList = (_e, _t) => {
    setUserListExpanded(! userListExpanded);
  };

  const showGroups = () => {
    return user?.groups?.map(group => 
      {
        return (
          <GroupListItem key={group.id} group={group} />
        )
      }
    )
  }

  const showUserNotes = () => (
    <ShowNoteGroup title={email} loading={userNotesLoading}
      icon='user' expanded={userListExpanded} toggleExpanded={toggleUserList}>
      {userNotes?.docs.map(doc => showNote(doc.data()))}
    </ShowNoteGroup>
  )

  const ShowNoteGroup = ({title, loading=false, icon, expanded, toggleExpanded, children, ...rest}) => {
    if (loading) {
      return (
        <Menu.Item style={{height: '100%'}}>
          <Header><Loader active inverted/></Header>
        </Menu.Item>
      )
    } else {
      return (
        <Accordion inverted>
          <Accordion.Title
              style={{display: "flex", alignItems: 'center', flexDirection: "row"}}
              active={expanded}
              onClick={toggleExpanded}
            >
            <Icon name='dropdown'/>
            <span style={{flexGrow: 1}}>{title}</span>
            <Icon name={icon} style={{marginRight: '1rem'}}/>
          </Accordion.Title>
          <Accordion.Content active={expanded}>
            {children}
          </Accordion.Content>
        </Accordion>
      )
    }
  }

  const showNote = (note) => {
    return (
      <Menu.Item key={note.id} as="a">
        <Menu.Header>{ note.title }</Menu.Header>
        <p>{ note.displayCreatedDate() }</p>
      </Menu.Item>
  )}

  const history = useHistory();

  const logout = () => {
    auth.signOut()
      .then(_ => {
        history.push('/login');
      });
  }

  return (
    <Sidebar.Pushable direction="left" style={{height: "100vh", display:"flex", flexDirection: "row"}}>
      <Sidebar style={{position: "relative", display: "flex", flexDirection: "column"}}
        width="wide"
        inverted
        as={Menu}
        vertical
        visible
        animation="push"
      >
        <div style={{flexGrow: 1, display: "flex", flexDirection: "column", overflowY: "auto"}}>
          {showUserNotes()}
          {showGroups()}
        </div>
        <Menu.Item as="a" onClick={logout} style={{flexShrink: 1, wordBreak:'break-word'}}>
          Log out: <Label>{email}</Label>
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher style={{transform: 'none'}}>
        {children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}

export default SidebarComponent;
