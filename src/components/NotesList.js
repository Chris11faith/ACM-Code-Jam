import React from 'react';
import {Form, List} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';
import Note from './Note';

const NotesList = () => {
  const [editingItem, setEditingItem] = React.useState('');

  const { notes, addNote, removeNote, editNote } = useNotesContext();

  const onClick = () => {
    if (editingItem !== ''){
      addNote(editingItem);
      setEditingItem('');
    }
  };

  const onRemoveNote = (id) => removeNote(id);

  const onEditNote = (id, newNote) => editNote(id, newNote);

  const onItemChanged = (e) => setEditingItem(e.target.value);

  return (
    <List selection verticalAlign='middle'>
      <Form.Input
        action={{color: 'green', icon: 'plus', onClick: () => onClick()}}
        icon='pencil alternate'
        iconPosition='left'
        onChange={onItemChanged}
        value={editingItem}
      />
      {notes.map(item => <Note key={item.id} note={item} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />)}
    </List>
  );
};

export default NotesList;