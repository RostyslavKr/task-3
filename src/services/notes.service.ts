import { Note } from '../helpers/Note';
import { mockedNotes } from '../helpers/notes.mock';

export class NotesService {
  private notes: Note[] = mockedNotes;

  getAllNotes(): Note[] {
    return this.notes;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }

  createNote(newNote: Note): Note {
    const note: Note = { ...newNote, id: Date.now() };
    this.notes.push(note);
    return note;
  }

  updateNote(id: number, updatedNote: Note): Note | null {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      const updatedNoteWithId = { ...updatedNote, id };
      this.notes[index] = updatedNoteWithId;
      return updatedNoteWithId;
    }
    return null;
  }

  deleteNote(id: number): boolean {
    const index = this.notes.findIndex((note) => note.id === id);
    if (index !== -1) {
      this.notes.splice(index, 1);
      return true;
    }
    return false;
  }

  getStats(): { total: number; archived: number; unarchived: number } {
    const total = this.notes.length;
    const archived = this.notes.filter((note) => note.archived).length;
    const unarchived = total - archived;
    return { total, archived, unarchived };
  }
}