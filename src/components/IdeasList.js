import React from 'react';
import {Form, List} from 'semantic-ui-react';

import Idea from './Idea';


const IdeasList = ({ideas, onAddIdea, onRemoveIdea}) => {
  const [editingItem, setEditingItem] = React.useState('');

  const onClick = () => {
    if (editingItem !== ''){
      onAddIdea(editingItem);
      setEditingItem('');
    }
  }

  const onItemChanged = (e) => setEditingItem(e.target.value);

  return (
    <List selection verticalAlign='middle'>
      <Form onSubmit={e => e.preventDefault()}>
          <Form.Input
            action={{color: 'green', icon: 'plus', onClick: () => onClick()}}
            actionPosition='right'
            icon='pencil alternate'
            iconPosition='left'
            onChange={onItemChanged}
            value={editingItem}
          />
        </Form>
      {ideas.map(item => <Idea idea={item} onRemoveIdea={onRemoveIdea} />)}
    </List>
  );
};

export default IdeasList;