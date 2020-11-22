import React from 'react';
import { db, noteConverter } from '../contexts/Firebase/config';
import { useAuthContext } from '../contexts/Firebase/AuthContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Accordion, Icon, Menu, Header, Loader } from 'semantic-ui-react';

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

const GroupListItem = ({ group, ...rest}) => {
  const [ isExpanded, setIsExpanded ] = React.useState(false);
  const [ sharedNotes, setSharedNotes ] = React.useState([]);
  const [ myNotes, setMyNotes ] = React.useState([]);
  const [ myTimeout, setMyTimeout ] = React.useState(null);
  const [ shouldLoad, setShouldLoad ] = React.useState(false);
  const { auth } = useAuthContext();
  const [ user ] = useAuthState(auth);

  React.useEffect(() => {
    if ( shouldLoad ) {
      return db.collection('groups')
        .doc(group.id)
        .collection('notes')
        .withConverter(noteConverter)
        .where('owner', '!=', user.uid)
        .where('shared', '==', true)
        .limit(25)
        .onSnapshot(snapshot => {
          console.log('Taking snapshot of group ' + group.id)
          setSharedNotes(snapshot.docs.map(doc => doc.data()))
        });
    } else {
      setSharedNotes([]);
    }
  }, [ shouldLoad, group.id, user.uid ]);

  React.useEffect(() => {
    if (isExpanded) {
      clearTimeout(myTimeout);
      // Start loading results if not doing it
      setShouldLoad(true);
    } else {
      setMyTimeout(setTimeout(() => {
        setShouldLoad(false)
      }, 60000))
    }
  }, [ isExpanded ]);

  React.useEffect(() => {
    if (shouldLoad) {
      return db.collection('groups')
        .doc(group.id)
        .collection('notes')
        .withConverter(noteConverter)
        .where('owner', '==', user.uid)
        .limit(25)
        .onSnapshot(snapshot => {
          setMyNotes(snapshot.docs.map(doc => doc.data()))
        })
    } else {
      setMyNotes([]);
    }
  }, [ shouldLoad, group.id, user.uid]);


  const toggleGroupList = () => {
    setIsExpanded(! isExpanded);
  }

  return (
    <ShowNoteGroup title={group.name} loading={false}
      icon='group' expanded={isExpanded} toggleExpanded={toggleGroupList}>
      <Header inverted as="h6">My notes</Header>
      {myNotes.map(showNote)}
      <Header inverted as="h6">Shared notes</Header>
      {sharedNotes.map(showNote)}
    </ShowNoteGroup>
  )
}

export default GroupListItem;
