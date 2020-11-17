import React from 'react';
import {Button, Form} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';
import Header from './Header';
import IdeasList from './IdeasList';

const CornellNotes = () => {
  const { save } = useNotesContext();

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Header />
      <IdeasList />
      <Button primary onClick={save}>Save</Button>
    </Form>
  );
};

export default CornellNotes;