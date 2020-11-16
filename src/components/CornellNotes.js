import React from 'react';
import {v4 as uuid} from 'uuid';

import IdeasList from './IdeasList';

const CornellNotes = () => {
  //const [headerInfo, setHeaderInfo] = React.useState({});
  const [ideas, setIdeas] = React.useState([]);
  //const [notes, setNotes] = React.useState([]);
  //const [summary, setSummary] = React.useState('');

  const onAddIdea = (newIdea) => {
    const idea = {
      note: newIdea,
      id: uuid(),
    };

    console.log("Add Idea");

    setIdeas(cur => [...cur, idea]);
  };

  const onRemoveIdea = (id) => {
    const filtered = ideas.filter(i => i.id !== id);

    setIdeas(filtered);
  };

  return (
  <React.Fragment>
    <IdeasList ideas={ideas} onAddIdea={onAddIdea} onRemoveIdea={onRemoveIdea} />
  </React.Fragment>
  );
};

export default CornellNotes;