import { Note } from '../helpers/Note';
import { mockedNotes } from '../helpers/notes.mock';

// In-memory data store
let notes: Note[] = mockedNotes;



// Get all notes
export const getAllNotes = (): Note[] => notes;

// Get a note by ID
export const getNoteById = (id: number): Note | undefined => notes.find((note) => note.id === id);

// Create a new note
export const createNewNote = (newNote: Note): Note => {
  const note: Note = { ...newNote, id: Date.now() };
  notes.push(note);
  return note;
};

// Update a note by ID
export const updateNoteById = (id: number, updatedNote: Note): Note | null => {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    const updatedNoteWithId = { ...updatedNote, id };
    notes[index] = updatedNoteWithId;
    return updatedNoteWithId;
  }
  return null;
};

// Delete a note by ID
export const deleteNoteById = (id: number): boolean => {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    return true;
  }
  return false;
};

// Get aggregated data statistics for notes
export const getNotesStatistics = (): { total: number; archived: number; unarchived: number } => {
  const total = notes.length;
  const archived = notes.filter((note) => note.archived).length;
  const unarchived = total - archived;
  return { total, archived, unarchived };
};





