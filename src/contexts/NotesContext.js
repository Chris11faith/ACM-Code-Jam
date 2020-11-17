import React from 'react';
import {v4 as uuid} from 'uuid';

import contextFactory from '../util/contextFactory';

const defaultValue = {
  headerInfo: null,
  ideas: null,
  notes: null,
  summary: null,
  setHeaderInfo: () => {},
  addIdea: () => {},
  removeIdea: () => {},
  editIdea: () => {},
  addNote: () => {},
  removeNote: () => {},
  editNote: () => {},
  setSummary: () => {},
  save: () => {},
};

const NotesContext = React.createContext(defaultValue);

export const NotesContextProvider = ({children}) => {
  const [headerInfo, setHeaderInfo] = React.useState({});
  const [ideas, setIdeas] = React.useState([]);
  const [notes, setNotes] = React.useState([]);
  const [summary, setSummary] = React.useState('');

  const addIdea = (newIdea) => {
    const idea = {
      idea: newIdea,
      id: uuid(),
    };

    setIdeas(cur => [...cur, idea]);
  };

  const removeIdea = (id) => {
    const filtered = ideas.filter(i => i.id !== id);

    setIdeas(filtered);
  };

  const editIdea = (id, newIdea) => {
    const localCopy = [...ideas];

    const itemIndex = ideas.findIndex(i => i.id === id);

    const item = ideas.find(i => i.id === id);
    item.idea = newIdea;

    localCopy[itemIndex] = item;

    setIdeas(localCopy);
  }

  const addNote = (newNote) => {
    const note = {
      note: newNote,
      id: uuid(),
    };

    setNotes(cur => [...cur, note]);
  };

  const removeNote = (id) => {
    const filtered = notes.filter(n => n.id !== id);

    setNotes(filtered);
  }

  const editNote = (id, newNote) => {
    const localCopy = [...notes];

    const itemIndex = localCopy.findIndex(n => n.id === id);

    const item = localCopy.find(n => n.id === id);
    item.note = newNote;

    localCopy[itemIndex] = item;

    setNotes(localCopy);
  };

  const save = () => {
    const item = {
      link: headerInfo.link,
      topic: headerInfo.topic,
      subject: headerInfo.subject,
      ideas,
      notes,
      summary
    }
    console.log('Save Notes', item);
  };

  return (
    <NotesContext.Provider value={{
        ...defaultValue,
        headerInfo,
        ideas,
        notes,
        summary,
        setHeaderInfo,
        addIdea,
        removeIdea,
        editIdea,
        addNote,
        removeNote,
        editNote,
        setSummary,
        save
      }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = contextFactory(NotesContext, 'NotesContext');

export default NotesContextProvider;