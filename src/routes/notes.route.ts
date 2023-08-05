import express, { Request, Response } from 'express';
import { NotesService } from '../services/notes.service';
import { Note } from '../helpers/Note';
import * as yup from 'yup';

const router = express.Router();
const notesService = new NotesService();

// Custom error classes
class NoteNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoteNotFoundError';
  }
}

class NoteValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoteValidationError';
  }
}

// Validation schema using Yup
const noteSchema = yup.object().shape({
  name: yup.string().required(),
  created: yup.string().required(),
  content: yup.string().required(),
  category: yup.string().required(),
  dates: yup.array().of(yup.string()).required(),
  archived: yup.boolean().required(),
});

router.get('/notes', (req: Request, res: Response) => {
  const notes = notesService.getAllNotes();
  res.json(notes);
});

router.get('/notes/stats', (req: Request, res: Response) => {
  const stats = notesService.getStats();
  res.json(stats);
});

router.get('/notes/:id', (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);
  const note = notesService.getNoteById(noteId);
  if (note) {
    res.json(note);
  } else {
    throw new NoteNotFoundError('Note not found.');
  }
});

router.post('/notes', async (req: Request, res: Response) => {
  try {
    const newNote: Note = req.body;
    await noteSchema.validate(newNote);
    const createdNote = notesService.createNote(newNote);
    res.json(createdNote);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new NoteValidationError(error.message);
    }
    throw error;
  }
});

router.patch('/notes/:id', async (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);
  const updatedNote: Note = req.body;
  try {
    await noteSchema.validate(updatedNote);
    const updatedNoteResult = notesService.updateNote(noteId, updatedNote);
    if (updatedNoteResult) {
      res.json(updatedNoteResult);
    } else {
      throw new NoteNotFoundError('Note not found.');
    }
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new NoteValidationError(error.message);
    }
    throw error;
  }
});

router.delete('/notes/:id', (req: Request, res: Response) => {
  const noteId = parseInt(req.params.id);
  const isDeleted = notesService.deleteNote(noteId);
  if (isDeleted) {
    res.json({ message: 'Note deleted successfully.' });
  } else {
    throw new NoteNotFoundError('Note not found.');
  }
});

export default router;