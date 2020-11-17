import React from 'react';
import {Form} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';

const Summary = () => {
  const {summary, setSummary} = useNotesContext();

  const onSummaryChanged = (e) => setSummary(e.target.value);

  return (
    <Form.TextArea
      label='Summary'
      placeholder='Summarize these notes...'
      onChange={onSummaryChanged}
      value={summary}
    />
  );
};

export default Summary;