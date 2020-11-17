import React from 'react';
import {Grid} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';
import {StyledContainer, StyledSaveButton} from './CornellNotes.styles';
import Header from './Header';
import IdeasList from './IdeasList';
import NotesList from './NotesList';
import Summary from './Summary';

const CornellNotes = () => {
  const { save } = useNotesContext();

  return (
    <StyledContainer onSubmit={e => e.preventDefault()}>
      <Grid>
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
      <StyledSaveButton primary onClick={save}>
        Save
      </StyledSaveButton>
    </StyledContainer>
  );
};

export default CornellNotes;