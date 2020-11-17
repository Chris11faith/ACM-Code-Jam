import React from 'react';
import {Button, Form, Icon, List} from 'semantic-ui-react';

const Note = ({note, onRemoveNote, onEditNote}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState('');

  const onEdit = () => {
    onEditNote(note.id, editingItem);
    setIsEditing(false);
  };

  const onItemChanged = (e) => setEditingItem(e.target.value);

  React.useEffect(() => {
    setEditingItem(note.note);
  }, [note.note]);

  return (
    <List.Item>
      <List.Content>
        <List.Header>
          {
            !isEditing
              ? <React.Fragment>
                  <span>{note.note}</span>
                  <Button basic icon primary onClick={() => setIsEditing(true)}>
                    <Icon name='edit outline' />
                  </Button>
                </React.Fragment>
              : <Form.Input 
                  fluid
                  action={{color: 'grey', icon: 'edit outline', onClick: () => onEdit()}}
                  onChange={onItemChanged}
                  value={editingItem}
                />
          }
          <Button basic icon negative onClick={() => onRemoveNote(note.id)}>
            <Icon name='trash' />
          </Button>
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

export default Note;