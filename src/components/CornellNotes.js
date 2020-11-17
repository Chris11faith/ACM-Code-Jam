import React from 'react';
import {Button, Form, Grid} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';
import Header from './Header';
import IdeasList from './IdeasList';
import NotesList from './NotesList';
import Summary from './Summary';

const CornellNotes = () => {
  const { save } = useNotesContext();

  return (
    <Form onSubmit={e => e.preventDefault()}>
      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column>
            <Header />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <IdeasList />
          </Grid.Column>
          <Grid.Column width={12}>
            <NotesList />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Summary />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Button primary onClick={save}>
        Save
      </Button>
    </Form>
  );
};

export default CornellNotes;