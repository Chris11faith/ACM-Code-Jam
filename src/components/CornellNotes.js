import React from 'react';
import {Button} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';
import IdeasList from './IdeasList';

const CornellNotes = () => {
  const { save } = useNotesContext();

  return (
    <React.Fragment>
      <IdeasList />
      <Button primary onClick={save}>Save</Button>
    </React.Fragment>
  );
};

export default CornellNotes;