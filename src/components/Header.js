import React from 'react';
import {Form} from 'semantic-ui-react';

import { useNotesContext } from '../contexts/NotesContext';

const Header = () => {
  const {headerInfo, setHeaderInfo} = useNotesContext();

  const onLinkChanged = (e) => setHeaderInfo(cur => {
    return {
      ...cur,
      link: e.target.value
    }
  });

  const onTopicChanged = (e) => setHeaderInfo(cur => {
    return {
      ...cur,
      topic: e.target.value
    }
  });

  const onSubjectChanged = (e) => setHeaderInfo(cur => {
    return {
      ...cur,
      subject: e.target.value
    }
  });

  return (
    <React.Fragment>
      <Form.Input 
        label='Video Link'
        placeholder='Link'
        onChange={onLinkChanged}
        value={headerInfo.link || ''}
      />
      <Form.Group widths='equal'>
        <Form.Input
          fluid
          label='Topic'
          placeholder='Topic'
          onChange={onTopicChanged}
          value={headerInfo.topic || ''}
        />
        <Form.Input
          fluid
          label='Subject'
          placeholder='Subject'
          onChange={onSubjectChanged}
          value={headerInfo.subject || ''}
        />
      </Form.Group>
    </React.Fragment>
  );
};

export default Header;