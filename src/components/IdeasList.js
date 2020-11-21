import React from 'react';
import {Form, List} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';
import Idea from './Idea';


const IdeasList = () => {
  const [editingItem, setEditingItem] = React.useState('');

  const { ideas, addIdea, removeIdea, editIdea } = useNotesContext();

  const onClick = () => {
    if (editingItem !== ''){
      addIdea(editingItem);
      setEditingItem('');
    }
  };

  const onRemoveIdea = (id) => removeIdea(id);

  const onEditIdea = (id, newIdea) => editIdea(id, newIdea);

  const onItemChanged = (e) => setEditingItem(e.target.value);

  return (
    <List selection>
      <Form.Input
        action={{color: 'green', icon: 'plus', onClick: () => onClick()}}
        icon='pencil alternate'
        iconPosition='left'
        onChange={onItemChanged}
        value={editingItem}
      />
      {ideas.map(item => <Idea key={item.id} idea={item} onRemoveIdea={onRemoveIdea} onEditIdea={onEditIdea} />)}
    </List>
  );
};

export default IdeasList;
