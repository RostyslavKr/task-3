import express, { Request, Response, NextFunction } from 'express';
import { getAllNotes,
  getNoteById,
  createNewNote,
  updateNoteById,
  deleteNoteById,
  getNotesStatistics,  } from '../services/notes.service';
import { Note } from '../helpers/Note';
import { noteSchema } from '../noteSchema';


const router = express.Router();


// Custom error classes
class NoteNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoteNotFoundError';
  }
}

export const listNotes = async (req: Request, res: Response) => {
  const notes = getAllNotes();
  res.json(notes);
}

export const statsNotes = async (req: Request, res: Response) => {
  const stats = getNotesStatistics();
  res.json(stats);
}

export const getNote = async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);
  const note = getNoteById(noteId);
  if (note) {
    res.json(note);
  } else {
    throw new NoteNotFoundError('Note not found.');
  }
}

export const createdNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newNote: Note = req.body;
    await noteSchema.validate(newNote);
    const createdNote = createNewNote(newNote);
    res.json(createdNote);
  } catch (error) {
    next(error);
  }
}

export const updatedNote = async (req: Request, res: Response, next: NextFunction) => {
  const noteId = parseInt(req.params.id);
  const updatedNote: Note = req.body;
  try {
    await noteSchema.validate(updatedNote);
    const updatedNoteResult = updateNoteById(noteId, updatedNote);
    if (updatedNoteResult) {
      res.json(updatedNoteResult);
    } else {
      throw new NoteNotFoundError('Note not found.');
    }
  } catch (error) {
    next(error);
  }
}

export const deleteNote = (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);
  const isDeleted =   deleteNoteById(noteId);
  if (isDeleted) {
    res.json({ message: 'Note deleted successfully.' });
  } else {
    throw new NoteNotFoundError('Note not found.');
  }
}


