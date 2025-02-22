import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NoteContext from './src/component/noteContext';

const NoteState = ({ children, authtoken }) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Fetch all notes from the API when the component mounts or when authtoken changes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${host}/api/notes/getallNotes`, {
          headers: {
            "auth-token": authtoken,
            'Authorization': `Bearer ${authtoken}`,
            'Content-Type': 'application/json'
          }
        });
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    if (authtoken) {
      fetchNotes();  // Only fetch notes if auth token exists
    }
  }, [authtoken]);

  // Add a note
  const addNotes = useCallback(async (title, description, tag) => {
    try {
      const response = await axios.post(`${host}/api/Notes/addNotes`, {
        title, description, tag
      }, {
        headers: {
          "auth-token": authtoken,
          'Authorization': `Bearer ${authtoken}`,
          'Content-Type': 'application/json'
        }
      });

      setNotes(prevNotes => [...prevNotes, response.data]);
      alert('Note added successfully!');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }, [authtoken]);

  // Edit a note
  const editNotes = useCallback(async (id, title, description, tag) => {
    const updatedNote = { title, description, tag };
    try {
      const response = await axios.put(`${host}/api/Notes/updateNotes/${id}`, updatedNote, {
        headers: {
          "auth-token": authtoken,
          "Authorization": `Bearer ${authtoken}`,
          'Content-Type': 'application/json'
        }
      });

      setNotes(prevNotes =>
        prevNotes.map(note => note._id === id ? { ...note, ...updatedNote } : note)
      );
    } catch (error) {
      console.error('Error editing note:', error);
    }
  }, [authtoken]);

  // Delete a note
  const deleteNotes = useCallback(async (id) => {
    try {
      const response = await axios.delete(`${host}/api/Notes/deleteNotes/${id}`, {
        headers: {
          "auth-token": authtoken,
          "Authorization": `Bearer ${authtoken}`,
          'Content-Type': 'application/json'
        }
      });

      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }, [authtoken]);

  return (
    <NoteContext.Provider value={{ notes, addNotes, editNotes, deleteNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
