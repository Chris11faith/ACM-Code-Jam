import React from 'react';
import {Button, Form, Icon, List} from 'semantic-ui-react';

const Idea = ({idea, onRemoveIdea, onEditIdea}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState('');

  const onEdit = () => {
    onEditIdea(idea.id, editingItem);
    setIsEditing(false);
  }

  const onItemChanged = (e) => setEditingItem(e.target.value);

  React.useEffect(() => {
    setEditingItem(idea.idea);
  }, [idea.idea]);

  return (
    <List.Item>
      <List.Content>
        <List.Header>
          {!isEditing 
            ? <React.Fragment>
                <span>{idea.idea}</span>
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
          <Button basic icon negative onClick={() => onRemoveIdea(idea.id)}>
            <Icon name='trash' />
          </Button>
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

export default Idea;