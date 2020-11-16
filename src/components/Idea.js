import React from 'react';
import {Button, Icon, List} from 'semantic-ui-react';

const Idea = ({idea, onRemoveIdea}) => {
  return (
    <List.Item>
      <List.Content>
        <List.Header>
          {idea.note}
          <Button circular icon negative onClick={() => onRemoveIdea(idea.id)}>
            <Icon name='trash' />
          </Button>
        </List.Header>
      </List.Content>
    </List.Item>
  );
};

export default Idea;